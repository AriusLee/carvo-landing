"use client";
/* ============================================================
   primitives.tsx — Reveal, KineticWord, Media, CountUp
   Ported from the prototype's lib.jsx. Each owns its own state so
   parent re-renders can't clobber the ticker-driven animation.
   ============================================================ */
import React, { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { REDUCED, addFrame, clamp, lerp, trackProgress } from "@/lib/ticker";

/* ---- reveal on enter — driven by the shared ticker (no IntersectionObserver) ---- */
type RevealProps = {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  delay?: number;
  clip?: boolean;
  className?: string;
  style?: CSSProperties;
  margin?: number;
  [key: string]: unknown;
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  clip = false,
  className = "",
  style = {},
  margin = 0.9,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(REDUCED);
  useEffect(() => {
    if (REDUCED || seen) return;
    let done = false;
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el || done) return;
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) * margin && r.bottom > 0) {
        done = true;
        setSeen(true);
        unsub();
      }
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Tag = as as React.ElementType;
  const base = clip ? "reveal-clip" : "reveal";
  const cls = base + (seen ? " in" : "") + (className ? " " + className : "");
  return (
    <Tag ref={ref} className={cls} style={{ transitionDelay: delay + "ms", ...style }} {...rest}>
      {children}
    </Tag>
  );
}

/* ---- kinetic word: grows + brightens as it crosses the viewport ---- */
export function KineticWord({
  children,
  from = 0.82,
  to = 1.18,
  className = "",
  origin = "left center",
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
  origin?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (REDUCED) return;
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el) return;
      const p = trackProgress(el, "center");
      el.style.transform = `scale(${lerp(from, to, p).toFixed(3)})`;
      el.style.opacity = lerp(0.55, 1, clamp(p * 1.3)).toFixed(3);
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <span
      ref={ref}
      className={"kinetic " + className}
      style={{ display: "inline-block", transformOrigin: origin, willChange: "transform" }}
    >
      {children}
    </span>
  );
}

/* ---- surface-macro placeholder + drop-to-fill image slot ---- */
export function Media({
  id,
  surface = "beading",
  placeholder = "Drop image",
  className = "",
  children,
}: {
  id: string;
  surface?: string;
  placeholder?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={"media " + className}>
      <div className={"surface surface-" + surface}></div>
      <div className="slot-fill">
        <image-slot id={id} placeholder={placeholder} shape="rect" fit="cover"></image-slot>
      </div>
      {children}
    </div>
  );
}

/* ---- count-up number when revealed (ticker-driven) ---- */
export function CountUp({
  to,
  duration = 1400,
  className = "",
  prefix = "",
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(REDUCED ? to : 0);
  useEffect(() => {
    if (REDUCED) return;
    let started = false;
    let t0 = 0;
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el) return;
      if (!started) {
        const r = el.getBoundingClientRect();
        if (r.top < (window.innerHeight || 0) * 0.85 && r.bottom > 0) {
          started = true;
          t0 = Date.now();
        }
        return;
      }
      const k = clamp((Date.now() - t0) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k >= 1) unsub();
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to]);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}
