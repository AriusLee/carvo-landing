# Carvo — Landing Page

Cinematic, scroll-driven single-page site for **Carvo Malaysia** (premium automotive
protection). Pagani-style chapter navigation × Lando-style scroll experience, orange
`#F26A21` on near-black.

Implemented from the Claude Design handoff bundle (`claude.ai/design`), rebuilt in the
project's locked stack.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Lenis** — smooth inertia scroll
- **Tailwind CSS** — installed for future work (app + admin portal); preflight is
  **disabled** so the tuned landing-page CSS stays the pixel source of truth
- `next/font` — **Anton** (display) + **Archivo** (body)

## Run

```bash
pnpm install
pnpm dev      # http://localhost:9070
```

Other scripts: `pnpm build`, `pnpm start` (also port 9070), `pnpm lint`.

## Structure

```
app/
  layout.tsx        fonts, metadata, loads image-slot.js
  page.tsx          renders <App/>
  globals.css       ported verbatim from the prototype's styles.css (pixel spec)
components/
  App.tsx           intro reveal, top bar, vertical chapter nav, mount + effects
  primitives.tsx    Reveal · KineticWord · Media · CountUp
  chapters/         ChapterIntro · Philosophy · Craft · Process · Work · Studio
lib/
  ticker.ts         shared rAF scroll engine (reveals, parallax, kinetic type) + Lenis
public/
  image-slot.js     drag-to-fill image placeholder web component
  assets/           carvo-wordmark.png
```

## Notes

- **Imagery is placeholder.** Every photo zone is a drag-to-fill `<image-slot>` over a
  CSS "surface-macro" stand-in (beading / film-edge / tint / gloss / studio). Drop real
  client shots onto any labelled slot.
- **Motion engine:** one shared rAF ticker drives reveals, parallax, kinetic type, and
  active-chapter tracking, with a `setInterval` watchdog if rAF is throttled. Honours
  `prefers-reduced-motion` (Craft unpins into a static stack).

## Engagement

Lam Fung × Carvo — see `../landing-page-brief.md` and `../landing-page-references.md`.
```
