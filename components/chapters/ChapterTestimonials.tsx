"use client";
/* 06 · TESTIMONIALS — two opposite-direction marquee rows (llumar.com.my style) */
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/primitives";
import { REDUCED, addFrame, clamp } from "@/lib/ticker";

/* fraction of the viewport, in from each edge, over which a card ramps
   from EDGE_OPACITY (at the screen edge) up to full opacity (toward centre) */
const FADE_ZONE = 0.26;
const EDGE_OPACITY = 0.6;

type Testimonial = {
  quote: string;
  name: string;
  meta: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Cabin stays cool even parked under the afternoon sun, and the tint line is dead straight on every window. Workmanship you can actually see.",
    name: "Faiz R.",
    meta: "Titanium tint · Puchong",
  },
  {
    quote:
      "Did the full ceramic coating on my Civic — the gloss is unreal and water just runs off it. Honest advice, no upselling, fair price.",
    name: "Wei Sheng L.",
    meta: "Full coating · Petaling Jaya",
  },
  {
    quote:
      "Wrapped the front end in PPF before a long drive. A month later, stone chips that would've scarred the paint just wiped away. Worth every ringgit.",
    name: "Nurul A.",
    meta: "Paint protection film · Puchong",
  },
  {
    quote:
      "Professional from the consult to handover. Clean bay, comfortable waiting area, and they walked me through the warranty properly. Repeat customer now.",
    name: "Daniel T.",
    meta: "Tint + coating · Petaling Jaya",
  },
  {
    quote:
      "Booked over WhatsApp, got a tailored quote the same day. The custom car mats fit perfectly and the finish on the coating is showroom level.",
    name: "Sarah M.",
    meta: "Coating + car mat · Puchong",
  },
  {
    quote:
      "Strongly recommend. Tinted two cars here — consistent quality both times and they stand behind the work. The detail on the edges is what sold me.",
    name: "Hafiz K.",
    meta: "Window tinting · Petaling Jaya",
  },
  {
    quote:
      "My black sedan finally looks black again — the coating pulled the depth right out of the paint. Booking and pickup were effortless.",
    name: "Pravin S.",
    meta: "Full coating · Petaling Jaya",
  },
  {
    quote:
      "Heat rejection is no joke. Long highway drives feel a different temperature now and the kids aren't squinting in the back. Clean install.",
    name: "Aishah B.",
    meta: "Nano-ceramic tint · Puchong",
  },
];

function Stars() {
  return (
    <span className="t-stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="t-star" aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

/* oversized decorative opening-quote glyph (clean rounded marks, faint accent) */
function QuoteMark() {
  return (
    <svg className="t-quote-mark" viewBox="0 0 448 512" fill="currentColor" aria-hidden="true">
      <path d="M0 216C0 149.7 53.7 96 120 96l8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0c-39.8 0-72 32.2-72 72l0 8 88 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72zm256 0c0-66.3 53.7-120 120-120l8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0c-39.8 0-72 32.2-72 72l0 8 88 0c35.3 0 64 28.7 64 64l0 64c0 35.3-28.7 64-64 64l-64 0c-35.3 0-64-28.7-64-64l0-32 0-32 0-72z" />
    </svg>
  );
}

function Card({ t, dup = false }: { t: Testimonial; dup?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  // dim cards toward the row edges (0.6 at the screen edge → 1 toward centre),
  // updated per-frame so it tracks the marquee scroll smoothly as cards enter/exit
  useEffect(() => {
    if (REDUCED) return;
    const unsub = addFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth || 1;
      const cx = r.left + r.width / 2;
      const d = Math.min(cx, vw - cx); // distance of the card's centre to the nearest edge
      const k = clamp(d / (vw * FADE_ZONE)); // 0 at the edge → 1 once clear of the zone
      el.style.opacity = (EDGE_OPACITY + (1 - EDGE_OPACITY) * k).toFixed(3);
    });
    return () => unsub();
  }, []);

  return (
    <figure ref={ref} className="t-card" aria-hidden={dup || undefined}>
      <QuoteMark />
      <blockquote className="t-quote">{t.quote}</blockquote>
      <Stars />
      <figcaption className="t-cap">
        <span className="t-name">{t.name}</span>
        <span className="t-meta">{t.meta}</span>
      </figcaption>
    </figure>
  );
}

function Marquee({
  items,
  dir,
  speed,
}: {
  items: Testimonial[];
  dir: "left" | "right";
  speed: number;
}) {
  return (
    <div className="t-marquee">
      {/* content rendered twice — the track scrolls exactly one set, then loops seamlessly */}
      <div
        className={"t-track t-" + dir}
        style={{ ["--dur" as string]: speed + "s" }}
      >
        {items.map((t, i) => (
          <Card key={"a" + i} t={t} />
        ))}
        {items.map((t, i) => (
          <Card key={"b" + i} t={t} dup />
        ))}
      </div>
    </div>
  );
}

export function ChapterTestimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = TESTIMONIALS.slice(half);

  return (
    <section
      id="ch6"
      className="chapter testimonials section"
      data-index="5"
      data-label="Reviews"
    >
      <div className="wrap">
        <div className="t-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Client Stories
          </Reveal>
          <h2 className="t-title display">
            <Reveal as="span" className="tt-line" delay={0}>
              Why owners <span className="accent">trust Carvo.</span>
            </Reveal>
          </h2>
        </div>
      </div>

      <Reveal className="t-rows" margin={1}>
        <Marquee items={rowA} dir="left" speed={46} />
        <Marquee items={rowB} dir="right" speed={56} />
      </Reveal>
    </section>
  );
}
