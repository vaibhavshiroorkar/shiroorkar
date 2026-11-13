import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm, InquiryFormFromParams } from "@/components/sections/InquiryForm";
import { ArrowUpRight } from "@/components/ui/icons";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Invite",
  description:
    "Invite Udaykumar Shiroorkar to speak, run a workshop, or work with you on an environmental project.",
  alternates: { canonical: "/work-with-us" },
};

export default function WorkWithUsPage() {
  const wa = whatsappLink();
  return (
    <section className="grain relative min-h-svh overflow-hidden bg-stage text-cream">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_10%,rgba(198,154,90,0.16),transparent_70%)]" />
      <div className="shell relative z-10 grid gap-12 pb-20 pt-32 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:pb-28 lg:pt-40">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h1 className="display text-[clamp(4.5rem,13vw,10rem)]">
            Let&apos;s <span className="font-serif font-normal normal-case italic tracking-normal text-ochre">talk</span>
          </h1>
          <p className="mt-6 max-w-sm text-lg text-cream/75">
            Invite {site.firstName} to speak, run a workshop or work with you on an environmental
            project. Every inquiry gets a personal reply.
          </p>
          <ul className="mt-10 space-y-3 text-lg">
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 break-all underline-offset-4 hover:underline">
                <span className="w-24 shrink-0 text-sm text-cream/50">Gmail</span>
                {site.email}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                  WhatsApp <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
            {site.socials.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                  <span className="w-24 text-sm text-cream/50">{s.label}</span>
                  {s.handle} <ArrowUpRight className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div id="inquiry" className="scroll-mt-28 rounded-[28px] bg-paper p-6 text-ink sm:p-10">
          <Suspense fallback={<InquiryForm />}>
            <InquiryFormFromParams />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
