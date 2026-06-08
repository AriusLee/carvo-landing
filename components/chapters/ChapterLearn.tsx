"use client";
/* 07 · LEARN — educational videos (client-requested, llumar.com.my analogue).
   videoId / poster are PLACEHOLDERS: drop the real YouTube IDs and poster
   frames in below. An empty videoId shows a graceful "coming soon" panel,
   so the section is presentable before the films are shot. */
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
];

export function ChapterLearn() {
  const [idx, setIdx] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const close = () => setIdx(null);

  // esc + scroll lock while the player is open
  useEffect(() => {
    if (idx === null) return;
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
  }, [idx]);

  const active = idx === null ? null : LESSONS[idx];

  return (
    <section id="ch7" className="chapter learn section" data-index="6" data-label="Learn">
      <div className="wrap">
        <div className="learn-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Learn
          </Reveal>
          <h2 className="learn-title display">
            <Reveal as="span" className="lt-line" delay={0}>
              Understand
            </Reveal>
            <Reveal as="span" className="lt-line accent" delay={90}>
              the work.
            </Reveal>
          </h2>
          <Reveal as="p" className="learn-sub" delay={200}>
            Short films on how film, coating and PPF actually protect your car — so
            you can choose with your eyes open.
          </Reveal>
        </div>

        <div className="learn-grid">
          {LESSONS.map((l, i) => (
            <Reveal
              as="button"
              className="learn-card"
              key={l.title}
              delay={(i % 2) * 90}
              data-cursor
              onClick={() => setIdx(i)}
              aria-label={`Play: ${l.title}`}
            >
              <span className="lc-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="lc-img"
                  src={l.poster}
                  alt=""
                  loading="lazy"
                  style={{ objectPosition: l.pos }}
                />
                <span className="lc-play" aria-hidden="true">
                  <span className="lc-tri"></span>
                </span>
              </span>
              <span className="lc-info">
                <span className="lc-topic">
                  {l.topic} · {l.length}
                </span>
                <span className="lc-title">{l.title}</span>
              </span>
            </Reveal>
          ))}
        </div>
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
