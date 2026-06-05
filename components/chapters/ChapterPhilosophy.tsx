"use client";
/* 02 · PHILOSOPHY — ported from chapters.jsx */
import { Reveal, KineticWord } from "@/components/primitives";

export function ChapterPhilosophy() {
  return (
    <section id="ch2" className="chapter philosophy section" data-index="1" data-label="Philosophy">
      <div className="wrap philo-wrap">
        <Reveal as="div" className="eyebrow">
          <span className="tick"></span>Our Philosophy
        </Reveal>

        <h2 className="philo-statement display">
          <Reveal as="span" className="ps-line" delay={0}>
            Carvo began in the
          </Reveal>
          <Reveal as="span" className="ps-line" delay={90}>
            <span className="accent">bay</span>, not the boardroom.
          </Reveal>
        </h2>

        <div className="philo-body">
          <Reveal as="p" className="philo-para" delay={120}>
            We protect cars the way we&apos;d protect our own — patiently, precisely, and with
            materials that earn their place. Every film cut, every coat laid, every panel of tint is
            in service of two things: a better drive today, and a car still worth something
            tomorrow.
          </Reveal>
        </div>

        <div className="philo-kinetic" aria-hidden="true">
          <KineticWord from={0.7} to={1.35} origin="center" className="display">
            patiently.
          </KineticWord>
        </div>

        <div className="philo-mv">
          <Reveal className="mv">
            <div className="eyebrow">
              <span className="accent">Our Mission</span>
            </div>
            <p>
              To provide high-quality automotive protection solutions that enhance the driving
              experience and preserve vehicle value for every customer.
            </p>
          </Reveal>
          <Reveal className="mv" delay={120}>
            <div className="eyebrow">
              <span className="accent">Our Vision</span>
            </div>
            <p>
              To become Malaysia&apos;s leading automotive detailing and protection brand —
              recognised for quality, innovation, and customer trust.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
