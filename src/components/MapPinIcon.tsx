type MapPinIconProps = {
  className?: string;
};

/**
 * Inline outline pin, matched to the Lucide map-pin path so the stroke weight
 * (1.75) is exact rather than approximated by a weight variant from the
 * project's icon library. Purely decorative: always aria-hidden, the city
 * name next to it carries the meaning.
 */
export function MapPinIcon({ className }: MapPinIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
