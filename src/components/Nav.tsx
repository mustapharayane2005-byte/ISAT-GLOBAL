'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { EASE, usePrefersReducedMotion } from '@/lib/motion';

const LINKS = [
  { label: '5G', href: '/#five-g', id: 'five-g' },
  { label: 'Coverage', href: '/#coverage', id: 'coverage' },
  { label: 'iSAT One', href: '/#isat-one', id: 'isat-one' },
  { label: 'Impact', href: '/#impact', id: 'impact' },
];

// Stable module-level reference, so the observer effect below doesn't tear
// down and re-run on every render the way a freshly-mapped array inline would.
const SECTION_IDS = LINKS.map((link) => link.id);

/**
 * Tracks whichever linked section currently sits across the vertical centre
 * of the viewport, so the nav can mark it active. Starts at null on both
 * server and first client paint, exactly like the other client-only hooks in
 * this file, so there's nothing for hydration to disagree about.
 */
function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

/**
 * Matches the md: breakpoint (768px). Only desktop gets the scroll-shrink
 * treatment; mobile stays at its own fixed size regardless of scroll
 * position. Starts false on both server and first client paint, settling
 * a tick later via matchMedia, the same pattern as the other hooks here.
 */
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

// Bar and logo heights, resting (top of page) vs after a 40px scroll. Mobile
// ignores the scroll state entirely and always uses its own fixed size.
const BAR_HEIGHT = { top: 96, scrolled: 72 };
const LOGO_HEIGHT = { top: 68, scrolled: 52 };
const MOBILE_BAR_HEIGHT = 68;
const MOBILE_LOGO_HEIGHT = 48;
const SCROLL_THRESHOLD = 40;
const SIZE_TRANSITION = { duration: 0.3, ease: EASE };

/** Logo file is 252 x 318 (portrait). Width always derives from height at that ratio, so it is never stretched. */
const LOGO_RATIO = 252 / 318;

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = usePrefersReducedMotion();
  const activeId = useActiveSection(SECTION_IDS);
  const isDesktop = useIsDesktop();
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  const barHeight = isDesktop ? (scrolled ? BAR_HEIGHT.scrolled : BAR_HEIGHT.top) : MOBILE_BAR_HEIGHT;
  const logoHeight = isDesktop ? (scrolled ? LOGO_HEIGHT.scrolled : LOGO_HEIGHT.top) : MOBILE_LOGO_HEIGHT;
  const logoWidth = Math.round(logoHeight * LOGO_RATIO);
  const sizeTransition = reduce ? { duration: 0 } : SIZE_TRANSITION;

  return (
    <>
      <motion.header
        animate={{ height: barHeight }}
        transition={sizeTransition}
        className="fixed inset-x-0 top-0 z-50 w-full border-b border-hairline/60 bg-white/72 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white"
      >
        <nav aria-label="Main" className="shell flex h-full items-center justify-between gap-8">
          <Link
            href="/"
            onClick={() => {
              // Everything lives under this one route, so Next's own
              // navigation is a no-op here; do the "back to top" behaviour
              // directly, respecting the visitor's motion preference.
              window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            }}
            className="flex shrink-0 items-center"
            aria-label="iSAT home"
          >
            <motion.span
              animate={{ height: logoHeight, width: logoWidth }}
              transition={sizeTransition}
              className="relative block"
            >
              <Image
                src="/images/logo-isat.png"
                alt="iSAT"
                fill
                sizes={`${Math.ceil(LOGO_HEIGHT.top * LOGO_RATIO)}px`}
                priority
                className="object-contain"
              />
            </motion.span>
          </Link>

          <ul className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={`nav-link text-[15px] ${activeId === link.id ? 'text-[#D6181F]' : 'text-ink'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="hidden rounded-pill bg-accent-strong px-4 py-2 text-nav font-medium text-white transition-colors duration-200 ease-apple hover:bg-accent-press active:scale-[0.98] md:inline-flex"
            >
              Contact us
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-pill text-ink md:hidden"
            >
              {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id="mobile-nav"
              key="mobile-nav"
              initial={reduce ? false : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={sizeTransition}
              className="overflow-hidden border-t border-hairline/60 bg-white/95 backdrop-blur-xl md:hidden"
            >
              <ul className="shell flex flex-col gap-1 py-4">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={activeId === link.id ? 'true' : undefined}
                      className={`nav-link block py-3 text-lead font-medium ${
                        activeId === link.id ? 'text-[#D6181F]' : 'text-ink'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex rounded-pill bg-accent-strong px-5 py-2.5 text-body font-medium text-white"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.header>

      {/* Constant-height spacer: the header is fixed (floats, does not push
          layout), so without this everything would render underneath it.
          A fixed height here, matching the larger resting size, is what
          actually guarantees zero layout shift as the header itself
          animates smaller on scroll: nothing below it ever moves, because
          this element's own height never changes. */}
      <div aria-hidden className="h-[68px] md:h-24" />
    </>
  );
}
