"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { Story, StoryCard } from "@/content/bio";
import type { Source } from "@/content/types";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

/**
 * One giant place name. Rows alternate left and right alignment inside the page
 * margins. As the page scrolls, each name sweeps inward across the empty space in
 * its row (at least 15% of the row, so long names still move), and fills in solid
 * green while crossing the middle of the screen.
 */
function PlaceRow({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const right = index % 2 === 1;
  const nameRef = useRef<HTMLSpanElement>(null);
  const travel = useMotionValue(0);
  const x = useTransform(() => (right ? -1 : 1) * scrollYProgress.get() * travel.get());

  // Travel distance = the free space beside the name, measured once fonts load and on resize.
  useEffect(() => {
    const row = ref.current;
    const name = nameRef.current;
    if (!row || !name) return;
    const measure = () => {
      const free = row.clientWidth - name.scrollWidth;
      travel.set(Math.max(free, row.clientWidth * 0.15));
    };
    measure();
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    return () => ro.disconnect();
  }, [travel]);
  const fill = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const text = "display block whitespace-nowrap text-[clamp(2.4rem,10.5vw,10rem)]";
  const align = right ? "text-right" : "text-left";

  if (reduce) {
    return <li className={`${text} ${align} text-stage`}>{name}</li>;
  }

  return (
    <li ref={ref} className={align}>
      <motion.div style={{ x }} className="relative">
        <span ref={nameRef} className={`${text} w-max text-transparent [-webkit-text-stroke:1.5px_var(--color-stage)] ${right ? "ml-auto" : ""}`}>
          {name}
        </span>
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
