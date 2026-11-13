"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { inquiryTypes } from "@/content/inquiryTypes";
import { offerings, type InquiryTypeId } from "@/content/offerings";
import { site, whatsappLink } from "@/content/site";
import { fieldErrors, inquirySchema, type FieldErrors, type InquiryResponse } from "@/lib/inquiry";
import { ArrowIcon } from "./ui";

type State = "idle" | "sending" | "sent" | "not-configured" | "failed" | "rate-limited";

/** Reads ?type= and ?topic= so CTAs elsewhere can preselect the inquiry. Needs a Suspense boundary. */
export function InquiryFormFromParams() {
  const params = useSearchParams();
  const rawType = params.get("type");
  const type = inquiryTypes.some((t) => t.id === rawType) ? (rawType as InquiryTypeId) : undefined;
  const topic = params.get("topic") ?? "";
  // Remount when the query changes so the preselection updates without syncing state in an effect.
  return <InquiryForm key={`${type}-${topic}`} defaultType={type} topic={topic} />;
}

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
      <div role="status" className="border border-forest/30 bg-sage-soft/50 p-8 sm:p-10">
        <p className="eyebrow text-forest">Inquiry sent</p>
        <h3 className="mt-4 text-3xl">Thank you. Your message has reached us.</h3>
        <p className="mt-4 max-w-lg leading-relaxed text-muted">
          We read every inquiry personally and will reply by email. If it is urgent, write to{" "}
          <a className="text-forest underline underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const fallbackBody = draft
    ? `Name: ${draft.name}\nOrganisation: ${draft.organization}\nPhone: ${draft.phone}\nInquiry: ${draft.type}\n\n${draft.message}`
    : "";
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Inquiry from ${draft?.name ?? "website"}`,
  )}&body=${encodeURIComponent(fallbackBody)}`;
  const wa = whatsappLink(fallbackBody);

  const field =
    "mt-2 block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base placeholder:text-ink/35 focus:border-forest focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-700";
  const label = "text-xs font-semibold uppercase tracking-[0.16em] text-muted";
  const err = (name: keyof FieldErrors) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-2 text-sm text-red-800">
        {errors[name]}
      </p>
    ) : null;
  const aria = (name: keyof FieldErrors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      {topicName && (
        <p className="sm:col-span-2 bg-paper-deep px-4 py-3 text-sm">
          Asking about <strong className="font-medium">{topicName}</strong>
        </p>
      )}
      <input type="hidden" name="topic" value={topic} />
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label htmlFor="name" className={label}>Name *</label>
        <input id="name" name="name" autoComplete="name" required className={field} {...aria("name")} />
        {err("name")}
      </div>
      <div>
        <label htmlFor="organization" className={label}>Organisation</label>
        <input id="organization" name="organization" autoComplete="organization" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" required className={field} {...aria("email")} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="phone" className={label}>Phone</label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} {...aria("phone")} />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="type" className={label}>Type of inquiry *</label>
        <select
          id="type"
          name="type"
          required
          defaultValue={defaultType ?? ""}
          className={`${field} cursor-pointer`}
          {...aria("type")}
        >
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
        <label htmlFor="message" className={label}>Message *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us about your organisation, the audience, the date you have in mind and the place."
          className={`${field} resize-y`}
          {...aria("message")}
        />
        {err("message")}
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-muted sm:max-w-sm">
          We use your details only to reply to this inquiry.
        </p>
        <button
          type="submit"
          disabled={state === "sending"}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-forest px-7 text-sm font-medium text-paper transition-colors hover:bg-forest-deep disabled:opacity-60"
        >
          {state === "sending" ? "Sending..." : "Send inquiry"}
          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {(state === "not-configured" || state === "failed" || state === "rate-limited") && (
          <div className="border border-ochre/60 bg-ochre/10 p-5 text-sm leading-relaxed">
            <p className="font-medium">
              {state === "not-configured"
                ? "Online sending is not switched on yet, so your message has not been sent."
                : state === "rate-limited"
                  ? "Too many messages from this connection. Please try again later."
                  : "Something went wrong and your message was not sent."}
            </p>
            <p className="mt-2 text-muted">You can send the same message directly instead:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex min-h-11 items-center bg-ink px-5 text-paper">
                Send by email
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-ink px-5">
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
