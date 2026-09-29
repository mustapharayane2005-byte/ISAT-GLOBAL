# iSAT

Landing page for iSAT, Nigerian telecom operator. Next.js App Router, TypeScript,
Tailwind, Framer Motion. Deploys to Vercel with no configuration.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Design tokens

Everything lives in `tailwind.config.ts`. The page is white, alternating only with
`#F5F5F7`, plus one black section. One accent colour, in two shades:

| Token | Value | Where it is used |
| --- | --- | --- |
| `accent` | `#F83A04` | The brand orange, measured off the logo. Fills, gauges, icons, display type, and anything on black. |
| `accent-strong` | `#C62C02` | Same hue, deepened. Every orange button and every small orange label on the light canvas, because `accent` only reaches 3.75:1 against white and would fail WCAG AA at text sizes. |
| `ink` / `ink-muted` | `#1D1D1F` / `#6E6E73` | Body text and secondary text. |
| `ink-muted-strong` | `#57575B` | Small text sitting on a grey frame rather than on white. |
| `surface` / `hairline` | `#F5F5F7` / `#D2D2D7` | Alternate section surface, and every rule on the page. |

Type is Inter Tight throughout, loaded with `next/font`. The scale is defined as
named sizes (`display`, `headline`, `title`, `lead`, `body`, `caption`, `numeral`,
`stat`) so no component sets a raw font size.

Radius follows one rule: `rounded-pill` for anything interactive, `rounded-frame`
(28px) for photo frames and panels, and nothing in between.

## Photography

Photo slots render a labelled grey frame until the real image exists. Drop a file
into `public/images/` named after the slot (`hero.webp`, `phase-2.webp`, and so on)
and it appears on the next `npm run dev` or `npm run build`; `scripts/gen-photo-manifest.mjs`
regenerates `src/lib/photo-manifest.ts` on both. `PHOTOS.md` carries a shooting
prompt, ratio and export size for each of the twelve slots.

## Motion

Every transition uses `cubic-bezier(0.22, 1, 0.36, 1)` at 0.4s to 1.2s. Each
section moves in its own way rather than sharing one fade: the hero runs an
orchestrated entrance and then scales with scroll, figures count up, gauges fill,
the phase tabs slide a shared pill, the panorama drifts in parallax, and the
sector rail brings the centred card forward. Everything is wrapped in
`useReducedMotion` and collapses to a static page when the visitor asks for that.

## Structure

```
src/
  app/          layout, page, icons
  components/   Nav, Footer, Section, PhotoSlot, ParallaxPhoto, Tabs, Rail, Reveal, Counter, Gauge
  sections/     Hero, Figures, Spectrum, Phases, IsatOne, Impact, Contact
  lib/          motion constants, photo helpers, generated manifest
```

To add a page (Solutions, iSAT One, Coverage, Contact), create
`src/app/<route>/page.tsx` and compose `Section`, `SectionHead` and the shared
components. `Nav` and `Footer` come from the root layout, so a new route needs
nothing beyond its own content, plus an entry in the `LINKS` array in
`src/components/Nav.tsx`.

## Figures

Coverage, investment, capacity and economic numbers on this page are iSAT
projections and planning targets. The footer states this. The gauges in the 5G
section are comparative, not measurements, and are labelled in words rather than
percentages so they are not read as published figures.
