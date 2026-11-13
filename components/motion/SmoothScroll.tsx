"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Fired by links that should take the visitor back to the top of the current page. */
export const SCROLL_TOP_EVENT = "site:scroll-top";

export function scrollToTop() {
  window.dispatchEvent(new Event(SCROLL_TOP_EVENT));
}

/**
 * Smooth, weighted scrolling, skipped for readers who prefer reduced motion.
 * Also handles "back to top" requests, through Lenis when it is running so the
 * two never fight over the scroll position.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });

    const toTop = () => {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0 });
    };
    window.addEventListener(SCROLL_TOP_EVENT, toTop);

    return () => {
      window.removeEventListener(SCROLL_TOP_EVENT, toTop);
      lenis?.destroy();
    };
  }, []);
  return null;
}
