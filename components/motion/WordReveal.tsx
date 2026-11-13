"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type Segment = { text: string; accent?: boolean };

function Word({ word, accent, progress, range }: { word: string; accent?: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "font-serif font-normal italic text-forest" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/**
 * A sentence that brightens word by word as it scrolls through the viewport.
 * Screen readers and reduced-motion readers get the plain sentence.
 */
export function WordReveal({ segments, className = "" }: { segments: Segment[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = segments.flatMap((s) => s.text.split(" ").map((w) => ({ w, accent: s.accent })));
  const full = segments.map((s) => s.text).join(" ");

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {segments.map((s, i) => (
          <span key={i} className={s.accent ? "font-serif font-normal italic text-forest" : undefined}>
            {s.text}{" "}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={className} aria-label={full}>
      <span aria-hidden>
        {words.map(({ w, accent }, i) => (
          <Word key={i} word={w} accent={accent} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
        ))}
      </span>
    </p>
  );
}
