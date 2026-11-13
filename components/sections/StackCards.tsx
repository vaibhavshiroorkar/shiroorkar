"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import type { Source, Status } from "@/content/types";
import type { ImageRef } from "@/content/types";
import { Photo } from "@/components/ui/Photo";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

type Chapter = { title: string; lines: string; image: ImageRef; status: Status; source?: Source; note?: string };

const skins = [
  { card: "bg-stage text-cream", tone: "moss" as const },
  { card: "bg-forest text-cream", tone: "moss" as const },
  { card: "bg-[#e6dcc6] text-ink", tone: "forest" as const },
  { card: "bg-moss text-cream", tone: "forest" as const },
];

function Card({ chapter, index, total, progress }: { chapter: Chapter; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  // Each card shrinks slightly as the ones after it slide over it.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - index - 1) * 0.04]);
  const skin = skins[index % skins.length];
  return (
    <div className="sticky" style={{ top: `calc(11vh + ${index * 22}px)` }}>
      <motion.article
        style={reduce ? undefined : { scale, transformOrigin: "50% 0%" }}
        className={`grain grid min-h-[72vh] gap-8 overflow-hidden rounded-[28px] p-6 sm:p-10 md:grid-cols-2 md:items-stretch lg:p-14 ${skin.card}`}
      >
        <div className="relative z-10 flex flex-col justify-between gap-10">
          <p className="text-sm opacity-60">
            Chapter {index + 1} of {total}
          </p>
          <div>
            <h3 className="display text-[clamp(3.5rem,9vw,8rem)]">
              {chapter.title}
              <VerifyBadge status={chapter.status} note={chapter.note} />
            </h3>
            <p className="mt-6 max-w-md text-lg leading-relaxed opacity-85">{chapter.lines}</p>
            <SourceLink source={chapter.source} className="mt-5" />
          </div>
        </div>
        <Photo image={chapter.image} tone={skin.tone} className="relative z-10 min-h-64 rounded-2xl" sizes="(min-width: 768px) 45vw, 100vw" />
      </motion.article>
    </div>
  );
}

/** Story told as cards that stack on top of each other while scrolling. */
export function StackCards({ chapters }: { chapters: Chapter[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative flex flex-col gap-[14vh] pb-[6vh]">
      {chapters.map((c, i) => (
        <Card key={c.title} chapter={c} index={i} total={chapters.length} progress={scrollYProgress} />
      ))}
    </div>
  );
}
