'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DURATION, EASE, usePrefersReducedMotion } from '@/lib/motion';

export type TabItem = {
  id: string;
  label: string;
  panel: React.ReactNode;
};

/**
 * Tab bar with a single pill that slides between labels (shared layoutId) and a
 * crossfade between panels. The movement shows that one thing changed, rather
 * than that a new block appeared.
 */
export function Tabs({
  items,
  ariaLabel,
  track = 'surface',
}: {
  items: TabItem[];
  ariaLabel: string;
  /** Rail colour, chosen to contrast with the section behind it. */
  track?: 'surface' | 'canvas';
}) {
  const [active, setActive] = useState(items[0].id);
  const reduce = usePrefersReducedMotion();
  const uid = useId();
  const current = items.find((item) => item.id === active) ?? items[0];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const index = items.findIndex((item) => item.id === active);
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const next = event.key === 'ArrowRight' ? index + 1 : index - 1;
      const target = items[(next + items.length) % items.length];
      setActive(target.id);
      document.getElementById(`${uid}-tab-${target.id}`)?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className={`mx-auto flex w-full max-w-md flex-wrap items-center justify-center gap-1 rounded-pill p-1 sm:w-fit sm:max-w-none ${
          track === 'canvas' ? 'bg-white' : 'bg-surface'
        }`}
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${uid}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className="relative flex-1 whitespace-nowrap rounded-pill px-5 py-2.5 text-nav font-medium transition-colors duration-200 sm:flex-none"
            >
              {selected ? (
                <motion.span
                  layoutId={`${uid}-pill`}
                  transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                  className="absolute inset-0 rounded-pill bg-ink"
                />
              ) : null}
              <span className={`relative z-10 ${selected ? 'text-white' : 'text-ink-muted'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current.id}
          id={`${uid}-panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${current.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={reduce ? { duration: 0 } : { duration: DURATION.quick, ease: EASE }}
        >
          {current.panel}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
