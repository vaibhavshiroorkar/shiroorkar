"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { inquiryTypes } from "@/content/inquiryTypes";
import { offerings, type InquiryTypeId } from "@/content/offerings";
import { site, whatsappLink } from "@/content/site";
import { fieldErrors, inquirySchema, type FieldErrors, type InquiryResponse } from "@/lib/inquiry";
import { Arrow } from "@/components/ui/icons";

type State = "idle" | "sending" | "sent" | "not-configured" | "failed" | "rate-limited";

/** Reads ?type= and ?topic= so links elsewhere can preselect the topic. Needs a Suspense boundary. */
export function InquiryFormFromParams() {
  const params = useSearchParams();
  const raw = params.get("type");
  const type = inquiryTypes.some((t) => t.id === raw) ? (raw as InquiryTypeId) : undefined;
  const topic = params.get("topic") ?? "";
  // Remount when the query changes so the preselection updates without syncing state in an effect.
  return <InquiryForm key={`${type}-${topic}`} defaultType={type} topic={topic} />;
}

const field =
  "block w-full border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-forest aria-[invalid=true]:border-red-700";

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
      <div role="status" className="py-10">
        <p className="display text-6xl text-stage">Thank you</p>
        <p className="mt-4 max-w-sm text-lg text-stone">Your message has reached us. We will reply by email.</p>
      </div>
    );
  }

  const typeLabel = inquiryTypes.find((t) => t.id === draft?.type)?.label ?? "";
  const fallback = draft
    ? `Name: ${draft.name}\nOrganisation: ${draft.organization}\nTopic: ${typeLabel}\n\n${draft.message}`
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

  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-8">
      <input type="hidden" name="topic" value={topic} />
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <fieldset aria-describedby={errors.type ? "type-error" : undefined}>
        <legend className="text-sm text-stone">
          {topicName ? (
            <>
              About <strong className="font-semibold text-ink">{topicName}</strong>
            </>
          ) : (
            "What is it about?"
          )}
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {inquiryTypes.map((t) => (
            <label key={t.id} className="cursor-pointer">
              <input type="radio" name="type" value={t.id} defaultChecked={t.id === defaultType} className="peer sr-only" />
              <span className="inline-flex h-11 items-center rounded-full border border-ink/15 px-5 text-sm font-medium transition-colors hover:border-ink peer-checked:border-stage peer-checked:bg-stage peer-checked:text-cream peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ochre">
                {t.label}
              </span>
            </label>
          ))}
        </div>
        {err("type")}
      </fieldset>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">Name</label>
          <input id="name" name="name" autoComplete="name" placeholder="Your name" className={field} {...aria("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className="sr-only">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" placeholder="Email" className={field} {...aria("email")} />
          {err("email")}
        </div>
      </div>
      <div>
        <label htmlFor="organization" className="sr-only">Organisation (optional)</label>
        <input id="organization" name="organization" autoComplete="organization" placeholder="Organisation (optional)" className={field} />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">Message</label>
        <textarea id="message" name="message" rows={4} placeholder="What do you have in mind? Audience, date and city help." className={`${field} resize-none`} {...aria("message")} />
        {err("message")}
      </div>

      <button
        type="submit"
        disabled={state === "sending"}
        className="group inline-flex h-14 items-center justify-center gap-3 justify-self-start rounded-full bg-stage px-8 font-semibold text-cream transition-colors hover:bg-forest disabled:opacity-60"
      >
        {state === "sending" ? "Sending..." : "Send"}
        <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
      </button>

      <div aria-live="polite">
        {(state === "not-configured" || state === "failed" || state === "rate-limited") && (
          <div className="rounded-2xl bg-ochre/20 p-5 text-sm">
            <p className="font-semibold">
              {state === "not-configured"
                ? "Online sending is not on yet, so this was not sent."
                : state === "rate-limited"
                  ? "Too many messages from this connection. Please try later."
                  : "Something went wrong, so this was not sent."}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a href={mailto} className="inline-flex h-11 items-center rounded-full bg-stage px-5 font-semibold text-cream">
                Send by email instead
              </a>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full border border-ink/25 px-5 font-semibold">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
