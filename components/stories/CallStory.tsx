"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { StoryCard } from "@/content/bio";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";

/*
 * What the planned caller tune was to say, per the DNA 2017 report: the Swachh
 * Mumbai message, waste segregation, and respect for street-cleaning staff.
 * Shown as an illustration, not as quoted lyrics.
 */
const MESSAGES = ["Keep Mumbai clean", "Segregate your waste", "Respect the people who clean your street"];

/* Fixed bar heights so the waveform looks the same on the server and in the browser. */
const BARS = [0.35, 0.6, 0.9, 0.5, 0.75, 1, 0.55, 0.8, 0.4, 0.95, 0.6, 0.45, 0.85, 0.7, 0.5, 0.9, 0.65, 0.4];

function Phone() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [msg, setMsg] = useState(0);
  const live = inView && !reduce;

  // Cycle the message only while the phone is on screen.
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 2800);
    return () => clearInterval(t);
  }, [live]);

  return (
    <figure className="mx-auto w-full max-w-[250px] sm:max-w-[320px]">
      <div ref={ref} className="rounded-[46px] bg-stage-deep p-3 shadow-[0_40px_80px_rgba(10,31,24,0.35)]">
        <div className="grain relative flex aspect-[9/18] flex-col items-center justify-between overflow-hidden rounded-[36px] bg-forest px-6 py-12 text-cream">
          <div className="relative z-10 text-center">
            <p className="text-sm text-cream/60">Calling</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">B Ward helpline</p>
          </div>

          <div className="relative z-10 flex h-24 items-center gap-1.5" aria-hidden>
            {BARS.map((h, i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-full bg-ochre"
                style={{ height: `${h * 100}%`, originY: 0.5 }}
                animate={live ? { scaleY: [h, 1, h * 0.4, h] } : { scaleY: h }}
                transition={live ? { duration: 1.2 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
              />
            ))}
          </div>

          <div className="relative z-10 flex h-20 w-full items-center justify-center text-center" aria-live="polite">
            {reduce ? (
              <ul className="space-y-1 text-sm">
                {MESSAGES.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ) : (
              <AnimatePresence mode="wait">
                <motion.p
                  key={msg}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="font-serif text-2xl italic leading-snug"
                >
                  {MESSAGES[msg]}
                </motion.p>
              </AnimatePresence>
            )}
          </div>

          <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-[#c2513f]" aria-hidden>
            <svg viewBox="0 0 24 24" className="size-6 rotate-[135deg]" fill="currentColor">
              <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
            </svg>
          </span>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-xs text-stone">Illustration of the planned caller tune</figcaption>
    </figure>
  );
}

/** The story of the ward helpline's caller tune, shown as a call in progress. */
export function CallStory({ cards }: { cards: StoryCard[] }) {
  return (
    <div className="shell grid items-center gap-16 pb-28 md:grid-cols-[1fr_1.1fr] lg:gap-24 lg:pb-40">
      <Phone />
      <ul className="space-y-10">
        {cards.map((c) => (
          <li key={c.title}>
            <h3 className="display text-[clamp(2.75rem,5vw,4.5rem)] text-stage">
              {c.title}
              <VerifyBadge status={c.status} note={c.note} />
            </h3>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-ink/80">{c.lines}</p>
            <SourceLink source={c.source} className="mt-3" />
          </li>
        ))}
      </ul>
    </div>
  );
}
