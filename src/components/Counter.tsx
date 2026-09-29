'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { EASE, usePrefersReducedMotion } from '@/lib/motion';

type CounterProps = {
  to: number;
  /** Text rendered before and after the number, e.g. "$" and "B+". */
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
};

/**
 * Counts up once the figure scrolls into view. The count is decoration for a
 * value that is already in the DOM, so screen readers get the final number and
 * reduced-motion visitors skip straight to it.
 */
export function Counter({
  to,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.6,
  className = '',
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  // Always starts at 0, matching the server, so hydration never has to reconcile
  // a number it can't have computed. Reduced-motion visitors still land on the
  // right value the moment the figure scrolls into view, just without the count.
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setValue(latest),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  const formatted = value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={`tnum ${className}`}>
      <span aria-hidden>
        {prefix}
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">{`${prefix}${to.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`}</span>
    </span>
  );
}
