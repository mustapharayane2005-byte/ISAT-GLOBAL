'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Gauge } from '@/components/Gauge';
import { ParallaxPhoto } from '@/components/ParallaxPhoto';
import { Reveal } from '@/components/Reveal';
import { Section, SectionHead } from '@/components/Section';

const BANDS = [
  {
    band: '700 MHz',
    kind: 'Low band',
    summary: 'Travels furthest and goes through walls, but every user shares a narrow pipe.',
    coverage: { value: 95, note: 'Widest' },
    capacity: { value: 22, note: 'Limited' },
    highlight: false,
  },
  {
    band: '3.5 GHz',
    kind: 'n78, the working band',
    summary:
      'Enough reach to cover a city from ordinary mast spacing, enough spectrum to carry fibre-class speeds. This is where iSAT plans to build.',
    coverage: { value: 75, note: 'City-wide' },
    capacity: { value: 80, note: 'High' },
    highlight: true,
  },
  {
    band: '26 GHz',
    kind: 'mmWave',
    summary: 'Extraordinary capacity over a single block, and stopped by a pane of glass.',
    coverage: { value: 18, note: 'Very short' },
    capacity: { value: 98, note: 'Highest' },
    highlight: false,
  },
];

export function Spectrum() {
  // One observer for all three cards, not one per card or per bar: the
  // highlighted card carries its own visual offset (below), and a nested
  // observer on or under a transformed/offset element was what threw the
  // 3.5 GHz bars' own readings off, leaving them stuck at 0%.
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, amount: 0.25 });

  return (
    <Section id="five-g">
      <SectionHead
        title="The sweet spot of 5G"
        lead="Spectrum forces a trade between how far a signal reaches and how much it carries. One band refuses to choose."
      />

      <div
        ref={gridRef}
        className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.32fr_1fr] lg:items-start lg:gap-10"
      >
        {BANDS.map((band, i) => {
          const card = (
            <div
              className={
                band.highlight ? 'rounded-frame bg-surface p-8 lg:p-10' : 'border-t border-hairline pt-8 lg:pt-10'
              }
            >
              <p className={`text-title ${band.highlight ? 'text-accent' : 'text-ink'}`}>{band.band}</p>
              <p className="mt-1 text-caption text-ink-muted">{band.kind}</p>
              <p className="mt-5 max-w-measure text-body text-ink-muted">{band.summary}</p>

              <div className="mt-8 space-y-5">
                <Gauge
                  label="Coverage"
                  value={band.coverage.value}
                  note={band.coverage.note}
                  highlight={band.highlight}
                  delay={i * 2 * 0.12}
                  inView={inView}
                />
                <Gauge
                  label="Capacity"
                  value={band.capacity.value}
                  note={band.capacity.note}
                  highlight={band.highlight}
                  delay={(i * 2 + 1) * 0.12}
                  inView={inView}
                />
              </div>
            </div>
          );

          if (band.highlight) {
            // No transform, scale or opacity on the card itself, so it can
            // never distort the shared observer above it. The pulled-up
            // position is carried entirely by this plain wrapper instead,
            // which has no motion and no observer of its own.
            return (
              <div key={band.band} className="lg:-mt-8">
                {card}
              </div>
            );
          }

          return (
            <Reveal key={band.band} delay={i * 0.1}>
              {card}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-24 md:mt-32">
        <ParallaxPhoto
          id="5g-home"
          ratio="16/9"
          caption="Fast at home. A family of three shares a sofa, the father holding a remote and the child seated with his mother."
          objectPosition="50% 35%"
        />
        <p className="mx-auto mt-6 max-w-measure text-center text-body text-ink-muted">
          The same band planned to cover a city could also replace the cable into a home.
        </p>
      </Reveal>
    </Section>
  );
}
