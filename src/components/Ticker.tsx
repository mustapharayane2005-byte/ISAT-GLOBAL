'use client';

import Image from 'next/image';
import { usePrefersReducedMotion } from '@/lib/motion';

type TickerProps = {
  /** Dark sits above the nav (36px, plain white text). Light is the 56/48px
      in-page banner with the gradient highlight. */
  variant: 'dark' | 'light';
  direction?: 'ltr' | 'rtl';
  className?: string;
};

const MESSAGE = 'The full website is coming soon';
const REPEAT_COUNT = 6;

function TickerItem({ variant }: { variant: TickerProps['variant'] }) {
  return (
    <span className={`ticker-item ${variant === 'dark' ? 'text-white' : 'text-ink'}`}>
      The full website is <em className={variant === 'light' ? 'font-bold' : undefined}>coming soon</em>
      <Image src="/images/logo-isat-mark.png" alt="" width={16} height={16} className="h-4 w-4 shrink-0 object-contain" />
    </span>
  );
}

export function Ticker({ variant, direction = 'rtl', className = '' }: TickerProps) {
  const reduce = usePrefersReducedMotion();
  const reverse = direction === 'ltr';

  const tone =
    variant === 'dark'
      ? 'h-9 bg-ink text-[13px]'
      : 'h-12 border-y border-[#E5E5E7] bg-canvas text-[15px] md:h-14';

  if (reduce) {
    // Structurally simpler, not just a paused animation: one centred,
    // non-repeating instance of the message, exactly as specified.
    return (
      <div role="marquee" aria-label={MESSAGE} className={`flex items-center justify-center ${tone} ${className}`}>
        <TickerItem variant={variant} />
      </div>
    );
  }

  return (
    <div role="marquee" aria-label={MESSAGE} className={`ticker ${tone} ${className}`}>
      <div className={`ticker-track ${reverse ? 'reverse' : ''}`}>
        <div className="ticker-group">
          {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
            <TickerItem key={i} variant={variant} />
          ))}
        </div>
        <div className="ticker-group" aria-hidden="true">
          {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
            <TickerItem key={i} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}
