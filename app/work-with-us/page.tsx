import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { InquiryForm, InquiryFormFromParams } from "@/components/sections/InquiryForm";
import { PageHeader } from "@/components/site/PageHeader";
import { Arrow } from "@/components/ui/icons";
import { inquiryTypes } from "@/content/inquiryTypes";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Invite Udaykumar Shiroorkar to speak, organise an environmental workshop, discuss a project or explore a partnership.",
  alternates: { canonical: "/work-with-us" },
};

export default function WorkWithUsPage() {
  return (
    <>
      <PageHeader title="Work" accent="together" intro="Pick what you have in mind, or just write to us. Every inquiry is read and answered personally." />

      <section className="shell py-16 lg:py-24">
        <h2 className="sr-only">Ways to work together</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {inquiryTypes.map((t) => (
            <li key={t.id}>
              <Link
                href={`/work-with-us?type=${t.id}#inquiry`}
                scroll={false}
                className="group flex h-full flex-col justify-between gap-10 rounded-[24px] bg-card p-6 transition-colors hover:bg-stage hover:text-cream"
              >
                <span className="text-xl font-semibold leading-snug tracking-tight">{t.title}</span>
                <span className="flex items-end justify-between gap-4 text-sm text-stone group-hover:text-cream/70">
                  {t.description}
                  <Arrow className="size-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="inquiry" className="shell grid scroll-mt-24 gap-12 pb-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="display text-[clamp(3.5rem,8vw,7rem)] text-stage">
            Tell us <span className="font-serif font-normal normal-case italic tracking-normal text-forest">about it</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg text-stone">
            A few lines are enough. Fees and formats are agreed per engagement; nothing is booked or
            paid online.
          </p>
          <a href={`mailto:${site.email}`} className="mt-8 inline-block break-all text-lg font-semibold text-forest underline underline-offset-4">
            {site.email}
          </a>
        </div>
        <Suspense fallback={<InquiryForm />}>
          <InquiryFormFromParams />
        </Suspense>
      </section>
    </>
  );
}
