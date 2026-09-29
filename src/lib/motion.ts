import { useEffect, useState } from 'react';
import type { Transition, Variants } from 'framer-motion';

/** Apple's decelerating curve. Everything on the page uses it. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  quick: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

export const transition = (duration = DURATION.base, delay = 0): Transition => ({
  duration,
  delay,
  ease: EASE,
});

/** Shared viewport config: reveals fire once, a third of the way in. */
export const VIEWPORT = { once: true, amount: 0.35 } as const;

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/**
 * Framer Motion's own useReducedMotion() reads matchMedia synchronously on the
 * client's first render. When a component uses that value to pick a different
 * `initial` state, style, or className at mount, the server's render (which has
 * no matchMedia and always resolves the non-reduced branch) can disagree with
 * the client's first paint, and React throws a hydration mismatch for anyone
 * who actually has the OS preference on.
 *
 * This starts at `false` on both the server and the client's first render, so
 * they always agree, then settles to the real value a tick later via its own
 * matchMedia listener. Components that gate an entrance transition on it (not
 * an already-mounted one, like a menu that only exists once opened) will run
 * that entrance once before the flag settles; pair this with a transition that
 * collapses to duration 0 once `reduce` is true, rather than branching `initial`.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
