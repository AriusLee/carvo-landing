"use client";
/* 04 · SELECTED WORK — uniform image grid + full-screen lightbox */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/primitives";
import { getLenis } from "@/lib/ticker";

const GALLERY: { src: string; pos?: string }[] = [
  { src: "/images/work-1.jpg" },
  { src: "/images/work-2.jpg", pos: "center 78%" }, // green Taycan — favour the car, hide bg
  { src: "/images/work-3.jpg" },
  { src: "/images/work-4.jpg" },
  { src: "/images/work-5.jpg" },
  { src: "/images/work-6.jpg" },
  { src: "/images/work-7.jpg" },
  { src: "/images/work-8.jpg" },
];

export function ChapterWork() {
  const [idx, setIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const close = () => setIdx(null);
  const go = (d: number) =>
    setIdx((i) => (i === null ? i : (i + d + GALLERY.length) % GALLERY.length));

  // esc / arrow keys + scroll lock while the lightbox is open
  useEffect(() => {
    if (idx === null) return;
    const lenis = getLenis();
    lenis?.stop?.();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start?.();
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <section id="ch4" className="chapter work section" data-index="3" data-label="Selected Work">
      <div className="wrap">
        <div className="work-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Selected Work
          </Reveal>
        </div>

        <div className="g-grid">
          {GALLERY.map((it, i) => (
            <Reveal key={it.src} className="g-tile" delay={(i % 4) * 80} data-cursor onClick={() => setIdx(i)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="g-img"
                src={it.src}
                alt="Carvo selected work"
                loading="lazy"
                style={{ objectPosition: it.pos }}
              />
            </Reveal>
          ))}
        </div>
      </div>

      {mounted &&
        idx !== null &&
        createPortal(
          <div className="lightbox" onClick={close}>
          <button className="lb-close" data-cursor aria-label="Close" onClick={close}>
            <span></span>
            <span></span>
          </button>
          <button
            className="lb-arrow lb-prev"
            data-cursor
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            ‹
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="lb-img"
            src={GALLERY[idx].src}
            alt="Carvo selected work"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-arrow lb-next"
            data-cursor
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            ›
          </button>
          <div className="lb-count">
            {String(idx + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
}
