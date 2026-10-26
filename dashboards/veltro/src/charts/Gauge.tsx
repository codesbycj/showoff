import { arcPath } from '@/charts/path';

/**
 * Sales Performance: a half-ring, read clockwise from nine o'clock.
 *
 * Two arcs rather than three, as the reference draws them — a filled share
 * over a track — and the figure in the middle is that share, so the ring and
 * the number cannot disagree.
 */
export function Gauge({
  pct,
  size = 190,
  thickness = 22,
  label,
}: {
  pct: number;
  size?: number;
  thickness?: number;
  label: string;
}) {
  const c = size / 2;
  const rOuter = size / 2;
  const rInner = rOuter - thickness;
  const sweep = 180;
  const from = -90;
  const end = from + (Math.max(0, Math.min(100, pct)) / 100) * sweep;

  return (
    <svg
      width={size}
      height={size / 2 + 4}
      viewBox={`0 0 ${size} ${size / 2 + 4}`}
      role="img"
      aria-label={label}
      className="mx-auto"
    >
      <path
        d={arcPath(c, c, rOuter, rInner, from, from + sweep)}
        fill="var(--color-accent-faint)"
      />
      <path d={arcPath(c, c, rOuter, rInner, from, end)} fill="var(--color-accent)" />
    </svg>
  );
}
