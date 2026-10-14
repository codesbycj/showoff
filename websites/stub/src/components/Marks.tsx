/**
 * The printer's furniture on the back of a ticket: a block mark, a registration
 * crosshair, the feed arrows and the bullets on the face.
 *
 * All drawn as paths. None of it is an emoji or an icon font — the glyphs that
 * would stand in for these differ across platforms, and a registration mark
 * that renders as a dingbat on one machine is worse than no mark at all.
 */
import { useMemo } from 'react';

import { rng, seedFrom } from '@/lib/hash';

/** A 7x7 block mark, in the spirit of a datamatrix without pretending to be one. */
export function BlockMark({ seed, className }: { seed: string; className?: string }) {
  const cells = useMemo(() => {
    const next = rng(seedFrom(seed));
    const out: [number, number][] = [];
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < 7; x++) {
        // A solid left column and bottom row, like a real finder pattern, with
        // the rest of the field seeded. Without them it reads as noise.
        if (x === 0 || y === 6 || next() > 0.5) out.push([x, y]);
      }
    }
    return out;
  }, [seed]);

  return (
    <svg viewBox="0 0 7 7" aria-hidden="true" className={className}>
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill="currentColor" />
      ))}
    </svg>
  );
}

/** Registration crosshair — a ring with four ticks through it. */
export function Crosshair({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 1v8M12 15v8M1 12h8M15 12h8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Three chevrons, pointing the way the ticket feeds through. */
export function FeedArrows({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 10" aria-hidden="true" className={className}>
      <path
        d="M1 1l3.5 4L1 9M9 1l3.5 4L9 9M17 1l3.5 4L17 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * The bullet beside a line in the includes list. The first is a diamond and the
 * rest are discs, which is the reference's own pattern and reads as a key
 * rather than as three identical dots.
 */
export function ListBullet({ index, className }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className={className}>
      {index === 0 ? (
        <path d="M5 0l5 5-5 5-5-5z" fill="currentColor" />
      ) : (
        <circle cx="5" cy="5" r="4" fill="currentColor" />
      )}
    </svg>
  );
}
