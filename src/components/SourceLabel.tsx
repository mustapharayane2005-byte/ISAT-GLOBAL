const PUNCH = 'The Punch';

// The logo file has wide white margins, so it is cropped to the wordmark with
// background sizing: 24px tall shows the 705 x 195 px region at (155, 275).
const LOGO_H = 24;
const SCALE = LOGO_H / 195;

/** Article source. "The Punch" is shown as its logo; any remainder (", page 25") stays as text. */
export function SourceLabel({ source }: { source: string }) {
  if (!source.startsWith(PUNCH)) return <>{source}</>;
  const rest = source.slice(PUNCH.length).replace(/^[\s,]+/, '');

  return (
    <span className="inline-flex items-center gap-2 align-middle">
      <span
        role="img"
        aria-label={PUNCH}
        className="inline-block shrink-0"
        style={{
          height: LOGO_H,
          width: Math.round(705 * SCALE),
          backgroundImage: 'url(/images/Punch-New-Logo-1024x768.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${1024 * SCALE}px ${768 * SCALE}px`,
          backgroundPosition: `${-155 * SCALE}px ${-275 * SCALE}px`,
        }}
      />
      {rest ? <span>{rest}</span> : null}
    </span>
  );
}
