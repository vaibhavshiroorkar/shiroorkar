import Link from "next/link";
import { ImpactStats } from "@/components/ImpactStats";
import { InquiryBand } from "@/components/InquiryBand";
import { ReelCard } from "@/components/MediaCard";
import { Photo } from "@/components/Photo";
import { SourceNote, VerifyBadge } from "@/components/Verify";
import { ArrowIcon, ArrowLink, ButtonLink, Eyebrow, SectionHeader } from "@/components/ui";
import { intro, philosophy, portraits, roles } from "@/content/bio";
import { focusAreas, initiatives } from "@/content/initiatives";
import { media } from "@/content/media";
import { offerings } from "@/content/offerings";
import { instagram, site } from "@/content/site";
import { sources } from "@/content/sources";
import { publishable } from "@/lib/publish";

export default function Home() {
  const reels = publishable(media).filter((m) => m.kind === "reel" && m.featured).slice(0, 4);
  const projects = publishable(initiatives).slice(0, 3);
  const press = publishable(media).filter((m) => m.kind === "press");

  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="container-page grid gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-12 lg:pb-24 lg:pt-16">
          <div className="hero-in flex flex-col lg:col-span-7 lg:pr-6">
            <Eyebrow className="text-forest">{site.person}</Eyebrow>
            <h1 className="mt-8 text-[3.1rem] leading-[0.98] sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
              Turning experience into meaningful <em className="text-forest">change.</em>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Decades in Mumbai&apos;s civic administration. A story that became a feature film. Now
              a public voice for the environment and for communities, sharing what works.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/work-with-us">Work With Us</ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                Explore His Journey
              </ButtonLink>
            </div>
          </div>
          <div className="hero-in-delay lg:col-span-5">
            <Photo image={portraits.hero} priority sizes="(min-width: 1024px) 38vw, 100vw" />
            <p className="mt-3 text-xs text-muted">
              {site.person}, retired Assistant Municipal Commissioner, BMC
            </p>
          </div>
        </div>

        <div className="border-y border-line">
          <ul className="container-page grid sm:grid-cols-3">
            {roles.map((r, i) => (
              <li
                key={r.label}
                className={`flex items-baseline gap-4 py-5 sm:py-6 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0 sm:pl-6" : ""}`}
              >
                <span className="font-display text-sm text-ochre">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">{r.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Purpose + introduction */}
      <section className="container-page py-24 lg:py-36">
        <p className="reveal max-w-5xl font-display text-4xl leading-[1.1] sm:text-6xl lg:text-7xl">
          Experience<span className="text-ochre">.</span> Responsibility<span className="text-ochre">.</span>{" "}
          Impact<span className="text-ochre">.</span>
        </p>

        <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-12 lg:gap-16">
          <div className="reveal lg:col-span-5">
            <Photo image={portraits.intro} sizes="(min-width: 1024px) 35vw, 100vw" tone="paper" />
          </div>
          <div className="reveal flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <Eyebrow className="text-forest">Introduction</Eyebrow>
            <p className="mt-6 font-display text-3xl leading-snug sm:text-4xl">{intro.lead}</p>
            {intro.body.map((p) => (
              <p key={p} className="mt-6 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ArrowLink href="/about" className="text-forest">
                Read his story
              </ArrowLink>
              <SourceNote source={intro.source} />
            </div>
          </div>
        </div>
      </section>

      {/* Professional background */}
      <section className="border-t border-line bg-paper-deep/60 py-24 lg:py-32">
        <div className="container-page">
          <SectionHeader
            eyebrow="Professional background"
            title="A public life, in three parts."
            intro="Administration taught him how cities work. Law taught him how to argue for change. The environment is where he puts both to use."
          />
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-3">
            {roles.map((r) => (
              <article key={r.label} className="reveal flex flex-col bg-paper p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">{r.label}</p>
                <h3 className="mt-6 text-2xl leading-snug">
                  {r.title}
                  <VerifyBadge status={r.status} note={r.note} />
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{r.body}</p>
                {r.source && (
                  <div className="mt-6">
                    <SourceNote source={r.source} />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental work */}
      <section className="container-page py-24 lg:py-32">
        <SectionHeader
          eyebrow="Environmental work"
          title={<>Work on the ground, explained in plain words.</>}
          intro="Protecting green cover and public space, and helping people understand the civic systems that shape their surroundings."
          action={
            <ArrowLink href="/work" className="text-forest">
              See his environmental work
            </ArrowLink>
          }
        />

        {projects.length > 0 ? (
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {projects.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work#${p.slug}`}
                className={`group reveal block ${i === 0 ? "lg:col-span-7 lg:row-span-2" : "lg:col-span-5"}`}
              >
                <div className="overflow-hidden">
                  <Photo image={p.image} ratio={i === 0 ? "aspect-[4/3]" : "aspect-[16/9]"} tone="paper" />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.14em] text-muted">
                  {p.category} &middot; {p.location}
                </p>
                <h3 className={`mt-2 leading-snug group-hover:text-forest ${i === 0 ? "text-3xl" : "text-2xl"}`}>
                  {p.title}
                  <VerifyBadge status={p.status} note={p.note} />
                </h3>
                {i === 0 && <p className="mt-3 max-w-xl leading-relaxed text-muted">{p.summary}</p>}
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-16 grid border-t border-line sm:grid-cols-3">
          {focusAreas.map((f, i) => (
            <div key={f.title} className={`reveal py-8 sm:px-6 sm:first:pl-0 ${i > 0 ? "border-t border-line sm:border-l sm:border-t-0" : ""}`}>
              <h3 className="text-xl">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Verified impact */}
      <section className="on-dark bg-forest py-24 text-paper lg:py-32">
        <div className="container-page">
          <SectionHeader
            dark
            eyebrow="Impact on the record"
            title="What changed, and who reported it."
            intro="Every figure here links to its source. We add new numbers only once they are documented."
          />
          <div className="mt-16">
            <ImpactStats dark />
          </div>
        </div>
      </section>

      {/* Reels */}
      <section className="py-24 lg:py-32">
        <div className="container-page">
          <SectionHeader
            eyebrow="Reels"
            title="Short films from the field."
            intro={`He shares his work, public issues and lessons from public service on Instagram as ${instagram.handle}.`}
            action={
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                <ArrowLink href="/media" className="text-forest">
                  All reels and media
                </ArrowLink>
                <ArrowLink href={instagram.url} external className="text-forest">
                  Follow on Instagram
                </ArrowLink>
              </div>
            }
          />
        </div>
        {reels.length > 0 ? (
          <div className="container-page mt-14">
            <div className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0">
              {reels.map((r) => (
                <ReelCard key={r.id} item={r} rail />
              ))}
            </div>
          </div>
        ) : (
          <div className="container-page mt-14">
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-start justify-between gap-6 border border-line p-8 transition-colors hover:border-forest sm:flex-row sm:items-center lg:p-12"
            >
              <span className="font-display text-3xl sm:text-4xl">{instagram.handle}</span>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-forest">
                Watch the latest Reels on Instagram
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        )}
      </section>

      {/* Media and film */}
      <section className="on-dark relative overflow-hidden bg-ink py-24 text-paper lg:py-36">
        <div className="container-page grid gap-16 lg:grid-cols-12">
          <div className="reveal lg:col-span-6">
            <Eyebrow className="text-sage">Media and film</Eyebrow>
            <h2 className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
              From the ward to the screen.
            </h2>
            <p className="mt-8 max-w-lg leading-relaxed text-paper/75">
              The story of the civic workers he encouraged back to school became the Marathi feature
              film <em>Ata Thambaycha Naay!</em> (&ldquo;Now we won&apos;t stop&rdquo;), released on
              1 May 2025. Ashutosh Gowariker plays him. The film won Best Film at the Filmfare Awards
              Marathi.
            </p>
            <div className="mt-6">
              <SourceNote source={sources.wikiFilm} dark />
            </div>
            {press.length > 0 && (
              <ul className="mt-12 border-t border-paper/15">
                {press.map((p) => (
                  <li key={p.id} className="border-b border-paper/15">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-6 py-5"
                    >
                      <span>
                        <span className="block text-xs uppercase tracking-[0.16em] text-sage">
                          {p.outlet} {p.date ? `· ${p.date}` : ""}
                        </span>
                        <span className="mt-2 block leading-snug group-hover:text-ochre">{p.title}</span>
                      </span>
                      <ArrowIcon className="mt-6 size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <figure className="reveal flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <span aria-hidden className="font-display text-8xl leading-none text-ochre">
              &ldquo;
            </span>
            <blockquote className="font-display text-3xl leading-snug sm:text-4xl">{philosophy.quote}</blockquote>
            <figcaption className="mt-8 text-sm text-paper/60">{philosophy.attribution}</figcaption>
          </figure>
        </div>
      </section>

      {/* Speaking */}
      <section className="container-page py-24 lg:py-32">
        <SectionHeader
          eyebrow="Speaking and workshops"
          title="Invite him to your stage, school or society."
          intro="Talks and sessions built on real public service, for companies, colleges, schools and communities."
          action={
            <ButtonLink href="/speaking" variant="secondary" className="self-start">
              All topics
            </ButtonLink>
          }
        />
        <ul className="mt-16 border-t border-line">
          {offerings.slice(0, 4).map((o, i) => (
            <li key={o.id} className="reveal border-b border-line">
              <Link
                href={`/speaking#${o.id}`}
                className="group grid gap-2 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6"
              >
                <span className="font-display text-sm text-ochre sm:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl leading-snug transition-colors group-hover:text-forest sm:col-span-5 sm:text-3xl">
                  {o.name}
                </span>
                <span className="text-sm text-muted sm:col-span-5">{o.format}</span>
                <ArrowIcon className="hidden size-5 justify-self-end text-forest transition-transform group-hover:translate-x-1 sm:col-span-1 sm:block" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <InquiryBand />
    </>
  );
}
