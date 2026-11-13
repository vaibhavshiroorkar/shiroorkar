"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import type { Offering } from "@/content/offerings";
import { Arrow } from "@/components/ui/icons";

const swatches = ["#173d32", "#3f5a45", "#c69a5a", "#0f2a21", "#5c7a5f"];

/**
 * Big programme names. On desktop a preview card follows the cursor while a row
 * is hovered; on touch screens the format line is always visible instead.
 */
export function ProgrammeList({ offerings }: { offerings: Offering[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <ul className="relative border-t border-ink/15" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      {offerings.map((o, i) => (
        <li key={o.id} className="border-b border-ink/15">
          <Link
            href={`/speaking#${o.id}`}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(i)}
            className="group flex flex-col gap-2 py-6 md:flex-row md:items-center md:justify-between md:py-8"
          >
            <span className="display text-[clamp(2.4rem,6vw,5.5rem)] text-stage transition-colors duration-300 group-hover:text-forest">
              {o.name}
            </span>
            <span className="flex items-center gap-3 text-sm text-stone md:text-base">
              {o.format}
              <Arrow className="size-5 text-forest transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </li>
      ))}

      <AnimatePresence>
        {hovered !== null && !reduce && (
          <motion.li
            aria-hidden
            key="preview"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
          >
            <div
              className="grain -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl p-5 text-cream shadow-2xl"
              style={{ width: 260, height: 320, background: swatches[hovered % swatches.length] }}
            >
              <p className="relative z-10 text-xs text-cream/70">{offerings[hovered].format}</p>
              <p className="relative z-10 mt-2 text-sm leading-snug">{offerings[hovered].summary}</p>
            </div>
          </motion.li>
        )}
      </AnimatePresence>
    </ul>
  );
}
