import type { Metadata } from "next";
import { InquiryBand } from "@/components/InquiryBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Timeline } from "@/components/Timeline";
import { SourceNote, VerifyBadge } from "@/components/Verify";
import { Eyebrow, SectionHeader } from "@/components/ui";
import { philosophy, portraits, roles, story } from "@/content/bio";
import { publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "About",
  description:
    "The journey of Udaykumar Shiroorkar: retired Assistant Municipal Commissioner of the BMC, advocate and environmental worker whose story inspired the film Ata Thambaycha Naay!",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const chapters = publishable(story);
  return (
    <>
      <PageHero
        eyebrow="About Udaykumar"
        title={
          <>
            A life spent making <em className="text-forest">public</em> work work.
          </>
        }
        intro="Civic administrator, advocate and environmental worker. This is his story, told with sources where the record exists."
      />

      <section className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Photo image={portraits.about} ratio="aspect-[3/4]" sizes="(min-width: 1024px) 30vw, 100vw" />
            <dl className="mt-8 divide-y divide-line border-y border-line text-sm">
              {roles.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-3">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className="text-right">{r.title}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          {chapters.map((c, i) => (
            <article key={c.heading} className={`reveal ${i > 0 ? "mt-16 border-t border-line pt-16" : ""}`}>
              <p className="font-display text-sm text-ochre">Chapter {String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">
                {c.heading}
                <VerifyBadge status={c.status} note={c.note} />
              </h2>
              {c.paragraphs.map((p) => (
                <p key={p} className="mt-6 text-lg leading-relaxed text-ink/85">
                  {p}
                </p>
              ))}
              {c.source && (
                <div className="mt-6">
                  <SourceNote source={c.source} />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="on-dark bg-ink py-24 text-paper lg:py-32">
        <figure className="container-page max-w-5xl">
          <Eyebrow className="text-sage">Philosophy</Eyebrow>
          <blockquote className="mt-8 font-display text-4xl leading-[1.15] sm:text-5xl lg:text-6xl">
            &ldquo;{philosophy.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-paper/60">
            {philosophy.attribution}
            <SourceNote source={philosophy.source} dark />
          </figcaption>
        </figure>
      </section>

      <section id="timeline" className="container-page py-24 lg:py-32">
        <SectionHeader
          eyebrow="Timeline"
          title="Milestones on the record."
          intro="Dates appear once they are confirmed. Each entry links to where it was reported."
        />
        <div className="mt-14">
          <Timeline />
        </div>
      </section>

      <section className="container-page pb-24">
        <p className="max-w-3xl border-l-2 border-ochre pl-6 text-sm leading-relaxed text-muted">
          Udaykumar&apos;s legal background is described here for context only. This website does
          not offer or advertise legal services.
        </p>
      </section>

      <InquiryBand />
    </>
  );
}
