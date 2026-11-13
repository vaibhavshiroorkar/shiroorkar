"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { MediaItem } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { VerifyBadge } from "@/components/ui/Verify";
import { ArrowUpRight, Play } from "@/components/ui/icons";

/**
 * On desktop the section pins and the Reels slide sideways as you scroll down.
 * On phones it is a plain swipeable row, which feels more natural with touch.
 */
export function ReelsRail({ reels, profile }: { reels: MediaItem[]; profile: { handle: string; url: string } }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const measure = () => {
      const pinned = mq.matches && !reduce;
      distance.set(pinned ? Math.max(0, track.scrollWidth - window.innerWidth) : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    mq.addEventListener("change", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [distance, reduce]);

  const pinned = !reduce;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="reels-title"
      className={`relative bg-paper ${pinned ? "md:h-[260vh]" : ""}`}
    >
      <div className={`flex flex-col justify-center overflow-hidden py-20 ${pinned ? "md:sticky md:top-0 md:h-[100svh] md:py-0" : ""}`}>
        <div className="shell flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="reels-title" className="display text-[clamp(3.5rem,10vw,9rem)] text-stage">
            From the <span className="font-serif font-normal normal-case italic tracking-normal text-forest">field</span>
          </h2>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-ink/20 px-5 py-3 text-sm font-medium hover:bg-ink hover:text-cream md:self-auto"
          >
            {profile.handle} <ArrowUpRight className="size-4" />
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </a>
        </div>

        <div className="mt-10 overflow-x-auto md:overflow-visible">
          <motion.div ref={trackRef} style={pinned ? { x } : undefined} className="flex w-max gap-4 px-4 sm:px-6 lg:px-10">
            {reels.map((r) => (
              <a
                key={r.id}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-[62vw] max-w-[300px] shrink-0 md:w-[22vw]"
              >
                <div className="relative overflow-hidden rounded-[22px]">
                  <Photo image={r.thumb} tone="forest" className="aspect-[9/16] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" sizes="(min-width: 768px) 22vw, 62vw" />
                  <span className="absolute left-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-cream/90 text-stage">
                    <Play className="ml-0.5 size-3.5" />
                  </span>
                </div>
                <p className="mt-3 text-[15px] font-medium">
                  {r.title}
                  <VerifyBadge status={r.status} note={r.note} />
                </p>
                <span className="sr-only">(opens Instagram in a new tab)</span>
              </a>
            ))}
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grain group relative flex aspect-[9/16] w-[62vw] max-w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-[22px] bg-stage p-6 text-cream md:w-[22vw]"
            >
              <span className="relative z-10 text-sm text-cream/70">More on Instagram</span>
              <span className="display relative z-10 text-6xl">
                Watch all Reels
                <ArrowUpRight className="mt-4 size-8 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
