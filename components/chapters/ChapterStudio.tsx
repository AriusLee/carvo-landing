"use client";
/* 06 · STUDIO & CONTACT — ported from chapters2.jsx */
import { Reveal, Media } from "@/components/primitives";
import { scrollToY, useParallax } from "@/lib/ticker";

const STATS = [
  { v: "02", l: "Studios · Puchong & PJ" },
  { v: "'25", l: "Established" },
  { v: "100%", l: "By appointment" },
  { v: "4", l: "Protection services" },
];

const STUDIOS = [
  { city: "Puchong", addr: "55G, Jalan Bandar 1, Pusat Bandar Puchong, 47100 Puchong, Selangor" },
  { city: "Petaling Jaya", addr: "30, Jalan SS 23/11, Taman Sea, 47400 Petaling Jaya, Selangor" },
];

export function ChapterStudio() {
  const mediaRef = useParallax(60, 1.16);
  return (
    <section id="ch6" className="chapter studio section" data-index="5" data-label="Studio & Contact">
      <div className="studio-bg">
        <div ref={mediaRef} className="studio-bg-inner">
          <Media id="studio-bg" surface="studio" placeholder="Drop studio / low-key exotic" />
        </div>
        <div className="studio-veil"></div>
      </div>

      <div className="wrap studio-inner">
        <div className="stats">
          {STATS.map((s) => (
            <Reveal className="stat" key={s.l}>
              <span className="stat-v display">{s.v}</span>
              <span className="stat-l">{s.l}</span>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="studio-para">
          Two studios, one standard. A skilled technical team, high-quality materials and advanced
          application, customised to your car — built around long-term protection and the value it
          keeps.
        </Reveal>

        <div className="close">
          <h2 className="close-title display">
            <span className="line">
              <Reveal as="span" clip className="ht">
                Tell us about
              </Reveal>
            </span>
            <span className="line">
              <Reveal as="span" clip className="ht accent" delay={120}>
                the car.
              </Reveal>
            </span>
          </h2>
          <Reveal as="p" className="close-sub" delay={260}>
            Send your model and what you have in mind — we&apos;ll come back with a tailored scope,
            timeline and quote.
          </Reveal>

          <Reveal className="btns close-cta" delay={380}>
            <a
              className="btn btn-solid"
              href="https://wa.me/60104331914"
              target="_blank"
              rel="noopener"
              data-cursor
            >
              Message us on WhatsApp
            </a>
            <a className="btn btn-ghost" href="mailto:carvomalaysia@gmail.com" data-cursor>
              carvomalaysia@gmail.com
            </a>
            <a
              className="btn-text"
              href="https://instagram.com/carvomalaysia"
              target="_blank"
              rel="noopener"
              data-cursor
            >
              @carvomalaysia <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </div>

      <footer className="footer">
        <div className="wrap footer-grid">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="footer-wm" src="/assets/carvo-wordmark.svg" alt="CARVO" />
            <div className="footer-legal">CARVO MALAYSIA SDN. BHD.</div>
            <div className="footer-services">Window Film · Coating · PPF · Car Mat</div>
          </div>
          <div className="footer-studios">
            {STUDIOS.map((s) => (
              <div className="footer-studio" key={s.city}>
                <div className="fs-city">{s.city}</div>
                <div className="fs-addr">{s.addr}</div>
              </div>
            ))}
          </div>
          <div className="footer-contact">
            <a href="https://wa.me/60104331914" target="_blank" rel="noopener" data-cursor>
              +6010-4331914
            </a>
            <a href="mailto:carvomalaysia@gmail.com" data-cursor>
              carvomalaysia@gmail.com
            </a>
            <a href="https://instagram.com/carvomalaysia" target="_blank" rel="noopener" data-cursor>
              @carvomalaysia
            </a>
          </div>
        </div>
        <div className="wrap footer-base">
          <span>© 2026 Carvo Malaysia Sdn Bhd</span>
          <span className="fb-cue" data-cursor onClick={() => scrollToY(0)}>
            Back to top ↑
          </span>
        </div>
      </footer>
    </section>
  );
}
