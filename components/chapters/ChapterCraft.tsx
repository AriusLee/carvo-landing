"use client";
/* 03 · THE CRAFT (pinned scroll scenes) — ported from chapters.jsx */
import { useEffect, useRef } from "react";
import { Media } from "@/components/primitives";
import { REDUCED, addFrame, clamp } from "@/lib/ticker";

type Craft = {
  n: string;
  name: string;
  surface: string;
  slot: string;
  drop: string;
  line: string;
  points: string[];
};

const CRAFT: Craft[] = [
  {
    n: "01",
    name: "Window Film",
    surface: "tint",
    slot: "craft-tint",
    drop: "Drop tint / cabin light shot",
    line: "Clarity by day, privacy when wanted — a cabin composed in the Malaysian sun.",
    points: ["IR heat rejection", "99% UV block", "Optically clear"],
  },
  {
    n: "02",
    name: "Full Car Coating",
    surface: "gloss",
    slot: "craft-coat",
    drop: "Drop liquid-glass gloss shot",
    line: "A liquid-glass layer that deepens the paint and makes every wash effortless.",
    points: ["Multi-layer gloss", "Hydrophobic finish", "UV & oxidation defence"],
  },
  {
    n: "03",
    name: "Paint Protection Film",
    surface: "film",
    slot: "craft-ppf",
    drop: "Drop PPF film-edge macro",
    line: "Invisible, self-healing armour against stone chips and the small violences of the road.",
    points: ["Self-healing top coat", "Edge-wrapped, model-cut", "Multi-year film warranty"],
  },
  {
    n: "04",
    name: "Car Mat",
    surface: "gloss",
    slot: "craft-mat",
    drop: "Drop tailored mat / interior shot",
    line: "Tailored, premium floor protection — the finishing detail.",
    points: ["Custom-fit to model", "Easy-clean", "Refined materials"],
  },
];

export function ChapterCraft() {
  const secRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const N = CRAFT.length;

  useEffect(() => {
    if (REDUCED) return;
    const unsub = addFrame(() => {
      const sec = secRef.current;
      if (!sec) return;
      const r = sec.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height - vh;
      const p = clamp(-r.top / (total || 1)); // 0..1 through the pin
      const f = p * (N - 1); // 0..N-1
      const active = Math.round(f);

      sceneRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = f - i;
        const op = clamp(1 - Math.abs(d) * 1.15);
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0, ${(d * -36).toFixed(1)}px, 0)`;
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
        el.style.zIndex = op > 0.5 ? "3" : "1";
        const media = el.querySelector<HTMLElement>(".craft-media-inner");
        if (media)
          media.style.transform = `scale(${(1.06 + Math.abs(d) * 0.06).toFixed(3)}) translateY(${(
            d * 22
          ).toFixed(1)}px)`;
      });
      railRefs.current.forEach((el, i) => {
        if (el) el.classList.toggle("on", i === active);
      });
      if (counterRef.current)
        counterRef.current.textContent = String(active + 1).padStart(2, "0");

      const line = stageRef.current && stageRef.current.querySelector<HTMLElement>(".rail-fill");
      if (line) line.style.transform = `scaleY(${p.toFixed(3)})`;
    });
    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="ch3"
      ref={secRef}
      className="chapter craft"
      data-index="2"
      data-label="The Craft"
      style={{ height: N * 118 + "vh" }}
    >
      <div ref={stageRef} className="craft-stage">
        <div className="craft-top wrap">
          <div className="eyebrow">
            <span className="tick"></span>The Craft
          </div>
          <div className="craft-counter">
            <span ref={counterRef} className="cc-now display">
              01
            </span>
            <span className="cc-sep">/</span>
            <span className="cc-total">{String(N).padStart(2, "0")}</span>
          </div>
        </div>

        <div className="craft-rail" aria-hidden="true">
          <span className="rail-line">
            <span className="rail-fill"></span>
          </span>
          {CRAFT.map((c, i) => (
            <span
              key={c.n}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="rail-num"
            >
              {c.n}
            </span>
          ))}
        </div>

        {CRAFT.map((c, i) => (
          <article
            key={c.n}
            ref={(el) => {
              sceneRefs.current[i] = el;
            }}
            className="craft-scene"
          >
            <div className="wrap craft-grid">
              <div className="craft-text">
                <div className="craft-bignum display" aria-hidden="true">
                  {c.n}
                </div>
                <h3 className="craft-name display">{c.name}</h3>
                <p className="craft-line">{c.line}</p>
                <ul className="craft-points">
                  {c.points.map((p) => (
                    <li key={p}>
                      <span className="pt-tick"></span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="craft-media">
                <div className="craft-media-inner">
                  <Media id={c.slot} surface={c.surface} placeholder={c.drop} />
                </div>
                <span className="craft-media-tag">
                  {c.n} · {c.name}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
