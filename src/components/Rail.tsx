'use client';

import { useRef, type RefObject } from 'react';
import { motion, useInView } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { IconTile } from '@/components/IconTile';
import { PhotoSlot } from '@/components/PhotoSlot';
import { EASE, usePrefersReducedMotion } from '@/lib/motion';
import { photoSrc } from '@/lib/photos';

export type RailItem = {
  id: string;
  title: string;
  body: string;
  caption: string;
  /** The photo's own title (e.g. "Farms that see."), shown as a caption on the tile itself. */
  photoTitle: string;
  objectPosition?: string;
  icon?: LucideIcon;
};

function RailCard({
  item,
  scroller,
}: {
  item: RailItem;
  scroller: RefObject<HTMLDivElement | null>;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = usePrefersReducedMotion();
  // Receding is a photographic effect. An empty slot shows its caption as text,
  // which must stay at full contrast, so only real photos get dimmed.
  const hasPhoto = Boolean(photoSrc(item.id));
  // Fires only while the card overlaps the middle strip of the rail, which is
  // how the centred card knows to come forward.
  const centred = useInView(ref, {
    root: scroller as RefObject<Element>,
    margin: '0px -42% 0px -42%',
    amount: 0,
  });

  return (
    <motion.li
      ref={ref}
      tabIndex={0}
      role="group"
      aria-label={item.title}
      animate={{ scale: reduce ? 1 : centred ? 1 : 0.955 }}
      transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      className="tile-focus w-[78vw] max-w-[380px] shrink-0 snap-center sm:w-[360px]"
    >
      <motion.div
        className="relative"
        animate={{ opacity: reduce || !hasPhoto ? 1 : centred ? 1 : 0.62 }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      >
        <PhotoSlot
          id={item.id}
          ratio="3/4"
          caption={item.caption}
          sizes="(max-width: 640px) 78vw, 360px"
          objectPosition={item.objectPosition}
        />
        {hasPhoto ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-frame bg-gradient-to-t from-black/70 via-black/25 to-transparent px-5 pb-4 pt-14"
          >
            <p className="text-body font-medium text-white">{item.photoTitle}</p>
          </div>
        ) : null}
      </motion.div>
      {item.icon ? <IconTile icon={item.icon} className="-mb-1 mt-5" /> : null}
      <h3 className="mt-5 text-body font-semibold">{item.title}</h3>
      <p className="mt-2 text-body text-ink-muted">{item.body}</p>
    </motion.li>
  );
}

export function Rail({ items, ariaLabel }: { items: RailItem[]; ariaLabel: string }) {
  const scroller = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scroller}
      tabIndex={0}
      role="region"
      aria-label={ariaLabel}
      className="-mx-6 overflow-x-auto overscroll-x-contain scroll-smooth px-6 pb-4 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex snap-x snap-mandatory gap-5 md:gap-6">
        {items.map((item) => (
          <RailCard key={item.id} item={item} scroller={scroller} />
        ))}
        {/* Trailing spacer lets the last card reach the centre of the rail. */}
        <li aria-hidden className="w-[8vw] shrink-0 sm:w-[25%]" />
      </ul>
    </div>
  );
}
