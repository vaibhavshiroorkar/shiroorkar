import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { offerings } from "@/content/offerings";

export const metadata: Metadata = {
  title: "Speaking & Workshops",
  description:
    "Invite Udaykumar Shiroorkar for keynotes, leadership talks, environmental awareness sessions, student workshops and community programmes.",
  alternates: { canonical: "/speaking" },
};

export default function SpeakingPage() {
  return (
    <>
      <PageHeader title="On your" accent="stage" intro="Keynotes, awareness sessions and workshops built on real public service. Formats and fees are agreed per event.">
        <Pill href="/work-with-us?type=speaking#inquiry">Invite Udaykumar</Pill>
      </PageHeader>

      <section className="shell space-y-6 py-20 lg:py-28">
        {offerings.map((o, i) => (
          <Reveal key={o.id}>
            <article id={o.id} className="grid scroll-mt-28 gap-8 rounded-[28px] bg-card p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
              <div>
                <p className="text-sm font-semibold text-forest">{o.format}</p>
                <h2 className="display mt-4 text-[clamp(3rem,7vw,6rem)] text-stage">{o.name}</h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/80">{o.summary}</p>
              </div>
              <div className="flex flex-col justify-between gap-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold">Who it is for</p>
                    <ul className="mt-3 space-y-2 text-stone">
                      {o.audience.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">What people leave with</p>
                    <ul className="mt-3 space-y-2 text-stone">
                      {o.takeaways.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <Pill href={`/work-with-us?type=${o.inquiryType}&topic=${o.id}#inquiry`} tone={i % 2 ? "stage" : "ochre"}>
                    Ask about this
                  </Pill>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </section>
    </>
  );
}
