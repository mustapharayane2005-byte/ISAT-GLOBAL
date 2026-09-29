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

const PREFIX = 'The full website is ';
const HIGHLIGHT = 'coming soon';
const FULL_MESSAGE = `${PREFIX}${HIGHLIGHT}`;
const DURATION_SECONDS = 40;
// Repeated enough times per half to stay wider than any realistic viewport,
// so the loop never shows a gap, however wide the window is.
const REPEAT_COUNT = 8;

function TickerItem({ variant }: { variant: TickerProps['variant'] }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-8 px-4">
      <span className={variant === 'dark' ? 'text-white' : 'text-ink'}>
        {PREFIX}
        <span
          className={
            variant === 'light'
              ? // Bold at this size clears the WCAG large-text threshold
                // (14px+ bold), which is what lets the brand's exact orange
                // stop pass AA on white without the colour itself changing.
                'bg-gradient-to-r from-[#F83A04] to-[#D6181F] bg-clip-text font-bold text-transparent'
              : undefined
          }
        >
          {HIGHLIGHT}
        </span>
      </span>
      <Image
        src="/images/logo-isat-mark.png"
        alt=""
        width={16}
        height={16}
        aria-hidden
        className="h-4 w-4 shrink-0 object-contain"
      />
    </span>
  );
}

export function Ticker({ variant, direction = 'rtl', className = '' }: TickerProps) {
  const reduce = usePrefersReducedMotion();

  const tone =
    variant === 'dark'
      ? 'h-9 bg-ink text-[13px]'
      : 'h-12 border-y border-[#E5E5E7] bg-canvas text-[15px] md:h-14';

  if (reduce) {
    // Structurally simpler, not just a paused animation: one centred,
    // non-repeating instance of the message, exactly as specified.
    return (
      <div role="marquee" aria-label={FULL_MESSAGE} className={`flex items-center justify-center ${tone} ${className}`}>
        <span className={variant === 'dark' ? 'text-white' : 'text-ink'}>
          {PREFIX}
          <span
            className={
              variant === 'light'
                ? 'bg-gradient-to-r from-[#F83A04] to-[#D6181F] bg-clip-text font-bold text-transparent'
                : undefined
            }
          >
            {HIGHLIGHT}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      role="marquee"
      aria-label={FULL_MESSAGE}
      tabIndex={0}
      className={`ticker group/ticker flex items-center overflow-hidden ${tone} ${className}`}
    >
      <div
        aria-hidden="true"
        className="ticker-track flex w-max items-center"
        style={{
          animationDuration: `${DURATION_SECONDS}s`,
          animationDirection: direction === 'ltr' ? 'reverse' : 'normal',
        }}
      >
        {Array.from({ length: 2 }).map((_, half) => (
          <div key={half} className="flex items-center">
            {Array.from({ length: REPEAT_COUNT }).map((_, i) => (
              <TickerItem key={`${half}-${i}`} variant={variant} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
