"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { inquiryTypes } from "@/content/inquiryTypes";
import { offerings, type InquiryTypeId } from "@/content/offerings";
import { site, whatsappLink } from "@/content/site";
import { fieldErrors, inquirySchema, type FieldErrors, type InquiryResponse } from "@/lib/inquiry";
import { Arrow } from "@/components/ui/icons";

type State = "idle" | "sending" | "sent" | "not-configured" | "failed" | "rate-limited";

/** Reads ?type= and ?topic= so CTAs elsewhere can preselect the inquiry. Needs a Suspense boundary. */
export function InquiryFormFromParams() {
  const params = useSearchParams();
  const raw = params.get("type");
  const type = inquiryTypes.some((t) => t.id === raw) ? (raw as InquiryTypeId) : undefined;
  const topic = params.get("topic") ?? "";
  // Remount when the query changes so the preselection updates without syncing state in an effect.
  return <InquiryForm key={`${type}-${topic}`} defaultType={type} topic={topic} />;
}

const field =
  "mt-2 block w-full rounded-2xl border border-ink/10 bg-card px-5 py-4 text-base outline-none transition-colors placeholder:text-ink/35 focus:border-forest focus:ring-2 focus:ring-forest/20 aria-[invalid=true]:border-red-700";

export function InquiryForm({ defaultType, topic = "" }: { defaultType?: InquiryTypeId; topic?: string }) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const topicName = offerings.find((o) => o.id === topic)?.name;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const parsed = inquirySchema.safeParse(values);
    if (!parsed.success) {
      const errs = fieldErrors(parsed.error);
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setErrors({});
    setDraft(values);
    setState("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const body = (await res.json()) as InquiryResponse;
      if (body.ok) {
        setState("sent");
        form.reset();
      } else if (body.reason === "invalid") {
        setErrors(body.errors);
        setState("idle");
      } else {
        setState(body.reason);
      }
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="grain relative overflow-hidden rounded-[28px] bg-stage p-10 text-cream">
        <p className="display relative z-10 text-6xl">Thank you</p>
        <p className="relative z-10 mt-4 max-w-md text-cream/80">
          Your message has reached us. We read every inquiry personally and will reply by email.
        </p>
      </div>
    );
  }

  const fallback = draft
    ? `Name: ${draft.name}\nOrganisation: ${draft.organization}\nPhone: ${draft.phone}\nInquiry: ${draft.type}\n\n${draft.message}`
    : "";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Inquiry from ${draft?.name ?? "website"}`)}&body=${encodeURIComponent(fallback)}`;
  const wa = whatsappLink(fallback);
  const err = (n: keyof FieldErrors) =>
    errors[n] ? (
      <p id={`${n}-error`} className="mt-2 text-sm text-red-800">
        {errors[n]}
      </p>
    ) : null;
  const aria = (n: keyof FieldErrors) => ({
    "aria-invalid": errors[n] ? true : undefined,
    "aria-describedby": errors[n] ? `${n}-error` : undefined,
  });
  const label = "text-sm font-semibold";

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-6 sm:grid-cols-2">
      {topicName && (
        <p className="rounded-2xl bg-forest/10 px-5 py-3 text-sm sm:col-span-2">
          Asking about <strong className="font-semibold">{topicName}</strong>
        </p>
      )}
      <input type="hidden" name="topic" value={topic} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={label}>Name</label>
        <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="organization" className={label}>Organisation <span className="font-normal text-stone">(optional)</span></label>
        <input id="organization" name="organization" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone <span className="font-normal text-stone">(optional)</span></label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="type" className={label}>What is it about?</label>
        <select id="type" name="type" required defaultValue={defaultType ?? ""} className={`${field} cursor-pointer`} {...aria("type")}>
          <option value="" disabled>
            Choose one
          </option>
          {inquiryTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
        {err("type")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Message</label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="The audience, a rough date and the city."
          className={`${field} resize-y`}
          {...aria("message")}
        />
        {err("message")}
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-stone">We use your details only to reply to this inquiry.</p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-stage px-8 font-semibold text-cream transition-colors hover:bg-forest disabled:opacity-60"
        >
          {state === "sending" ? "Sending..." : "Send inquiry"}
          <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
      <div aria-live="polite" className="sm:col-span-2">
        {(state === "not-configured" || state === "failed" || state === "rate-limited") && (
          <div className="rounded-[24px] bg-ochre/20 p-6">
            <p className="font-semibold">
              {state === "not-configured"
                ? "Online sending is not switched on yet, so your message has not been sent."
                : state === "rate-limited"
                  ? "Too many messages from this connection. Please try again later."
                  : "Something went wrong and your message was not sent."}
            </p>
            <p className="mt-1 text-stone">You can send the same message directly:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex h-12 items-center rounded-full bg-stage px-6 font-semibold text-cream">
                Send by email
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full border border-ink/25 px-6 font-semibold">
                  Send on WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
