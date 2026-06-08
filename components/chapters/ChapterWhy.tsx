"use client";
/* 03 · WHY CARVO — five reasons (client-requested, llumar.com.my analogue) */
import { Reveal } from "@/components/primitives";

type Reason = { n: string; title: string; line: string };

const REASONS: Reason[] = [
  {
    n: "01",
    title: "World-class materials",
    line: "Aliphatic-TPU film from Lubrizol, Covestro and Ashland · German-formulated ceramic serums · titanium-series nano films. We fit what we'd put on our own cars — nothing thinner.",
  },
  {
    n: "02",
    title: "Warranties that hold",
    line: "Up to 10 years on film, 7 on PPF, 6 on coating — backed in writing. Self-healing, anti-yellowing, hydrophobic. Protection you can still feel years from the install.",
  },
  {
    n: "03",
    title: "Installed in the bay, not the boardroom",
    line: "Every panel is hand-cut and laid by installers who care how the edge sits under the light. Dust-controlled bays, measured twice, finished once.",
  },
  {
    n: "04",
    title: "Two studios, easy to reach",
    line: "Puchong and Petaling Jaya — book the outlet that fits your day, with a comfortable wait while we work. Klang Valley coverage without the cross-town drive.",
  },
  {
    n: "05",
    title: "A scope tailored to your car",
    line: "We assess the model, the paint and how you drive before we quote — no padded packages. An honest plan, a clear price, and the right film for the job.",
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

        <ol className="why-list">
          {REASONS.map((r, i) => (
            <Reveal as="li" className="why-item" key={r.n} delay={i * 60}>
              <span className="wi-num display" aria-hidden="true">
                {r.n}
              </span>
              <div className="wi-body">
                <h3 className="wi-title">{r.title}</h3>
                <p className="wi-line">{r.line}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
