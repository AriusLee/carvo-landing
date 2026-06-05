"use client";
/* 04 · PROCESS — ported from chapters2.jsx */
import { Reveal } from "@/components/primitives";

const STEPS = [
  {
    n: "01",
    t: "Consultation",
    d: "We meet the car — paint readings, your driving life, the result you want.",
  },
  {
    n: "02",
    t: "Preparation",
    d: "Decontamination & correction in a controlled bay; the surface made perfect first.",
  },
  {
    n: "03",
    t: "Application",
    d: "Film cut to your model, coating layered by hand, tint dressed without a seam.",
  },
  {
    n: "04",
    t: "Handover",
    d: "Cured, inspected under light, documented; you leave with care guidance.",
  },
];

export function ChapterProcess() {
  return (
    <section id="ch4" className="chapter process section" data-index="3" data-label="Process">
      <div className="wrap">
        <div className="process-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>The Process
          </Reveal>
          <h2 className="process-title display">
            <Reveal as="span" clip className="pt-line">
              Unhurried
            </Reveal>{" "}
            <Reveal as="span" clip className="pt-line" delay={120}>
              by design.
            </Reveal>
          </h2>
        </div>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} className="step" delay={i * 90}>
              <span className="step-num display">{s.n}</span>
              <div className="step-body">
                <h3 className="step-title">{s.t}</h3>
                <p className="step-desc">{s.d}</p>
              </div>
              <span className="step-rule"></span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
