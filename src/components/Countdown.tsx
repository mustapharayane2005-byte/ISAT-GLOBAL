'use client';

import { useEffect, useState } from 'react';

type CountdownProps = {
  /** Dark sits above the nav (36px, plain white text), light is the in-page band before Contact. */
  variant: 'dark' | 'light';
  className?: string;
};

const TARGET = new Date('2026-11-30T23:59:59+01:00').getTime();

type Remaining = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getRemaining(): Remaining {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

export function Countdown({ variant, className = '' }: CountdownProps) {
  // Starts null so the server render and the client's first paint match
  // exactly (nothing shown yet); the real, client-computed countdown fills
  // in a tick later, which is what keeps this hydration-safe.
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    setRemaining(getRemaining());
    const id = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const tone =
    variant === 'dark'
      ? 'h-9 bg-ink text-white text-[13px]'
      : 'h-12 border-y border-[#E5E5E7] bg-canvas text-ink text-[15px] md:h-14';

  return (
    <div role="status" aria-live="off" className={`flex items-center justify-center ${tone} ${className}`}>
      {remaining === null ? null : remaining.done ? (
        <span>The full website is launching now</span>
      ) : (
        <span>
          The full website launches in{' '}
          <span className="tnum">
            {remaining.days}d {pad(remaining.hours)}h {pad(remaining.minutes)}m {pad(remaining.seconds)}s
          </span>
        </span>
      )}
    </div>
  );
}
