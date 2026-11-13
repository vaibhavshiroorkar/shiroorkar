import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Pill } from "@/components/ui/Pill";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";
import { philosophy, portraits, roles, story } from "@/content/bio";
import { timeline } from "@/content/timeline";
import { draftMode, publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "About",
  description:
    "The journey of Udaykumar Shiroorkar: retired Assistant Municipal Commissioner of the BMC, advocate and environmental worker whose story inspired the film Ata Thambaycha Naay!",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="His" accent="story" intro="Civic administrator, advocate and environmental worker. Told with sources wherever the record exists." />

      <section className="shell grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-32">
        <aside>
          <div className="lg:sticky lg:top-28">
            <Photo image={portraits.about} className="aspect-[4/5] rounded-[28px]" sizes="(min-width: 1024px) 35vw, 100vw" />
            <ul className="mt-6 space-y-2">
              {roles.map((r) => (
                <li key={r.label} className="flex items-baseline justify-between gap-4 rounded-2xl bg-card px-5 py-4">
                  <span className="text-sm text-stone">{r.label}</span>
                  <span className="text-right font-medium">{r.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="space-y-20">
          {publishable(story).map((c) => (
            <Reveal key={c.heading}>
              <article>
                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-stage">
                  {c.heading}
                  <VerifyBadge status={c.status} note={c.note} />
                </h2>
                {c.paragraphs.map((p) => (
                  <p key={p} className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/80">
                    {p}
                  </p>
                ))}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                  {[c.source, ...(c.also ?? [])].map((s) => (
                    <SourceLink key={s?.url} source={s} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest text-cream">
        <figure className="shell relative z-10 py-24 lg:py-36">
          <blockquote className="max-w-5xl font-serif text-[clamp(2.2rem,5.5vw,5rem)] italic leading-[1.08]">
            &ldquo;{philosophy.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4 text-cream/70">
            {philosophy.attribution}
            <SourceLink source={philosophy.source} />
          </figcaption>
        </figure>
      </section>

      <section className="shell py-20 lg:py-32" aria-labelledby="tl">
        <h2 id="tl" className="display text-[clamp(3.5rem,9vw,8rem)] text-stage">
          Milestones
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {publishable(timeline).map((t) => (
            <li key={t.title} className="rounded-[24px] bg-card p-7">
              <p className="text-sm font-semibold text-forest">
                {t.periodStatus !== "pending" || draftMode ? t.period : "Date to be added"}
                {t.periodStatus === "pending" && <VerifyBadge status="pending" note={t.note} />}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-snug tracking-tight">{t.title}</h3>
              <p className="mt-2 text-stone">{t.body}</p>
              <SourceLink source={t.source} className="mt-4" />
            </li>
          ))}
        </ol>
        <p className="mt-12 max-w-2xl text-sm text-stone">
          His legal background is described for context only. This website does not offer or
          advertise legal services.
        </p>
        <div className="mt-10">
          <Pill href="/work-with-us">Invite him to speak</Pill>
        </div>
      </section>
    </>
  );
}
