"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { youtubeThumb, youtubeUrl, type Interview } from "@/content/interviews";
import { Arrow, ArrowUpRight, Play } from "@/components/ui/icons";

/*
 * Direction comes in through `custom`, so a video that is leaving uses the latest
 * arrow pressed rather than the direction from its own last render.
 */
const slide = (reduce: boolean | null) => ({
  enter: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${dir * 6}%` }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: `${dir * -6}%` }),
});

const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";

/** Send a command to the YouTube player through its iframe API. */
function playerCommand(frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) {
  frame?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), PLAYER_ORIGIN);
}

/**
 * One interview at a time, with an arrow on each side.
 *
 * Nothing loads from YouTube until the visitor reaches the carousel. A video only
 * starts on its own when it can play with sound, which browsers allow once the
 * visitor has clicked or tapped the page. Otherwise it waits on its thumbnail for
 * the visitor to press play. It never plays muted. Pressing an arrow counts as a
 * click, so the next video starts with sound. The video pauses when scrolled away
 * and resumes on return. Readers who prefer reduced motion always press play.
 */
export function InterviewCarousel({ items }: { items: Interview[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tapped, setTapped] = useState(false);
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const visible = useInView(boxRef, { amount: 0.3 });
  const playing = tapped || started;
  const v = items[index];
  const many = items.length > 1;

  const go = (dir: 1 | -1) => {
    setDirection(dir);
    // The arrow press is a click, so the next video may start with sound.
    setStarted(!reduce);
    // Reduced-motion readers go back to the thumbnail; everyone else autoplays the next video.
    setTapped(false);
    setIndex((i) => (i + dir + items.length) % items.length);
  };

  // Start the first time the carousel is mostly on screen, but only if it can play
  // with sound: the visitor must already have interacted with the page.
  useEffect(() => {
    const box = boxRef.current;
    if (!box || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (navigator.userActivation?.hasBeenActive) setStarted(true);
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [reduce]);

  // Pause when the carousel scrolls out of view and resume when it returns.
  useEffect(() => {
    playerCommand(frameRef.current, visible ? "playVideo" : "pauseVideo");
  }, [visible]);

  const arrow = (dir: 1 | -1) => (
    <button
      type="button"
      onClick={() => go(dir)}
      className="z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-cream/90 text-stage shadow-lg backdrop-blur transition-colors hover:bg-ochre md:size-14 md:bg-stage md:text-cream md:shadow-none md:hover:bg-forest"
    >
      <span className="sr-only">{dir === 1 ? "Next interview" : "Previous interview"}</span>
      <Arrow className={`size-5 ${dir === -1 ? "rotate-180" : ""}`} />
    </button>
  );

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Interviews">
      <div className="relative flex items-center gap-4 md:gap-6">
        {many && <div className="absolute left-3 top-1/2 -translate-y-1/2 md:static md:translate-y-0">{arrow(-1)}</div>}

        <div ref={boxRef} className="relative aspect-video flex-1 overflow-hidden rounded-[22px] bg-stage">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={v.youtubeId}
              custom={direction}
              variants={slide(reduce)}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              {playing ? (
                <iframe
                  ref={frameRef}
                  src={`${PLAYER_ORIGIN}/embed/${v.youtubeId}?autoplay=1&mute=0&playsinline=1&rel=0&enablejsapi=1`}
                  title={v.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <button type="button" onClick={() => setTapped(true)} className="group absolute inset-0">
                  <Image
                    src={youtubeThumb(v.youtubeId)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 70vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-stage/25 transition-colors group-hover:bg-stage/10" />
                  <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-cream text-stage transition-transform group-hover:scale-110">
                    <Play className="ml-1 size-6" />
                  </span>
                  <span className="sr-only">Play: {v.title}</span>
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {many && <div className="absolute right-3 top-1/2 -translate-y-1/2 md:static md:translate-y-0">{arrow(1)}</div>}
      </div>

      <div className="mx-auto mt-6 flex max-w-4xl flex-col gap-4 md:flex-row md:items-start md:justify-between md:px-20">
        <div aria-live="polite">
          <p className="text-sm text-stone">
            {v.channel}
            {v.detail ? ` . ${v.detail}` : ""}
          </p>
          <h3 className="mt-1 text-xl font-semibold leading-snug tracking-tight sm:text-2xl">{v.title}</h3>
          <a
            href={youtubeUrl(v.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm text-forest underline-offset-4 hover:underline"
          >
            Watch on YouTube <ArrowUpRight className="size-3.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
        {many && (
          <p className="shrink-0 font-semibold tabular-nums text-stone">
            {index + 1} / {items.length}
          </p>
        )}
      </div>
    </div>
  );
}
