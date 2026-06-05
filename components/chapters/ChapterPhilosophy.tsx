"use client";
/* 02 · PHILOSOPHY — ported from chapters.jsx */
import { Reveal } from "@/components/primitives";
import { useParallax } from "@/lib/ticker";

export function ChapterPhilosophy() {
  const bgRef = useParallax(80, 1.16);
  return (
    <section id="ch2" className="chapter philosophy section" data-index="1" data-label="Philosophy">
      <div className="philo-bg">
        <div ref={bgRef} className="philo-bg-inner"></div>
        <div className="philo-veil"></div>
      </div>

      <div className="wrap philo-wrap">
        <Reveal as="div" className="eyebrow">
          <span className="tick"></span>Our Philosophy
        </Reveal>

        <h2 className="philo-statement display">
          <Reveal as="span" className="ps-line" delay={0}>
            Carvo began in
          </Reveal>
          <Reveal as="span" className="ps-line" delay={80}>
            the <span className="accent">bay</span>,
          </Reveal>
          <Reveal as="span" className="ps-line" delay={160}>
            not the
          </Reveal>
          <Reveal as="span" className="ps-line" delay={240}>
            boardroom.
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
      </div>
    </section>
  );
}
