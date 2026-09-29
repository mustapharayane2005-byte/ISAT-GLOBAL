'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE, usePrefersReducedMotion } from '@/lib/motion';

type GaugeProps = {
  label: string;
  /** Relative position on the band, 0 to 100. Comparative, not a measurement. */
  value: number;
  /** Short word describing the level, e.g. "Widest". */
  note: string;
  highlight?: boolean;
  delay?: number;
};

export function Gauge({ label, value, note, highlight = false, delay = 0 }: GaugeProps) {
  const reduce = usePrefersReducedMotion();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-caption text-ink-muted">{label}</span>
        <span className={`text-caption font-medium ${highlight ? 'text-accent-strong' : 'text-ink'}`}>{note}</span>
      </div>
      <div
        className="mt-2.5 h-[3px] w-full overflow-hidden rounded-pill bg-hairline"
        role="img"
        aria-label={`${label}: ${note}`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          transition={reduce ? { duration: 0 } : { duration: DURATION.slow, delay, ease: EASE }}
          style={{ transformOrigin: 'left' }}
          className={`h-full w-full rounded-pill ${
            highlight ? 'bg-gradient-to-r from-[#F83A04] to-[#D6181F]' : 'bg-ink'
          }`}
        />
      </div>
    </div>
  );
}
