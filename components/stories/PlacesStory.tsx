"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Story, StoryCard } from "@/content/bio";
import type { Source } from "@/content/types";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

/**
 * One giant place name. Rows alternate left and right alignment inside the page
 * margins, drift a little inward as the page scrolls (never past the edge), and
 * fill in solid green while crossing the middle of the screen.
 */
function PlaceRow({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const right = index % 2 === 1;
  const x = useTransform(scrollYProgress, [0, 1], right ? ["0%", "-6%"] : ["0%", "6%"]);
  const fill = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const text = "display block whitespace-nowrap text-[clamp(2.4rem,10.5vw,10rem)]";
  const align = right ? "text-right" : "text-left";

  if (reduce) {
    return <li className={`${text} ${align} text-stage`}>{name}</li>;
  }

  return (
    <li ref={ref} className={align}>
      <motion.div style={{ x }} className="relative">
        <span className={`${text} text-transparent [-webkit-text-stroke:1.5px_var(--color-stage)]`}>{name}</span>
        <motion.span aria-hidden style={{ opacity: fill }} className={`${text} absolute inset-0 text-forest`}>
          {name}
        </motion.span>
      </motion.div>
    </li>
  );
}

/** The places a story happened in, as giant drifting names, followed by its facts. */
export function PlacesStory({ story, cards }: { story: Story; cards: StoryCard[] }) {
  const places = story.places ?? [];
  // Cite each source behind the place names once.
  const placeSources = [...new Map(places.map((p) => [p.source.url, p.source] as [string, Source])).values()];

  return (
    <div className="pb-28 lg:pb-40">
      {places.length > 0 && (
        <div className="overflow-hidden">
          <ul aria-label="Neighbourhoods" className="shell leading-[0.95]">
            {places.map((p, i) => (
              <PlaceRow key={p.name} name={p.name} index={i} />
            ))}
          </ul>
          <div className="shell mt-6 flex flex-wrap gap-x-5 gap-y-1">
            {placeSources.map((s) => (
              <SourceLink key={s.url} source={s} />
            ))}
          </div>
        </div>
      )}

      <dl className="shell mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.title} className="border-t-2 border-stage pt-5">
            <dt className="text-2xl font-semibold tracking-tight text-stage">
              {c.title}
              <VerifyBadge status={c.status} note={c.note} />
            </dt>
            <dd className="mt-3 leading-relaxed text-ink/75">{c.lines}</dd>
            <dd className="mt-3">
              <SourceLink source={c.source} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
