'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { geoMercator, geoPath } from 'd3-geo';
import { nigeriaGeo } from '@/lib/nigeria-geo';
import { usePrefersReducedMotion } from '@/lib/motion';

export type MapPhase = 'phase-1' | 'phase-2' | 'phase-3';

type City = {
  name: string;
  lon: number;
  lat: number;
  phase: MapPhase;
  dx: number;
  dy: number;
  anchor?: 'start' | 'end';
};

// Real coordinates (decimal degrees). Label offsets are hand-tuned only to
// avoid overlap on this small illustrative map; the plotted point itself is
// the real projected lon/lat.
const CITIES: City[] = [
  { name: 'Lagos', lon: 3.3792, lat: 6.5244, phase: 'phase-1', dx: 8, dy: 16 },
  { name: 'Abuja', lon: 7.3986, lat: 9.0765, phase: 'phase-1', dx: 8, dy: 4 },
  { name: 'Port Harcourt', lon: 7.0498, lat: 4.8156, phase: 'phase-1', dx: 8, dy: 20 },
  { name: 'Ibadan', lon: 3.947, lat: 7.3775, phase: 'phase-1', dx: -8, dy: -8, anchor: 'end' },
  { name: 'Kano', lon: 8.592, lat: 12.0022, phase: 'phase-2', dx: 8, dy: -10 },
  { name: 'Kaduna', lon: 7.4383, lat: 10.5222, phase: 'phase-2', dx: 8, dy: 4 },
  { name: 'Enugu', lon: 7.5106, lat: 6.5244, phase: 'phase-2', dx: -8, dy: -10, anchor: 'end' },
  { name: 'Benin City', lon: 5.6037, lat: 6.335, phase: 'phase-2', dx: -8, dy: 6, anchor: 'end' },
  { name: 'Owerri', lon: 7.0351, lat: 5.484, phase: 'phase-2', dx: 12, dy: 12 },
  { name: 'Ilorin', lon: 4.5426, lat: 8.4966, phase: 'phase-2', dx: -8, dy: -6, anchor: 'end' },
];

const PHASE_ORDER: MapPhase[] = ['phase-1', 'phase-2', 'phase-3'];

const WIDTH = 520;
const HEIGHT = 620;

export function NigeriaMap({ phase }: { phase: MapPhase }) {
  const reduce = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, amount: 0.35 });

  const { pathData, project } = useMemo(() => {
    const projection = geoMercator().fitSize([WIDTH, HEIGHT], nigeriaGeo);
    const pathGenerator = geoPath(projection);
    return {
      pathData: pathGenerator(nigeriaGeo) ?? '',
      project: (lon: number, lat: number): [number, number] => projection([lon, lat]) ?? [0, 0],
    };
  }, []);

  const activeIndex = PHASE_ORDER.indexOf(phase);
  const isFinalPhase = phase === 'phase-3';
  const visibleCities = isFinalPhase
    ? []
    : CITIES.filter((city) => PHASE_ORDER.indexOf(city.phase) <= activeIndex);
  const currentCityNames = isFinalPhase
    ? ['All 36 state capitals', 'Regional cities nationwide']
    : visibleCities.filter((city) => city.phase === phase).map((city) => city.name);

  return (
    <figure>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-labelledby="nigeria-map-title nigeria-map-desc"
        className="mx-auto w-full max-w-[420px]"
      >
        <title id="nigeria-map-title">Map of Nigeria showing the ISAT rollout plan</title>
        <desc id="nigeria-map-desc">
          A simplified outline of Nigeria highlighting the cities planned for each build phase.
        </desc>
        <defs>
          <linearGradient id="nigeria-phase-3-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F83A04" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D6181F" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="nigeria-city-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F83A04" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F83A04" stopOpacity="0" />
          </radialGradient>
        </defs>

        <motion.path
          d={pathData}
          fill={isFinalPhase ? 'url(#nigeria-phase-3-fill)' : '#F5F5F7'}
          stroke="#1D1D1F"
          strokeOpacity={0.15}
          strokeWidth={1.5}
          initial={reduce ? undefined : { pathLength: 0 }}
          animate={reduce ? undefined : { pathLength: inView ? 1 : 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {visibleCities.map((city, i) => {
          const [x, y] = project(city.lon, city.lat);
          const isCurrent = city.phase === phase;
          const radius = isCurrent ? 6 : 3.5;
          return (
            <motion.g
              key={`${city.name}-${phase}`}
              initial={reduce ? undefined : { opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.4, delay: isCurrent ? i * 0.1 : 0 }
              }
            >
              {isCurrent ? <circle cx={x} cy={y} r={16} fill="url(#nigeria-city-halo)" /> : null}
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={isCurrent ? '#F83A04' : '#1D1D1F'}
                fillOpacity={isCurrent ? 1 : 0.35}
              />
              <text
                x={x + city.dx}
                y={y + city.dy}
                fontSize={14}
                fontWeight={isCurrent ? 600 : 400}
                textAnchor={city.anchor ?? 'start'}
                fill={isCurrent ? '#1D1D1F' : '#6E6E73'}
              >
                {city.name}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {isFinalPhase ? (
        <p className="mt-4 text-center text-body font-medium text-ink">
          State capitals and key regional towns
        </p>
      ) : null}

      <p className="mt-3 text-center text-caption text-ink-muted">{currentCityNames.join(' · ')}</p>

      <figcaption className="mt-2 text-center text-caption text-ink-muted">
        Illustrative map. Rollout plan is subject to regulatory approvals.
      </figcaption>
    </figure>
  );
}
