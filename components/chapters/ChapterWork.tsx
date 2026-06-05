"use client";
/* 05 · SELECTED WORK — ported from chapters2.jsx */
import { Reveal, Media } from "@/components/primitives";
import { scrollToY, useParallax } from "@/lib/ticker";

type Tile = { id: string; cls: string; surface: string; drop: string };

const GALLERY: Tile[] = [
  { id: "work-1", cls: "g-tall", surface: "studio", drop: "Studio-lit exotic — hero" },
  { id: "work-2", cls: "g-wide", surface: "beading", drop: "Beading / fresh coat" },
  { id: "work-3", cls: "g-sq", surface: "film", drop: "PPF edge detail" },
  { id: "work-4", cls: "g-sq", surface: "gloss", drop: "Gloss / reflection" },
  { id: "work-5", cls: "g-wide", surface: "tint", drop: "Tinted glass at dusk" },
  { id: "work-6", cls: "g-tall", surface: "studio", drop: "Three-quarter, low key" },
];

function WorkTile({ item }: { item: Tile }) {
  const inner = useParallax(54, 1.16);
  return (
    <Reveal className={"g-tile " + item.cls}>
      <div className="g-media">
        <div ref={inner} className="g-media-inner">
          <Media id={item.id} surface={item.surface} placeholder={item.drop} />
        </div>
      </div>
    </Reveal>
  );
}

export function ChapterWork() {
  return (
    <section id="ch5" className="chapter work section" data-index="4" data-label="Selected Work">
      <div className="wrap">
        <div className="work-head">
          <Reveal as="div" className="eyebrow">
            <span className="tick"></span>Selected Work
          </Reveal>
          <h2 className="work-title display">
            <Reveal as="span" clip>
              Cars worth the patience.
            </Reveal>
          </h2>
          <Reveal
            as="a"
            className="work-link"
            href="#ch6"
            delay={120}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              scrollToY("#ch6", { offset: -10 });
            }}
            data-cursor
          >
            Discuss your car <span className="arrow">→</span>
          </Reveal>
        </div>

        <div className="g-grid">
          {GALLERY.map((it) => (
            <WorkTile key={it.id} item={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
