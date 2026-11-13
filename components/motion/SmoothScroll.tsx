"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import { useEffect } from "react";

/** Fired by links that should take the visitor back to the top of the current page. */
export const SCROLL_TOP_EVENT = "site:scroll-top";

export function scrollToTop() {
  window.dispatchEvent(new Event(SCROLL_TOP_EVENT));
}

/**
 * Smooth, weighted scrolling, skipped for readers who prefer reduced motion.
 *
 * Lenis is driven from Motion's own frame loop rather than a separate
 * requestAnimationFrame, so the scroll position and every scroll-linked
 * animation update in the same frame. Two separate loops let animations lag a
 * frame behind the scroll, which shows up as jitter in pinned sections.
 * Also handles "back to top" requests.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ autoRaf: false, lerp: 0.1, anchors: true });

    const tick = ({ timestamp }: { timestamp: number }) => lenis?.raf(timestamp);
    if (lenis) frame.update(tick, true);

    const toTop = () => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0 });
    };
    window.addEventListener(SCROLL_TOP_EVENT, toTop);

    return () => {
      window.removeEventListener(SCROLL_TOP_EVENT, toTop);
      cancelFrame(tick);
      lenis?.destroy();
    };
  }, []);
  return null;
}
