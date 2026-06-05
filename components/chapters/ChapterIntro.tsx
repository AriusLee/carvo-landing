"use client";
/* 01 · INTRO (hero) — ported from chapters.jsx */
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/primitives";
import { REDUCED, addFrame, clamp, scrollToY, useParallax } from "@/lib/ticker";

export function ChapterIntro() {
  const mediaRef = useParallax(70, 1.18);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (REDUCED) return;
    const unsub = addFrame(() => {
      const el = cueRef.current;
      if (!el) return;
      const y = window.scrollY || 0;
      el.style.opacity = String(clamp(1 - y / 320));
    });
    return () => unsub();
  }, []);

  return (
    <section id="ch1" className="chapter hero" data-index="0" data-label="Intro">
      <div className="hero-bg">
        <div ref={mediaRef} className="hero-bg-inner">
          {/* placeholder footage — swap for real Carvo film later */}
          <video className="hero-video" autoPlay muted loop playsInline preload="auto" src="/video/hero.mp4" />
        </div>
        <div className="hero-veil"></div>
      </div>

      <div className="wrap hero-inner">
        <Reveal as="div" className="eyebrow hero-eyebrow" delay={120}>
          <span className="tick"></span>CARVO · AUTOMOTIVE PROTECTION · EST. 2025
        </Reveal>

        <h1 className="hero-title display">
          <span className="line">
            <Reveal as="span" clip className="ht">
              Protection
            </Reveal>
          </span>
          <span className="line">
            <Reveal as="span" clip className="ht" delay={120}>
              worthy of the
            </Reveal>
          </span>
          <span className="line">
            <Reveal as="span" clip className="ht accent" delay={240}>
              machine.
            </Reveal>
          </span>
        </h1>

        <Reveal className="hero-sub" delay={420}>
          Window film · ceramic coating · paint protection — executed to a standard you can see at
          arm&apos;s length.
        </Reveal>

        <Reveal className="btns hero-cta" delay={560}>
          <button
            className="btn btn-solid"
            data-cursor
            onClick={() => scrollToY("#ch6", { offset: -10 })}
          >
            Book a consultation
          </button>
          <button
            className="btn btn-ghost"
            data-cursor
            onClick={() => scrollToY("#ch3", { offset: -10 })}
          >
            Explore the craft <span className="arrow">→</span>
          </button>
        </Reveal>
      </div>

      <div ref={cueRef} className="scroll-cue">
        <span>Scroll</span>
        <span className="cue-track">
          <span className="cue-dot"></span>
        </span>
      </div>
    </section>
  );
}
