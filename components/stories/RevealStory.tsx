"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Story, StoryCard } from "@/content/bio";
import { instagram } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";
import { ArrowUpRight } from "@/components/ui/icons";

function Overlay({ story, cards }: { story: Story; cards: StoryCard[] }) {
  return (
    <div className="shell relative z-10 flex h-full flex-col justify-end pb-10 text-cream lg:pb-20">
      <p className="display text-[clamp(3rem,13vw,13rem)]">{story.title}</p>
      <div className="mt-5 grid gap-5 md:mt-8 md:grid-cols-[1fr_1fr_auto] md:items-end md:gap-8">
        {cards.map((c) => (
          <div key={c.title}>
            <h3 className="text-lg font-semibold md:text-xl">
              {c.title}
              <VerifyBadge status={c.status} note={c.note} />
            </h3>
            <p className="mt-1 max-w-sm text-sm leading-relaxed text-cream/80 md:mt-2 md:text-base">{c.lines}</p>
            <SourceLink source={c.source} className="mt-2" />
          </div>
        ))}
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-14 items-center gap-2 self-start rounded-full bg-cream px-7 font-semibold text-stage transition-colors hover:bg-ochre md:self-end"
        >
          Watch his Reels <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens Instagram in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

/**
 * A small photo window that grows to fill the screen as the visitor scrolls,
 * then carries the story's title and facts over the photo.
 */
export function RevealStory({ story, cards }: { story: Story; cards: StoryCard[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.55],
    ["inset(22% 28% 22% 28% round 32px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const imageScale = useTransform(scrollYProgress, [0, 0.55], [1.25, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const image = cards[0]?.image;

  if (reduce) {
    return (
      <div className="relative h-[90svh] overflow-hidden">
        {image && <Photo image={image} className="absolute inset-0 h-full" sizes="100vw" />}
        <div className="absolute inset-0 bg-gradient-to-t from-stage-deep via-stage-deep/40 to-transparent" />
        <Overlay story={story} cards={cards} />
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[160svh] md:h-[230svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath }} className="absolute inset-0">
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            {image && <Photo image={image} className="h-full" sizes="100vw" />}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-stage-deep via-stage-deep/40 to-transparent" />
        </motion.div>
        <motion.div style={{ opacity: textOpacity }} className="absolute inset-0">
          <Overlay story={story} cards={cards} />
        </motion.div>
      </div>
    </div>
  );
}
