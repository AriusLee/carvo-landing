"use client";
/* ============================================================
   ticker.ts — scroll engine + hooks
   Ported from the prototype's lib.jsx. One shared rAF ticker drives
   reveals, kinetic type, parallax and active-chapter tracking; a
   setInterval watchdog takes over if rAF is throttled/frozen.
   SSR-safe: all browser access is guarded for typeof window.
   ============================================================ */
import { useEffect, useRef } from "react";
import Lenis from "lenis";

const isBrowser = typeof window !== "undefined";

export const REDUCED =
  isBrowser && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ---- smooth inertia scroll (Lenis) + programmatic scrollTo ---- */
let lenis: Lenis | null = null;
export function initScroll() {
  if (REDUCED || !isBrowser || lenis) return;
  lenis = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.5,
    touchMultiplier: 1.8,
  });
  function raf(time: number) {
    lenis!.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
export function getLenis() {
  return lenis;
}

type ScrollOpts = { offset?: number };
export function scrollToY(target: string | number | HTMLElement, opts: ScrollOpts = {}) {
  if (lenis) {
    lenis.scrollTo(target as never, { offset: opts.offset || 0, duration: 1.25 });
  } else if (isBrowser) {
    const el =
      typeof target === "string" ? document.querySelector(target) : (target as HTMLElement);
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: REDUCED ? "auto" : "smooth" });
    } else if (el && "getBoundingClientRect" in el) {
      const y = el.getBoundingClientRect().top + window.scrollY + (opts.offset || 0);
      window.scrollTo({ top: y, behavior: REDUCED ? "auto" : "smooth" });
    }
  }
}

/* ---- one shared ticker; components register per-frame work ---- */
type FrameFn = () => void;
const frameSubs = new Set<FrameFn>();
let frameRunning = false;
let lastTick = 0;

function runSubs() {
  frameSubs.forEach((fn) => {
    try {
      fn();
    } catch {
      /* keep the loop alive even if one sub throws */
    }
  });
  lastTick = Date.now();
}
function frameLoop() {
  runSubs();
  if (frameSubs.size) requestAnimationFrame(frameLoop);
  else frameRunning = false;
}
export function addFrame(fn: FrameFn) {
  frameSubs.add(fn);
  if (!frameRunning && isBrowser) {
    frameRunning = true;
    requestAnimationFrame(frameLoop);
  }
  return () => {
    frameSubs.delete(fn);
  };
}
// watchdog — if rAF hasn't ticked in 200ms but work is pending, drive it.
if (isBrowser) {
  setInterval(() => {
    if (frameSubs.size && Date.now() - lastTick > 200) runSubs();
  }, 120);
}

export function useFrame(fn: FrameFn, deps: unknown[] = []) {
  useEffect(() => {
    if (REDUCED) {
      fn();
      return;
    }
    return addFrame(fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* ---- progress of an element through the viewport: 0 below -> 1 above ---- */
export function trackProgress(el: HTMLElement, mode: "center" | "cover" = "center") {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  if (mode === "cover") {
    return clamp((vh - r.top) / (vh + r.height));
  }
  return clamp(1 - (r.top + r.height / 2) / vh);
}

/* ---- parallax on an inner media layer ---- */
export function useParallax(amount = 90, scale = 1.14) {
  const ref = useRef<HTMLDivElement>(null);
  useFrame(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const p = (r.top + r.height / 2 - vh / 2) / vh;
    el.style.transform = `translate3d(0, ${(-p * amount).toFixed(1)}px, 0) scale(${scale})`;
  });
  return ref;
}

/* ---- translate a layer on scroll (kinetic headline drift) ---- */
export function useDrift(amount = -120) {
  const ref = useRef<HTMLImageElement>(null);
  useFrame(() => {
    const el = ref.current;
    if (!el) return;
    const p = trackProgress(el, "cover");
    el.style.transform = `translate3d(${lerp(0, amount, p).toFixed(1)}px,0,0)`;
  });
  return ref;
}
