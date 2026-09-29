'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE, VIEWPORT, transition, usePrefersReducedMotion } from '@/lib/motion';

type RevealProps = {
  as?: 'div' | 'p' | 'li' | 'span';
  delay?: number;
  distance?: number;
  className?: string;
  children: React.ReactNode;
};

/** Block-level scroll reveal. Static when the visitor prefers reduced motion. */
export function Reveal({ as = 'div', delay = 0, distance = 28, className, children }: RevealProps) {
  const reduce = usePrefersReducedMotion();
  const Tag = motion[as];

  return (
    <Tag
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={reduce ? { duration: 0 } : transition(DURATION.base, delay)}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Reveals a heading word by word. Used only on the two headlines that carry the
 * page: the hero and iSAT One. Everywhere else a block reveal is enough.
 */
export function RevealWords({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  accentWords = [],
}: {
  text: string;
  as?: 'h1' | 'h2';
  className?: string;
  delay?: number;
  /** Words rendered in the accent colour, matched case-insensitively. */
  accentWords?: string[];
}) {
  const reduce = usePrefersReducedMotion();
  const words = text.split(' ');
  const accents = accentWords.map((w) => w.toLowerCase());

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: reduce ? 0 : delay } },
        }}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={{
                hidden: { y: '105%' },
                visible: { y: '0%', transition: { duration: reduce ? 0 : DURATION.base, ease: EASE } },
              }}
              className={`inline-block ${
                accents.includes(word.replace(/[^\w.]/g, '').toLowerCase()) ? 'text-accent' : ''
              }`}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? <span>&nbsp;</span> : null}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
