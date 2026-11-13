"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import type { StoryCard } from "@/content/bio";
import { Photo } from "@/components/ui/Photo";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

const pad = (n: number) => String(n).padStart(2, "0");
const EASE = [0.16, 1, 0.3, 1] as const;

/** Plain stacked steps: used on phones and for readers who prefer reduced motion. */
function StepList({ cards }: { cards: StoryCard[] }) {
  return (
    <ol className="shell space-y-14 pb-28">
      {cards.map((c, i) => (
        <li key={c.title}>
          <Photo image={c.image} className="aspect-[4/3] rounded-[24px]" sizes="100vw" />
          <p className="mt-5 text-sm tabular-nums text-stone">
            {pad(i + 1)} / {pad(cards.length)}
          </p>
          <h3 className="display mt-2 text-[clamp(3rem,12vw,5rem)] text-stage">
            {c.title}
            <VerifyBadge status={c.status} note={c.note} />
          </h3>
          <p className="mt-3 text-lg leading-relaxed text-ink/80">{c.lines}</p>
          <SourceLink source={c.source} className="mt-3" />
        </li>
      ))}
    </ol>
  );
}

/**
 * A sequence told one step at a time. On desktop the section pins while the
 * visitor scrolls: the photo cross-fades and the step text changes beside it.
 */
export function StepsStory({ cards }: { cards: StoryCard[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(cards.length - 1, Math.max(0, Math.floor(p * cards.length))));
  });

  if (reduce) return <StepList cards={cards} />;
  const c = cards[active];

  return (
    <>
      <div className="md:hidden">
        <StepList cards={cards} />
      </div>

      <div ref={ref} className="relative hidden md:block" style={{ height: `${cards.length * 85}vh` }}>
        {/* Screen readers get every step at once; the pinned view only ever shows one. */}
        <ol className="sr-only">
          {cards.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.lines}</p>
            </li>
          ))}
        </ol>
        <div className="shell sticky top-0 grid h-screen grid-cols-[1.1fr_1fr] items-center gap-16 py-20">
          <div className="relative h-[68vh] overflow-hidden rounded-[28px]">
            <AnimatePresence initial={false}>
              <motion.div
                key={c.title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Photo image={c.image} className="h-full" sizes="55vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex h-[68vh] gap-10">
            <div className="relative w-px shrink-0 bg-ink/15" aria-hidden>
              <motion.div style={{ scaleY: scrollYProgress }} className="absolute inset-0 origin-top bg-forest" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm tabular-nums text-stone" aria-hidden>
                {pad(active + 1)} / {pad(cards.length)}
              </p>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <div aria-hidden>
                    <p className="display mt-3 text-[clamp(3.5rem,7vw,7rem)] text-stage">
                      {c.title}
                      <VerifyBadge status={c.status} note={c.note} />
                    </p>
                    <p className="mt-5 max-w-md text-xl leading-relaxed text-ink/80">{c.lines}</p>
                  </div>
                  <SourceLink source={c.source} className="mt-4" />
                </motion.div>
              </AnimatePresence>
              <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-hidden>
                {cards.map((s, i) => (
                  <li key={s.title} className={i === active ? "font-semibold text-stage" : "text-stone/60"}>
                    {s.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
