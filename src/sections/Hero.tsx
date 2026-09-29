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
 * The clip plays only where it can be read well: desktop viewports, with no
 * reduced-motion preference. Everywhere else the poster frame alone carries
 * the hero, and no <video> tag is rendered, so nothing is fetched for it.
 */
function useVideoBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqWidth = window.matchMedia('(min-width: 768px)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const update = () => setEnabled(mqWidth.matches && mqMotion.matches);
    update();
    mqWidth.addEventListener('change', update);
    mqMotion.addEventListener('change', update);
    return () => {
      mqWidth.removeEventListener('change', update);
      mqMotion.removeEventListener('change', update);
    };
  }, []);

  return enabled;
}

export function Hero() {
  const reduce = usePrefersReducedMotion();
  const videoEnabled = useVideoBackground();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // The source clip reads a touch fast behind static text; a mild slowdown
    // keeps it from fighting the headline for attention.
    if (videoRef.current) videoRef.current.playbackRate = 0.85;
  }, [videoEnabled]);

  return (
    <section className="relative isolate flex min-h-[100dvh] items-center justify-center overflow-hidden py-28">
      <div className="absolute inset-0 -z-20 bg-canvas" />

      {videoEnabled ? (
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 h-full w-full object-cover mix-blend-multiply"
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
          className="absolute inset-0 -z-20 object-cover mix-blend-multiply"
        />
      )}

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
          className="mx-auto max-w-[16ch] text-display text-balance text-ink"
        >
          <motion.span
            variants={lineVariants}
            transition={reduce ? INSTANT : { ...HEADLINE_TRANSITION, delay: 0 }}
            className="block"
          >
            iSAT 5G.
          </motion.span>
          <motion.span
            variants={lineVariants}
            transition={reduce ? INSTANT : { ...HEADLINE_TRANSITION, delay: 0.2 }}
            className="block bg-gradient-to-r from-[#F83A04] to-[#D6181F] bg-clip-text text-transparent"
          >
            Be free.
          </motion.span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={reduce ? INSTANT : { ...CASCADE_TRANSITION, delay: 0.65 }}
          className="mx-auto mt-7 max-w-measure-lead text-lead text-ink-muted"
        >
          Fibre, cloud and AI infrastructure for every Nigerian.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={reduce ? INSTANT : { ...CASCADE_TRANSITION, delay: 0.85 }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Link
            href="#five-g"
            className="inline-flex items-center rounded-pill bg-accent-strong px-7 py-3 text-body font-medium text-white transition-[background-color,transform] duration-200 ease-apple hover:bg-accent-press active:scale-[0.98]"
          >
            Discover 5G
          </Link>
          <Link
            href="#isat-one"
            className="group inline-flex items-center gap-1 text-body font-medium text-accent-strong"
          >
            Explore iSAT One
            <CaretRight
              size={14}
              weight="bold"
              className="mt-px transition-transform duration-300 ease-apple group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
