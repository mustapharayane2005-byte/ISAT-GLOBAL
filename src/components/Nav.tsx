'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { List, X } from '@phosphor-icons/react/dist/ssr';
import { DURATION, EASE, usePrefersReducedMotion } from '@/lib/motion';

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

/** Logo is 252 x 318, so a 36px cap height gives a 28.5px width. Never stretched. */
const LOGO_HEIGHT = 36;
const LOGO_WIDTH = Math.round((252 / 318) * LOGO_HEIGHT);

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = usePrefersReducedMotion();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline/60 bg-white/72 backdrop-blur-xl backdrop-saturate-150 supports-[not(backdrop-filter:blur(0))]:bg-white">
      <nav aria-label="Main" className="shell flex h-[52px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="iSAT home">
          <Image
            src="/images/logo-isat.png"
            alt="iSAT"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={activeId === link.id ? 'true' : undefined}
                className={`nav-link text-nav ${activeId === link.id ? 'text-[#D6181F]' : 'text-ink'}`}
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
            transition={{ duration: DURATION.quick, ease: EASE }}
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
    </header>
  );
}
