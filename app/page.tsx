import { CutoutHero } from "@/components/hero/CutoutHero";
import { Reveal } from "@/components/motion/Reveal";
import { WordReveal } from "@/components/motion/WordReveal";
import { Marquee } from "@/components/sections/Marquee";
import { ProgrammeList } from "@/components/sections/ProgrammeList";
import { ReelsRail } from "@/components/sections/ReelsRail";
import { StackCards } from "@/components/sections/StackCards";
import { Pill } from "@/components/ui/Pill";
import { heroCutout, stories } from "@/content/bio";
import { media } from "@/content/media";
import { offerings } from "@/content/offerings";
import { instagram, site } from "@/content/site";
import { publishable } from "@/lib/publish";

export default function Home() {
  const reels = publishable(media).filter((m) => m.kind === "reel");

  return (
    <>
      <CutoutHero desktop={heroCutout.desktop} mobile={heroCutout.mobile} />

      {/* Stories: a sentence that lights up on scroll, then its stacking cards. */}
      {stories.map((story, i) => {
        const cards = publishable(story.cards);
        if (cards.length === 0) return null;
        return (
          <section key={story.id} id={story.id} aria-labelledby={`${story.id}-title`} className="shell">
            <h2 id={`${story.id}-title`} className="sr-only">
              {story.title}
            </h2>
            <div className="pb-20 pt-28 sm:pt-36 lg:pb-28 lg:pt-48">
              <WordReveal
                className="max-w-6xl text-[clamp(2rem,5.4vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-stage"
                segments={story.statement}
              />
            </div>
            <StackCards items={cards} skinOffset={i} />
          </section>
        );
      })}

      {/* Reels */}
      {reels.length > 0 ? (
        <ReelsRail reels={reels} profile={instagram} />
      ) : (
        <section className="shell py-28">
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grain group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[28px] bg-stage p-8 text-cream sm:p-12 md:flex-row md:items-end"
          >
            <span className="display relative z-10 text-[clamp(3rem,8vw,7rem)]">Watch the Reels</span>
            <span className="relative z-10 inline-flex items-center gap-2 text-lg">{instagram.handle} on Instagram</span>
          </a>
        </section>
      )}

      <Marquee items={["Free Press Journal", "Ata Thambaycha Naay!", "Best Film, Filmfare Awards Marathi", "Instagram @udaykumarshiroorkar"]} />

      {/* Speaking */}
      <section aria-labelledby="speak-title" className="shell py-28 lg:py-40">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 id="speak-title" className="display text-[clamp(3.5rem,10vw,9rem)] text-stage">
            On your <span className="font-serif font-normal normal-case italic tracking-normal text-forest">stage</span>
          </h2>
          <p className="max-w-sm text-lg text-stone">
            Talks, workshops and programmes for companies, colleges, schools and communities.
          </p>
        </div>
        <ProgrammeList offerings={offerings} />
        <div className="mt-10">
          <Pill href="/speaking" tone="outline-ink">
            All programmes
          </Pill>
        </div>
      </section>

      {/* Closing */}
      <section className="grain relative overflow-hidden bg-stage text-cream">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_100%,rgba(198,154,90,0.18),transparent_70%)]" />
        <div className="shell relative z-10 py-28 lg:py-40">
          <Reveal>
            <h2 className="display text-[clamp(4rem,14vw,13rem)]">
              Let&apos;s work <span className="font-serif font-normal normal-case italic tracking-normal text-ochre">together</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <p className="max-w-md text-lg text-cream/75">
                Invite {site.firstName} to speak, run a workshop or work with you on an environmental
                project. Every inquiry gets a personal reply.
              </p>
              <div className="flex flex-wrap gap-3">
                <Pill href="/work-with-us">Start an inquiry</Pill>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-12 items-center rounded-full border border-cream/30 px-6 text-[15px] font-semibold hover:bg-cream hover:text-stage"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
