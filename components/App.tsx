"use client";
/* ============================================================
   App.tsx — intro reveal, top bar, vertical chapter nav, mount
   Ported from the prototype's app.jsx.
   ============================================================ */
import React, { useEffect, useRef, useState } from "react";
import { REDUCED, addFrame, clamp, getLenis, initScroll, scrollToY } from "@/lib/ticker";
import { ChapterIntro } from "@/components/chapters/ChapterIntro";
import { ChapterPhilosophy } from "@/components/chapters/ChapterPhilosophy";
import { ChapterCraft } from "@/components/chapters/ChapterCraft";
import { ChapterProcess } from "@/components/chapters/ChapterProcess";
import { ChapterWork } from "@/components/chapters/ChapterWork";
import { ChapterStudio } from "@/components/chapters/ChapterStudio";

const CHAPTERS = [
  { i: 0, n: "01", label: "Intro" },
  { i: 1, n: "02", label: "Philosophy" },
  { i: 2, n: "03", label: "The Craft" },
  { i: 3, n: "04", label: "Process" },
  { i: 4, n: "05", label: "Selected Work" },
  { i: 5, n: "06", label: "Studio & Contact" },
];

/* ---- page-load intro ---- */
function Intro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"in" | "out">("in");
  useEffect(() => {
    if (REDUCED) {
      onDone();
      return;
    }
    const t1 = setTimeout(() => setPhase("out"), 1750);
    const t2 = setTimeout(() => onDone(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"intro intro-" + phase} aria-hidden="true">
      <div className="intro-inner">
        <div className="intro-wm-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="intro-wm" src="/assets/carvo-wordmark.svg" alt="" />
        </div>
        <div className="intro-bar">
          <span></span>
        </div>
        <div className="intro-cap">Automotive Protection · Est. 2025</div>
      </div>
    </div>
  );
}

/* ---- top bar ---- */
function TopBar({ onMenu }: { onMenu: () => void }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.classList.toggle("solid", (window.scrollY || 0) > 60);
    });
    return () => unsub();
  }, []);
  return (
    <header ref={ref} className="topbar">
      <div className="topbar-in">
        <a
          className="tb-brand"
          href="#ch1"
          data-cursor
          onClick={(e) => {
            e.preventDefault();
            scrollToY(0);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/carvo-wordmark.svg" alt="CARVO" />
        </a>
        <nav className="tb-right">
          <span className="tb-loc">Puchong · Petaling Jaya</span>
          <button
            className="btn btn-solid btn-sm tb-book"
            data-cursor
            onClick={() => scrollToY("#ch6", { offset: -10 })}
          >
            Book a consultation
          </button>
          <button className="nav-toggle" data-cursor onClick={onMenu} aria-label="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
}

/* ---- mobile drawer nav ---- */
function Drawer({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: number;
  onClose: () => void;
}) {
  // close first (re-enables scroll), then scroll on the next tick
  const go = (i: number) => {
    onClose();
    setTimeout(() => scrollToY("#ch" + (i + 1), { offset: -10 }), 60);
  };
  return (
    <div className={"drawer" + (open ? " open" : "")} aria-hidden={!open}>
      <div className="drawer-head wrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="drawer-wm" src="/assets/carvo-wordmark.svg" alt="CARVO" />
        <button className="drawer-close" data-cursor onClick={onClose} aria-label="Close menu">
          <span></span>
          <span></span>
        </button>
      </div>

      <nav className="drawer-nav">
        {CHAPTERS.map((c, idx) => (
          <button
            key={c.n}
            data-cursor
            className={"drawer-link" + (active === c.i ? " on" : "")}
            style={{ transitionDelay: open ? idx * 45 + 80 + "ms" : "0ms" }}
            onClick={() => go(c.i)}
            aria-current={active === c.i ? "true" : undefined}
          >
            <span className="drawer-link-n">{c.n}</span>
            {c.label}
          </button>
        ))}
      </nav>

      <div className="drawer-foot wrap">
        <a
          className="btn btn-solid btn-block"
          href="https://wa.me/60104331914"
          target="_blank"
          rel="noopener"
          data-cursor
        >
          Book a consultation
        </a>
        <div className="drawer-contact">
          <a href="mailto:carvomalaysia@gmail.com" data-cursor>
            carvomalaysia@gmail.com
          </a>
          <a href="https://instagram.com/carvomalaysia" target="_blank" rel="noopener" data-cursor>
            @carvomalaysia
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---- vertical chapter navigator (Pagani-style) ---- */
function ChapterNav({ active }: { active: number }) {
  return (
    <nav className="chapnav" aria-label="Chapters">
      <ul>
        <span className="chapnav-spine"></span>
        {CHAPTERS.map((c) => (
          <li key={c.n} className={active === c.i ? "on" : ""}>
            <button
              data-cursor
              onClick={() => scrollToY("#ch" + (c.i + 1), { offset: -10 })}
              aria-current={active === c.i ? "true" : undefined}
            >
              <span className="cn-num">{c.n}</span>
              <span className="cn-label">{c.label}</span>
              <span className="cn-line"></span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ---- mobile progress bar ---- */
function ProgressBar() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${clamp((window.scrollY || 0) / (h || 1)).toFixed(4)})`;
    });
    return () => unsub();
  }, []);
  return (
    <div className="progressbar">
      <span ref={ref}></span>
    </div>
  );
}

export default function App() {
  const [introDone, setIntroDone] = useState(REDUCED);
  const [active, setActive] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  // smooth scroll + active-chapter tracking (ticker-driven)
  useEffect(() => {
    initScroll();
    const secs = Array.from(document.querySelectorAll<HTMLElement>(".chapter"));
    let cur = -1;
    const unsub = addFrame(() => {
      const mid = (window.innerHeight || 0) / 2;
      let best = 0;
      // no break: the hero is pinned (always spans mid), so the LAST section
      // spanning the middle is the one currently covering the viewport.
      for (const s of secs) {
        const r = s.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          best = parseInt(s.dataset.index || "0", 10) || 0;
        }
      }
      if (best !== cur) {
        cur = best;
        setActive(best);
      }
    });
    return () => unsub();
  }, []);

  // lock scroll during intro or while the drawer is open
  useEffect(() => {
    const lenis = getLenis();
    if (!introDone || navOpen) {
      lenis?.stop?.();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start?.();
      document.body.style.overflow = "";
    }
  }, [introDone, navOpen]);

  // Escape closes the drawer
  useEffect(() => {
    if (!navOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navOpen]);

  // cursor accent (desktop only)
  useEffect(() => {
    if (window.matchMedia("(hover:none),(pointer:coarse)").matches) return;
    const dot = document.querySelector<HTMLElement>(".cursor-dot");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");
    if (!dot || !ring) return;
    let rx = innerWidth / 2,
      ry = innerHeight / 2,
      tx = rx,
      ty = ry;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.left = tx + "px";
      dot.style.top = ty + "px";
      document.body.classList.add("cursor-ready");
    };
    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      rafId = requestAnimationFrame(loop);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("[data-cursor], a, button")) document.body.classList.add("cursor-hover");
      else document.body.classList.remove("cursor-hover");
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", over);
    let rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", over);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      <div className="grain" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <div className="cursor-dot" aria-hidden="true"></div>

      <TopBar onMenu={() => setNavOpen(true)} />
      <ProgressBar />
      <ChapterNav active={active} />
      <Drawer open={navOpen} active={active} onClose={() => setNavOpen(false)} />

      <main className={"page" + (introDone ? " ready" : "")}>
        <ChapterIntro />
        <ChapterPhilosophy />
        <ChapterCraft />
        <ChapterProcess />
        <ChapterWork />
        <ChapterStudio />
      </main>
    </>
  );
}
