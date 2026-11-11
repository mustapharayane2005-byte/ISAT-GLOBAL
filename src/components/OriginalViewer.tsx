'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from '@phosphor-icons/react/dist/ssr';
import { usePrefersReducedMotion } from '@/lib/motion';

/** "View original publication": opens the article image full screen. */
export function OriginalViewer({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-body font-medium text-[#C62C02] underline-offset-4 hover:underline"
      >
        View original publication
      </button>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/90"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-pill bg-white text-ink"
            >
              <X size={22} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto block w-full max-w-[900px] bg-white"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
