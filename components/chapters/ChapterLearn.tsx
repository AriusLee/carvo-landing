"use client";
/* 07 · LEARN — cinematic featured player + numbered playlist (client-requested,
   llumar.com.my analogue). videoId / poster are PLACEHOLDERS: drop the real
   YouTube IDs and poster frames in below. An empty videoId shows a graceful
   "coming soon" panel, so the section is presentable before the films are shot. */
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Reveal } from "@/components/primitives";
import { getLenis } from "@/lib/ticker";

type Lesson = {
  topic: string;
  title: string;
  length: string;
  poster: string;
  pos?: string;
  videoId: string; // YouTube id — leave "" until the film is ready
};

const LESSONS: Lesson[] = [
  {
    topic: "Window Film",
    title: "How premium window film is made",
    length: "3 min",
    poster: "/images/craft-window.jpg",
    videoId: "",
  },
  {
    topic: "Health",
    title: "Can window tint really protect your skin?",
    length: "2 min",
    poster: "/images/work-5.jpg",
    videoId: "",
  },
  {
    topic: "Coating",
    title: "How ceramic coating keeps paint glossy",
    length: "4 min",
    poster: "/images/craft-coating.jpg",
    videoId: "",
  },
  {
    topic: "PPF",
    title: "What paint protection film actually stops",
    length: "3 min",
    poster: "/images/craft-ppf.jpg",
    videoId: "",
  },
  {
    topic: "Aftercare",
    title: "Caring for your car after protection",
    length: "2 min",
    poster: "/images/work-3.jpg",
    videoId: "",
  },
];

export function ChapterLearn() {
  const [open, setOpen] = useState<number | null>(null); // modal (playing) index
  const [featured, setFeatured] = useState(0); // previewed index
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const close = () => setOpen(null);

  // esc + scroll lock while the player is open
  useEffect(() => {
    if (open === null) return;
    const lenis = getLenis();
    lenis?.stop?.();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start?.();
      document.body.style.overflow = "";
    };
  }, [open]);

  const f = LESSONS[featured];
  const active = open === null ? null : LESSONS[open];

  return (
    <section id="ch7" className="chapter learn section" data-index="6" data-label="Learn">
      <div className="wrap">
        <div className="learn-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Learn
          </Reveal>
          <h2 className="learn-title display">
            <Reveal as="span" className="lt-line" delay={0}>
              Understand <span className="accent">the work.</span>
            </Reveal>
          </h2>
          <Reveal as="p" className="learn-sub" delay={160}>
            Short films on how film, coating and PPF actually protect your car — so
            you can choose with your eyes open.
          </Reveal>
        </div>

        <Reveal className="learn-stage" margin={1}>
          {/* featured preview — plays the currently-highlighted lesson */}
          <button
            className="learn-feature"
            data-cursor
            onClick={() => setOpen(featured)}
            aria-label={`Play: ${f.title}`}
          >
            <span className="lf-media">
              {/* key remounts the image so it cross-fades when the selection changes */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={featured}
                className="lf-img"
                src={f.poster}
                alt=""
                style={{ objectPosition: f.pos }}
              />
              <span className="lf-veil" aria-hidden="true"></span>
            </span>
            <span className="lc-play lf-play" aria-hidden="true">
              <span className="lc-tri"></span>
            </span>
            <span className="lf-info">
              <span className="lf-topic">
                {f.topic} · {f.length}
              </span>
              <span className="lf-title display">{f.title}</span>
              <span className="lf-cue">
                Watch now <span className="arrow">→</span>
              </span>
            </span>
          </button>

          {/* numbered playlist — hover/focus previews, click plays */}
          <ol className="learn-list">
            {LESSONS.map((l, i) => (
              <li key={l.title}>
                <button
                  className={"ll-row" + (i === featured ? " on" : "")}
                  data-cursor
                  onMouseEnter={() => setFeatured(i)}
                  onFocus={() => setFeatured(i)}
                  onClick={() => {
                    setFeatured(i);
                    setOpen(i);
                  }}
                  aria-label={`Play: ${l.title}`}
                >
                  <span className="ll-n display" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ll-text">
                    <span className="ll-topic">{l.topic}</span>
                    <span className="ll-title">{l.title}</span>
                  </span>
                  <span className="ll-len">{l.length}</span>
                  <span className="ll-cue" aria-hidden="true">
                    <span className="ll-tri"></span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>

      {mounted &&
        active !== null &&
        createPortal(
          <div className="vbox" onClick={close}>
            <button className="vb-close" data-cursor aria-label="Close" onClick={close}>
              <span></span>
              <span></span>
            </button>
            <div className="vb-frame" onClick={(e) => e.stopPropagation()}>
              {active.videoId ? (
                <iframe
                  className="vb-iframe"
                  src={`https://www.youtube-nocookie.com/embed/${active.videoId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerated-keyboard; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="vb-soon">
                  <span className="vb-soon-eyebrow">Coming soon</span>
                  <p className="vb-soon-title">{active.title}</p>
                  <p className="vb-soon-line">
                    This film is in production. Message us on WhatsApp and we&apos;ll walk
                    you through it in person.
                  </p>
                </div>
              )}
            </div>
            <div className="vb-cap">{active.title}</div>
          </div>,
          document.body,
        )}
    </section>
  );
}
