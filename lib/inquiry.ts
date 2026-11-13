import { z } from "zod";
import { inquiryTypeIds } from "@/content/inquiryTypes";

/** Shared by the form (client) and the route handler (server). */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  organization: z.string().trim().max(160).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s()-]*$/, "Use digits, spaces and + only.")
    .optional()
    .default(""),
  type: z.enum(inquiryTypeIds, { message: "Please choose a type of inquiry." }),
  topic: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(20, "Please add a few more details (at least 20 characters).").max(4000),
  /** Honeypot. Real visitors never see or fill it. */
  website: z.string().max(0).optional().default(""),
});

export type Inquiry = z.infer<typeof inquirySchema>;
export type FieldErrors = Partial<Record<keyof Inquiry, string>>;

export function fieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof Inquiry | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

export type InquiryResponse =
  | { ok: true }
  | { ok: false; reason: "invalid"; errors: FieldErrors }
  | { ok: false; reason: "not-configured" | "rate-limited" | "failed" };
