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
  /** Driven by one shared observer on the grid of all three cards (see
      Spectrum.tsx), not a per-bar or per-card one: a card that's itself
      offset or mid-transform (the highlighted 3.5 GHz card) was throwing off
      its own whileInView reading, which is what left it stuck at 0%. */
  inView: boolean;
};

export function Gauge({ label, value, note, highlight = false, delay = 0, inView }: GaugeProps) {
  const reduce = usePrefersReducedMotion();
  const filled = reduce || inView;
  const transition = reduce ? { duration: 0 } : { duration: DURATION.slow, delay, ease: EASE };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-caption text-ink-muted">{label}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: filled ? 1 : 0 }}
          transition={transition}
          className={`text-caption font-medium ${highlight ? 'text-accent-strong' : 'text-ink'}`}
        >
          {note}
        </motion.span>
      </div>
      <div
        className="mt-2.5 h-[3px] w-full overflow-hidden rounded-pill bg-hairline"
        role="img"
        aria-label={`${label}: ${note}`}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: filled ? value / 100 : 0 }}
          transition={transition}
          style={{ transformOrigin: 'left' }}
          // Explicit background-color fallback plus the gradient image, so
          // the fill is never see-through even if the gradient failed to
          // apply for any reason.
          className={`h-full w-full rounded-pill ${
            highlight ? 'bg-[#F83A04] bg-gradient-to-r from-[#F83A04] to-[#D6181F]' : 'bg-ink'
          }`}
        />
      </div>
    </div>
  );
}
