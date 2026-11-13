import { Resend } from "resend";
import { inquiryTypes } from "@/content/inquiryTypes";
import { fieldErrors, inquirySchema, type InquiryResponse } from "@/lib/inquiry";

/*
 * Best-effort rate limit: per server instance, resets on cold start. Enough to
 * blunt a burst from one address; swap for a shared store if spam becomes real.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function reply(body: InquiryResponse, status: number) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return reply({ ok: false, reason: "invalid", errors: {} }, 400);
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    // A filled honeypot means a bot. Answer as if it worked so it learns nothing.
    if (parsed.error.issues.some((i) => i.path[0] === "website")) return reply({ ok: true }, 200);
    return reply({ ok: false, reason: "invalid", errors: fieldErrors(parsed.error) }, 422);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return reply({ ok: false, reason: "rate-limited" }, 429);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO;
  if (!apiKey || !to) return reply({ ok: false, reason: "not-configured" }, 503);

  const data = parsed.data;
  const typeTitle = inquiryTypes.find((t) => t.id === data.type)?.title ?? data.type;
  const text = [
    `Type: ${typeTitle}${data.topic ? ` (${data.topic})` : ""}`,
    `Name: ${data.name}`,
    `Organisation: ${data.organization || "-"}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    "",
    data.message,
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.INQUIRY_FROM ?? "Shiroorkar website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: data.email,
      subject: `New inquiry: ${typeTitle} from ${data.name}${data.organization ? `, ${data.organization}` : ""}`,
      text,
    });
    if (error) {
      console.error("Resend error", error);
      return reply({ ok: false, reason: "failed" }, 502);
    }
  } catch (err) {
    console.error("Inquiry send failed", err);
    return reply({ ok: false, reason: "failed" }, 502);
  }

  return reply({ ok: true }, 200);
}
