type SectionProps = {
  id?: string;
  /** Surface the section sits on. The page is white; grey and black are the exceptions. */
  tone?: 'canvas' | 'surface' | 'night';
  /** Tight trims the vertical rhythm for sections that follow a full-bleed photo. */
  rhythm?: 'default' | 'tight';
  /** Full-bleed sections manage their own horizontal padding. */
  bleed?: boolean;
  className?: string;
  children: React.ReactNode;
};

const TONE: Record<NonNullable<SectionProps['tone']>, string> = {
  canvas: 'bg-canvas text-ink',
  surface: 'bg-surface text-ink',
  night: 'bg-night text-white',
};

export function Section({
  id,
  tone = 'canvas',
  rhythm = 'default',
  bleed = false,
  className = '',
  children,
}: SectionProps) {
  const padding = rhythm === 'tight' ? 'py-section-tight' : 'py-section';
  return (
    <section id={id} className={`${TONE[tone]} ${padding} ${className}`}>
      {bleed ? children : <div className="shell">{children}</div>}
    </section>
  );
}

/** Centred heading block. Keeps every section header on the same rhythm. */
export function SectionHead({
  kicker,
  title,
  lead,
  tone = 'light',
  className = '',
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <header className={`mx-auto max-w-measure-head text-center ${className}`}>
      {kicker}
      <h2 className="text-headline text-balance">{title}</h2>
      {lead ? (
        <p
          className={`mx-auto mt-6 max-w-measure text-lead ${
            tone === 'dark' ? 'text-night-muted' : 'text-ink-muted'
          }`}
        >
          {lead}
        </p>
      ) : null}
    </header>
  );
}
