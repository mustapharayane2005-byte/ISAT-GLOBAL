'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CaretRight } from '@phosphor-icons/react/dist/ssr';
import { EASE, usePrefersReducedMotion } from '@/lib/motion';

const HEADLINE_TRANSITION = { duration: 0.9, ease: EASE };
const CASCADE_TRANSITION = { duration: 0.7, ease: EASE };
const INSTANT = { duration: 0 };

// Each headline line rises 24px and its blur dissolves as it appears. Line 2
// starts 0.2s after line 1, matching the request precisely rather than the
// page's usual stagger container, because the two lines needed independent delays.
const lineVariants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(12px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

/**
 * The clip plays everywhere, including mobile, since it's a light ~2.5MB
 * file. The only visitors who get the poster alone are those who've asked
 * for reduced motion; that's the one case worth reading as a real
 * preference rather than a device-capability guess.
 */
function useVideoBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mqMotion.matches);
    update();
    mqMotion.addEventListener('change', update);
    return () => mqMotion.removeEventListener('change', update);
  }, []);

  return enabled;
}

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const videoEnabled = useVideoBackground();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // The source clip reads a touch fast behind static text; a mild slowdown
    // keeps it from fighting the headline for attention.
    video.playbackRate = 0.85;
    // Belt-and-suspenders for iOS: the muted attribute alone doesn't always
    // satisfy Safari's autoplay policy, so it's set as a JS property too.
    video.muted = true;
    // Autoplay can still be refused (iOS Low Power Mode, Android data saver).
    // That's a normal, expected outcome here, not a bug: the poster attribute
    // is already the right fallback frame, so a rejection just means nothing
    // further happens, with no console error and no visible break.
    video.play().catch(() => {});
  }, [videoEnabled]);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden py-32 md:py-40">
      <div className="absolute inset-0 -z-20 bg-canvas" />

      {videoEnabled ? (
        <video
          ref={videoRef}
          // The bright core the clip radiates from sits dead centre in the
          // source, which is also where the headline sits on a tall mobile
          // frame; desktop reverts to plain centring once the crop is wide
          // enough that there's nothing to tune.
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_42%] mix-blend-multiply md:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.webp"
          aria-hidden="true"
        >
          <source src="/videos/hero-flow.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/images/hero-poster.webp"
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          aria-hidden
          className="absolute inset-0 -z-20 object-cover object-[50%_42%] mix-blend-multiply md:object-center"
        />
      )}

      {/* Extra flat veil, mobile only: the hero runs the full viewport height
          there, so more of the clip is visible behind a narrower measure of
          text than on desktop. The halo below already carries desktop. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-white/60 md:hidden" />

      {/* Soft white halo behind the headline only, so the clip stays visible at
          the edges of the frame while the text keeps AA contrast at the centre. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[62vh] w-[94vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.94),rgba(255,255,255,0.55)_65%,rgba(255,255,255,0)_100%)]"
      />

      <div className="shell relative text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[1100px] px-5 text-ink"
        >
          <span className="block overflow-hidden pb-[0.15em] leading-[1.08]">
            <motion.span
              variants={lineVariants}
              transition={reduce ? INSTANT : { ...HEADLINE_TRANSITION, delay: 0 }}
              className="block whitespace-nowrap text-[clamp(4.5rem,11vw,10.5rem)] font-bold leading-[1.02] tracking-[-0.04em]"
            >
              ISAT
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.15em] leading-[1.08]">
            <motion.span
              variants={lineVariants}
              transition={reduce ? INSTANT : { ...HEADLINE_TRANSITION, delay: 0.2 }}
              style={{ textWrap: 'balance' } as React.CSSProperties}
              className="block bg-gradient-to-r from-[#F83A04] to-[#D6181F] bg-clip-text pb-[0.1em] text-[clamp(2rem,5vw,4.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-transparent [hyphens:none] [overflow-wrap:normal]"
            >
              Connecting Africa to What&rsquo;s Next.
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={reduce ? INSTANT : { ...CASCADE_TRANSITION, delay: 0.65 }}
          className="mx-auto mt-6 max-w-[820px] px-5 text-lead text-ink-muted"
        >
          ISAT is a digital infrastructure and services company building intelligent connectivity
          for people, businesses and communities across Africa.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={reduce ? INSTANT : { ...CASCADE_TRANSITION, delay: 0.85 }}
          className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Link
            href="/about"
            className="inline-flex items-center rounded-pill bg-accent-strong px-7 py-3 text-body font-medium text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-press active:scale-[0.98]"
          >
            About ISAT
          </Link>
          <Link
            href="#isat-one"
            className="group inline-flex items-center gap-1 text-body font-medium text-accent-strong"
          >
            Explore ISAT ONE
            <CaretRight
              size={14}
              weight="bold"
              className="mt-px transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduce ? 0 : 0.08, delayChildren: reduce ? 0 : 0.95 },
            },
          }}
          className="mx-auto mt-10 grid max-w-xs grid-cols-2 gap-[14px] sm:flex sm:max-w-none sm:flex-wrap sm:justify-center"
        >
          {['5G & Broadband', 'Satellite', 'Cloud & AI', 'Enterprise Data center'].map((item) => (
            <motion.li
              key={item}
              variants={fadeUp}
              transition={reduce ? INSTANT : CASCADE_TRANSITION}
              className={`flex items-center justify-center gap-2 rounded-pill border border-[#E5E5E7] bg-white px-5 py-3 text-[16px] font-semibold text-ink shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-[transform,border-color] duration-[250ms] sm:px-[26px] sm:py-[14px] sm:text-[18px] ${
                reduce ? '' : 'md:hover:-translate-y-0.5 md:hover:border-[#D6181F]'
              }`}
            >
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
