import Image from 'next/image';
import { BLUR_DATA_URL, photoSrc, type PhotoRatio } from '@/lib/photos';

type PhotoSlotProps = {
  /** Matches the file name in public/images, e.g. "hero" reads hero.webp. */
  id: string;
  ratio?: PhotoRatio;
  /** Describes the photo to shoot. Shown inside the frame while the slot is empty. */
  caption: string;
  priority?: boolean;
  sizes?: string;
  /** Tunes the empty frame to the section it sits on. */
  tone?: 'light' | 'muted' | 'dark';
  /** Where the subject sits in the source photo, as a CSS object-position value. Keeps faces in frame when the crop is severe. */
  objectPosition?: string;
  className?: string;
};

const RATIO_CLASS: Record<PhotoRatio, string> = {
  '21/9': 'aspect-[21/9]',
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  // 16:9 source, cropped to 21:9 on desktop and 4:3 on mobile.
  banner: 'aspect-[4/3] md:aspect-[21/9]',
};

export function PhotoSlot({
  id,
  ratio = '16/9',
  caption,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 1120px',
  tone = 'light',
  objectPosition = '50% 50%',
  className = '',
}: PhotoSlotProps) {
  const src = photoSrc(id);
  // photo-frame/.photo-zoom (see globals.css) put the hover/focus zoom on the
  // <img> alone. The frame never moves, and neither does any Framer-driven
  // wrapper (parallax drift, carousel scale) a caller nests this inside,
  // because that wrapper is always a different element than the <img> itself.
  const frame = `photo-frame relative w-full overflow-hidden rounded-frame ${RATIO_CLASS[ratio]} ${className}`;

  if (src) {
    return (
      <div className={frame}>
        <Image
          src={src}
          alt={caption}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          className="photo-zoom object-cover"
          style={{ objectPosition }}
        />
      </div>
    );
  }

  const surface = {
    light: 'bg-surface text-ink-muted-strong',
    muted: 'bg-[#E8E8ED] text-ink-muted-strong',
    dark: 'bg-[#141416] text-night-muted',
  }[tone];

  return (
    <div className={`${frame} ${surface} flex items-center justify-center`} role="img" aria-label={caption}>
      <p className="max-w-measure px-8 text-center text-caption">{caption}</p>
    </div>
  );
}
