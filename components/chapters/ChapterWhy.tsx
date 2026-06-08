"use client";
/* 03 · WHY CARVO — five reasons, icon-led grid (client-requested, llumar.com.my
   analogue). Line icons echo the Carvo catalogue's feature glyphs. */
import type { ReactNode } from "react";
import { Reveal } from "@/components/primitives";

/* ---- catalogue-style line icons (1.6px stroke, currentColor) ---- */
const IconWrap = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

// diamond — from the catalogue's "Premium Quality" glyph
const IconDiamond = () => (
  <IconWrap>
    <path d="M6 3h12l3 5.5-9 12.5L3 8.5z" />
    <path d="M3 8.5h18" />
    <path d="M9 3 7.5 8.5 12 21 16.5 8.5 15 3" />
  </IconWrap>
);
// shield + check — from the catalogue's "Long-Lasting Protection" glyph
const IconShield = () => (
  <IconWrap>
    <path d="M12 3l7 2.6v5.4c0 4.3-3 7.4-7 9-4-1.6-7-4.7-7-9V5.6z" />
    <path d="M8.7 12.2l2.4 2.4 4.2-4.6" />
  </IconWrap>
);
// precision target — meticulous, hand-laid install
const IconTarget = () => (
  <IconWrap>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </IconWrap>
);
// map pin — two studios
const IconPin = () => (
  <IconWrap>
    <path d="M12 21c4.2-4.6 7-7.7 7-11a7 7 0 1 0-14 0c0 3.3 2.8 6.4 7 11z" />
    <circle cx="12" cy="10" r="2.6" />
  </IconWrap>
);
// car — a scope tailored to your vehicle
const IconCar = () => (
  <IconWrap>
    <path d="M4 12l1.8-5A2.2 2.2 0 0 1 7.9 5.5h8.2a2.2 2.2 0 0 1 2.1 1.5L20 12" />
    <rect x="3" y="12" width="18" height="5" rx="1.5" />
    <circle cx="7.5" cy="16.8" r="1.5" />
    <circle cx="16.5" cy="16.8" r="1.5" />
  </IconWrap>
);

type Reason = { n: string; title: string; line: string; icon: ReactNode };

const REASONS: Reason[] = [
  {
    n: "01",
    title: "World-class materials",
    line: "Aliphatic-TPU film from Lubrizol, Covestro and Ashland · German-formulated ceramic serums · titanium-series nano films. Nothing thinner goes on your car.",
    icon: <IconDiamond />,
  },
  {
    n: "02",
    title: "Warranties that hold",
    line: "Up to 10 years on film, 7 on PPF, 6 on coating — backed in writing. Self-healing, anti-yellowing, hydrophobic. Protection you can still feel years on.",
    icon: <IconShield />,
  },
  {
    n: "03",
    title: "Installed in the bay",
    line: "Every panel is hand-cut and laid by installers who care how the edge sits under the light. Dust-controlled bays, measured twice, finished once.",
    icon: <IconTarget />,
  },
  {
    n: "04",
    title: "Two studios, easy to reach",
    line: "Puchong and Petaling Jaya — book the outlet that fits your day, with a comfortable wait while we work. Klang Valley coverage, no cross-town drive.",
    icon: <IconPin />,
  },
  {
    n: "05",
    title: "A scope tailored to your car",
    line: "We assess the model, the paint and how you drive before we quote — no padded packages. An honest plan and the right film for the job.",
    icon: <IconCar />,
  },
];

export function ChapterWhy() {
  return (
    <section id="ch3" className="chapter why section" data-index="2" data-label="Why Carvo">
      <div className="wrap why-grid">
        <div className="why-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Why Carvo
          </Reveal>
          <h2 className="why-title display">
            <Reveal as="span" className="wt-line" delay={0}>
              Five reasons
            </Reveal>
            <Reveal as="span" className="wt-line accent" delay={90}>
              owners choose us.
            </Reveal>
          </h2>
          <Reveal as="p" className="why-sub" delay={200}>
            The same brief every time: protect the car properly, and make the work
            invisible. Here is what that looks like.
          </Reveal>
        </div>

        {REASONS.map((r, i) => (
          <Reveal className="why-card" key={r.n} delay={i * 70}>
            <span className="wc-icon">{r.icon}</span>
            <span className="wc-num display" aria-hidden="true">
              {r.n}
            </span>
            <h3 className="wc-title">{r.title}</h3>
            <p className="wc-line">{r.line}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
