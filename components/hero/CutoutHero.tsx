"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, type PointerEvent } from "react";
import type { ImageRef } from "@/content/types";
import { Arrow, ArrowUpRight, Play } from "@/components/ui/icons";

const NAME = "Shiroorkar";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Sets the font size so the name spans its container exactly, at any width and
 * once the web font has loaded. Writes to the DOM directly: no re-render needed.
 */
function useFitText<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const ratio = box.clientWidth / el.scrollWidth;
      el.style.fontSize = `${Math.floor(100 * ratio * 0.995)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => ro.disconnect();
  }, []);
  return ref;
}

/** Neutral stand-in until the real cutout PNG exists. A shape, never a fake person. */
function Silhouette() {
  // Rendered twice (desktop and mobile); a shared gradient id would break in the hidden copy.
  const id = useId();
  const fill = `url(#${id})`;
  return (
    <svg viewBox="0 0 600 800" className="h-full w-full" role="img" aria-label="Portrait placeholder">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4c6a53" />
          <stop offset="1" stopColor="#21412f" />
        </linearGradient>
      </defs>
      <ellipse cx="300" cy="215" rx="98" ry="118" fill={fill} />
      <path d="M262 318h76v70h-76z" fill={fill} />
      <path d="M40 800c8-210 92-330 260-352 168 22 252 142 260 352z" fill={fill} />
    </svg>
  );
}

export function CutoutHero({
  desktop,
  mobile,
  latest,
}: {
  desktop: ImageRef;
  mobile: ImageRef;
  latest: { title: string; url: string };
}) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useFitText<HTMLSpanElement>();

  // Scroll parallax: the name drifts slower than the figure and the UI fades out.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const figureScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const uiOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Pointer parallax on mouse only: layers shift a few pixels against each other.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const nameX = useTransform(sx, (v) => v * -18);
  const nameMY = useTransform(sy, (v) => v * -10);
  const figX = useTransform(sx, (v) => v * 10);
  const figMY = useTransform(sy, (v) => v * 6);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const mobileImage = mobile.src ? mobile : desktop;

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      className="grain relative h-[100svh] min-h-[640px] overflow-hidden bg-stage text-cream"
      aria-labelledby="hero-title"
    >
      <h1 id="hero-title" className="sr-only">
        Udaykumar Shiroorkar
      </h1>

      {/* Light falling on the figure from above. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_42%,rgba(198,154,90,0.22),transparent_70%),radial-gradient(80%_60%_at_50%_100%,rgba(63,90,69,0.55),transparent_70%)]"
      />

      {/* Giant name, behind the figure. */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: nameY }}
        className="shell absolute inset-x-0 top-[24%] sm:top-[20%] lg:top-[14%]"
      >
        <motion.div style={reduce ? undefined : { x: nameX, y: nameMY }}>
          <span ref={nameRef} className="display inline-block whitespace-nowrap text-[19vw] text-cream">
            {NAME.split("").map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={reduce ? false : { y: "0.5em", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay: 0.1 + i * 0.045, ease: EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </motion.div>

      {/* The figure. Bottom-anchored so it rises out of the frame edge. */}
      <motion.div
        style={reduce ? undefined : { y: figureY, scale: figureScale, transformOrigin: "50% 100%" }}
        className="absolute inset-x-0 bottom-0"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.55, ease: EASE }}
        >
        <motion.div style={reduce ? undefined : { x: figX, y: figMY }}>
          <div className="relative mx-auto hidden aspect-[3/4] h-[84svh] max-h-[980px] md:block">
            {desktop.src ? (
              <Image src={desktop.src} alt={desktop.alt} fill priority sizes="(min-width: 768px) 63vh, 0px" className="object-contain object-bottom drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]" />
            ) : (
              <Silhouette />
            )}
          </div>
          <div className="relative mx-auto aspect-[3/4] h-[64svh] md:hidden">
            {mobileImage.src ? (
              <Image src={mobileImage.src} alt={mobileImage.alt} fill priority sizes="48vh" className="object-contain object-bottom" />
            ) : (
              <Silhouette />
            )}
          </div>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Ground the figure and keep the bottom copy readable. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-stage via-stage/70 to-transparent" />

      <motion.div
        style={reduce ? undefined : { opacity: uiOpacity }}
        className="shell absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 pb-8 sm:pb-10 md:flex-row md:items-end md:justify-between"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          className="max-w-md text-lg leading-snug text-cream/85 sm:text-xl"
        >
          Former BMC Assistant Commissioner, advocate and environmental worker. Known across Mumbai
          as the BMC&apos;s <em className="font-serif text-[1.15em] text-ochre">Singham</em>.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          className="flex items-end gap-3"
        >
          <a
            href={latest.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-3 rounded-2xl bg-cream/10 p-2 pr-4 backdrop-blur-md transition-colors hover:bg-cream/15 lg:flex"
          >
            <span className="flex h-14 w-10 items-center justify-center rounded-lg bg-moss">
              <Play className="size-3.5" />
            </span>
            <span className="text-left">
              <span className="block text-[11px] text-cream/60">Latest on Instagram</span>
              <span className="flex items-center gap-1 text-sm font-medium">
                {latest.title} <ArrowUpRight className="size-3.5" />
              </span>
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <Link
            href="/work-with-us"
            className="group inline-flex h-14 items-center gap-3 rounded-full bg-ochre px-7 font-semibold text-stage transition-colors hover:bg-cream"
          >
            Work with us
            <Arrow className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
