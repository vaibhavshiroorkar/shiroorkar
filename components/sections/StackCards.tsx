"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { StoryCard } from "@/content/bio";
import { Photo } from "@/components/ui/Photo";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

const skins = [
  { card: "bg-stage text-cream", tone: "moss" as const },
  { card: "bg-forest text-cream", tone: "moss" as const },
  { card: "bg-[#e6dcc6] text-ink", tone: "forest" as const },
  { card: "bg-moss text-cream", tone: "forest" as const },
];

function Card({ item, index, total, skinIndex, progress }: { item: StoryCard; index: number; total: number; skinIndex: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Each card shrinks slightly as the ones after it slide over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.04]);
  const skin = skins[skinIndex % skins.length];
  return (
    <div className="sticky" style={{ top: `calc(11svh + ${index * 22}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={`grain grid gap-6 overflow-hidden rounded-[28px] p-6 sm:p-10 md:min-h-[72vh] md:grid-cols-2 md:items-stretch md:gap-8 lg:p-14 ${skin.card}`}
      >
        <div className="relative z-10 flex flex-col justify-center">
          <div>
            <h3 className="display text-[clamp(2.75rem,9vw,8rem)]">
              {item.title}
              <VerifyBadge status={item.status} note={item.note} />
            </h3>
            <p className="mt-4 max-w-md leading-relaxed opacity-85 md:mt-6 md:text-lg">{item.lines}</p>
            <SourceLink source={item.source} className="mt-5" />
          </div>
        </div>
        <Photo image={item.image} tone={skin.tone} className="relative z-10 aspect-[4/3] rounded-2xl md:aspect-auto md:min-h-64" sizes="(min-width: 768px) 45vw, 100vw" />
      </motion.article>
    </div>
  );
}

/**
 * Cards that stack on top of each other while scrolling.
 * `skinOffset` starts each story on a different colour so neighbouring stories differ.
 */
export function StackCards({ items, skinOffset = 0 }: { items: StoryCard[]; skinOffset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative flex flex-col gap-[14svh] pb-[6svh]">
      {items.map((item, i) => (
        <Card key={item.title} item={item} index={i} total={items.length} skinIndex={i + skinOffset} progress={scrollYProgress} />
      ))}
    </div>
  );
}
