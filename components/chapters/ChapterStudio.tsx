"use client";
/* 05 · STUDIO & CONTACT (close) */
import { Reveal } from "@/components/primitives";
import { SpeedStreaks } from "@/components/SpeedStreaks";
import { scrollToY } from "@/lib/ticker";

const OUTLETS = [
  {
    city: "Puchong",
    addr: "55G, Jalan Bandar 1, Pusat Bandar Puchong, 47100 Puchong, Selangor",
  },
  {
    city: "Petaling Jaya",
    addr: "30, Jalan SS 23/11, Taman Sea, 47400 Petaling Jaya, Selangor",
  },
];
const mapsUrl = (a: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Carvo " + a)}`;

export function ChapterStudio() {
  return (
    <section
      id='ch8'
      className='chapter studio section'
      data-index='7'
      data-label='Contact us'
    >
      <div className='studio-bg'>
        {/* procedural speed-streak backdrop */}
        <SpeedStreaks />
        <div className='studio-veil'></div>
      </div>

      <div className='wrap studio-inner'>
        <div className='close'>
          <Reveal as='div' className='eyebrow'>
            <span className='tick'></span>Contact us
          </Reveal>
          <h2 className='close-title display'>
            <span className='line'>
              <Reveal as='span' clip className='ht'>
                Tell us about
              </Reveal>
            </span>
            <span className='line'>
              <Reveal as='span' clip className='ht accent' delay={120}>
                the car.
              </Reveal>
            </span>
          </h2>
          <Reveal as='p' className='close-sub' delay={260}>
            Send your model and what you have in mind — we&apos;ll come back
            with a tailored scope, timeline and quote.
          </Reveal>

          <Reveal className='btns close-cta' delay={380}>
            <a
              className='btn btn-solid'
              href='https://wa.me/60104331914'
              target='_blank'
              rel='noopener'
              data-cursor
            >
              Message us on WhatsApp
            </a>
            <a
              className='btn btn-ghost'
              href='mailto:carvomalaysia@gmail.com'
              data-cursor
            >
              carvomalaysia@gmail.com
            </a>
            <a
              className='btn btn-ghost'
              href='/carvo-catalogue.pdf'
              download
              data-cursor
            >
              Download catalogue <span className='arrow'>↓</span>
            </a>
          </Reveal>
        </div>

        <div className='outlets'>
          {OUTLETS.map((o) => (
            <Reveal className='outlet' key={o.city}>
              <h3 className='ot-city display'>{o.city}</h3>
              <p className='ot-addr'>{o.addr}</p>
              <a
                className='ot-link'
                href={mapsUrl(o.addr)}
                target='_blank'
                rel='noopener'
                data-cursor
              >
                Get directions <span className='arrow'>→</span>
              </a>
            </Reveal>
          ))}
        </div>
        <br />
      </div>

      <footer className='footer'>
        <div className='wrap footer-grid'>
          <div className='footer-brand'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className='footer-wm'
              src='/assets/carvo-wordmark.svg'
              alt='CARVO'
            />
            <div className='footer-legal'>CARVO MALAYSIA SDN. BHD.</div>
            <div className='footer-services'>
              Window Tinting · Coating · PPF · Car Mat
            </div>
          </div>
          <div className='footer-contact'>
            <a
              href='https://wa.me/60104331914'
              target='_blank'
              rel='noopener'
              data-cursor
            >
              +6010-4331914
            </a>
            <a href='mailto:carvomalaysia@gmail.com' data-cursor>
              carvomalaysia@gmail.com
            </a>
            <a
              href='https://instagram.com/carvomalaysia'
              target='_blank'
              rel='noopener'
              data-cursor
            >
              @carvomalaysia
            </a>
          </div>
        </div>
        <div className='wrap footer-base'>
          <span>© 2026 Carvo Malaysia Sdn Bhd</span>
          <span className='fb-cue' data-cursor onClick={() => scrollToY(0)}>
            Back to top ↑
          </span>
        </div>
      </footer>
    </section>
  );
}
