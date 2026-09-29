'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PhotoSlot } from '@/components/PhotoSlot';
import { usePrefersReducedMotion } from '@/lib/motion';
import type { PhotoRatio } from '@/lib/photos';

/**
 * A photo that drifts against the page as it passes through the viewport.
 * The overscale is what the drift eats into, so the frame never shows an edge.
 */
export function ParallaxPhoto({
  id,
  caption,
  ratio = '16/9',
  tone = 'light',
  objectPosition,
  amount = 5,
  sizes,
}: {
  id: string;
  caption: string;
  ratio?: PhotoRatio;
  tone?: 'light' | 'muted' | 'dark';
  objectPosition?: string;
  /** Drift in percent of the frame height, each way. */
  amount?: number;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // The range collapses to a flat 0 instead of the style/className props being
  // swapped for undefined: reduce defaults to false on the server and on the
  // client's first paint alike, so the structure of what's rendered never
  // depends on it, only how far the drift travels once scrolling begins.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className="overflow-hidden rounded-frame">
      {/* scale lives in the same style object as y, not a separate Tailwind
          class: Framer Motion writes its own inline transform for y, which
          silently wins over any class-based transform on the same element,
          so a static scale-[1.16] class here would never actually render. */}
      <motion.div style={{ y, scale: 1.16 }}>
        <PhotoSlot
          id={id}
          ratio={ratio}
          caption={caption}
          tone={tone}
          objectPosition={objectPosition}
          sizes={sizes}
        />
      </motion.div>
    </div>
  );
}
