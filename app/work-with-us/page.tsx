import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { InquiryForm, InquiryFormFromParams } from "@/components/InquiryForm";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, Eyebrow } from "@/components/ui";
import { inquiryTypes } from "@/content/inquiryTypes";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Invite Udaykumar Shiroorkar to speak, organise an environmental workshop, discuss a project or explore a partnership.",
  alternates: { canonical: "/work-with-us" },
};

export default function WorkWithUsPage() {
  const wa = whatsappLink(`Hello, I would like to discuss working with ${site.person}.`);
  return (
    <>
      <PageHero
        eyebrow="Work with us"
        title={
          <>
            Let&apos;s do something <em className="text-forest">useful</em> together.
          </>
        }
        intro="Choose what you have in mind, or simply write to us. Every inquiry is read and answered personally."
      />

      <section className="container-page py-16 lg:py-24">
        <h2 className="sr-only">Ways to work together</h2>
        <ul className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-5">
          {inquiryTypes.map((t, i) => (
            <li key={t.id} className="bg-paper">
              <Link
                href={`/work-with-us?type=${t.id}#inquiry`}
                scroll={false}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-forest hover:text-paper"
              >
                <span className="font-display text-sm text-ochre">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-6 font-display text-2xl leading-snug">{t.title}</span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-muted group-hover:text-paper/75">
                  {t.description}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                  Start <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="inquiry" className="scroll-mt-20 border-t border-line">
        <div className="container-page grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <Eyebrow className="text-forest">Inquiry</Eyebrow>
            <h2 className="mt-6 text-4xl leading-tight sm:text-5xl">Tell us about it.</h2>
            <p className="mt-6 leading-relaxed text-muted">
              A few lines are enough to start. Include the audience, a rough date and the city.
            </p>
            <div className="mt-10 space-y-6 border-t border-line pt-8 text-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Email</p>
                <a href={`mailto:${site.email}`} className="mt-2 block break-all text-lg text-forest hover:underline">
                  {site.email}
                </a>
              </div>
              {wa && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">WhatsApp</p>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 block text-lg text-forest hover:underline">
                    Message us on WhatsApp
                  </a>
                </div>
              )}
              <p className="leading-relaxed text-muted">
                Fees and formats are agreed per engagement. We do not take bookings or payments
                online.
              </p>
            </div>
          </div>
          <div className="relative lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<InquiryForm />}>
              <InquiryFormFromParams />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
