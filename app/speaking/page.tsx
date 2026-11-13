import type { Metadata } from "next";
import { InquiryBand } from "@/components/InquiryBand";
import { OfferingCard } from "@/components/OfferingCard";
import { PageHero } from "@/components/PageHero";
import { ButtonLink, SectionHeader } from "@/components/ui";
import { offerings } from "@/content/offerings";

export const metadata: Metadata = {
  title: "Speaking & Workshops",
  description:
    "Invite Udaykumar Shiroorkar for keynotes, leadership talks, environmental awareness sessions, student workshops and community programmes.",
  alternates: { canonical: "/speaking" },
};

const steps = [
  { title: "Tell us the occasion", body: "Audience, date, place and what you hope people take away." },
  { title: "We shape the session", body: "We suggest a format and adapt the content to your audience." },
  { title: "He shows up prepared", body: "With local examples and time for questions from the room." },
];

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking and workshops"
        title={
          <>
            Real public service, told to the people who can <em className="text-forest">use it.</em>
          </>
        }
        intro="Keynotes, awareness sessions and workshops for companies, colleges, schools and communities."
      >
        <ButtonLink href="/work-with-us?type=speaking#inquiry" className="self-start">
          Invite Udaykumar
        </ButtonLink>
      </PageHero>

      <section className="container-page py-20 lg:py-28">
        <SectionHeader
          eyebrow="Topics"
          title="Programmes."
          intro="Each programme can run as a talk, a workshop or a longer engagement. Formats and fees are agreed per event."
        />
        <div className="mt-14">
          {offerings.map((o, i) => (
            <div key={o.id} id={o.id} className="scroll-mt-24">
              <OfferingCard offering={o} index={i} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper-deep/60 py-20 lg:py-28">
        <div className="container-page">
          <SectionHeader eyebrow="How it works" title="Three steps to a booking." />
          <ol className="mt-14 grid gap-px bg-line sm:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal bg-paper p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ochre">Step {i + 1}</p>
                <h3 className="mt-4 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <InquiryBand title="Planning an event?" />
    </>
  );
}
