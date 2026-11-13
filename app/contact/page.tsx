import type { Metadata } from "next";
import { Suspense } from "react";
import { InquiryForm, InquiryFormFromParams } from "@/components/sections/InquiryForm";
import { ArrowUpRight } from "@/components/ui/icons";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Udaykumar Shiroorkar about talks, workshops, environmental projects, press or a visit.",
  alternates: { canonical: "/contact" },
};

/*
 * Three blocks: intro, form and links. Phones stack them in that order, so the
 * links sit below the form. Desktop puts the intro and links in the left column
 * and the form on the right.
 */
export default function ContactPage() {
  const wa = whatsappLink();
  return (
    <section className="grain relative min-h-svh overflow-hidden bg-stage text-cream">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_10%,rgba(198,154,90,0.16),transparent_70%)]" />
      <div className="shell relative z-10 grid gap-12 pb-20 pt-32 lg:grid-cols-[1fr_1.15fr] lg:grid-rows-[auto_1fr] lg:gap-x-20 lg:gap-y-10 lg:pb-28 lg:pt-40">
        <div>
          <h1 className="display text-[clamp(4.5rem,13vw,10rem)]">
            Let&apos;s <span className="font-serif font-normal normal-case italic tracking-normal text-ochre">talk</span>
          </h1>
          <p className="mt-6 max-w-sm text-lg text-cream/75">
            Talks, workshops, projects, press or a visit. Every message gets a personal reply.
          </p>
        </div>

        <div id="inquiry" className="scroll-mt-28 rounded-[28px] bg-paper p-6 text-ink sm:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <Suspense fallback={<InquiryForm />}>
            <InquiryFormFromParams />
          </Suspense>
        </div>

        <ul className="space-y-3 text-lg lg:col-start-1 lg:row-start-2">
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 break-all underline-offset-4 hover:underline">
              <span className="w-24 shrink-0 text-sm text-cream/50">Gmail</span>
              {site.email}
            </a>
          </li>
          {wa && (
            <li>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                <span className="w-24 shrink-0 text-sm text-cream/50">WhatsApp</span>
                Message <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          )}
          {site.socials.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 underline-offset-4 hover:underline">
                <span className="w-24 shrink-0 text-sm text-cream/50">{s.label}</span>
                {s.handle} <ArrowUpRight className="size-4" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
