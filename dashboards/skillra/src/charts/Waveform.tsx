import { r3 } from '@/charts/scale';

/**
 * A lesson's waveform, with how far through it the learner has got.
 *
 * Drawn rather than photographed, and it carries a position the reference's
 * does not: its player prints "02:35" with no total beside it and a static
 * shape that never moves.
 */
export function Waveform({
  bars,
  played = 0,
  label,
  w = 320,
  h = 40,
}: {
  bars: number[];
  /** 0–1, how much of it has been heard. */
  played?: number;
  label: string;
  w?: number;
  h?: number;
}) {
  const gap = 2;
  const barW = Math.max(1.5, (w - gap * (bars.length - 1)) / bars.length);
  const cut = played * bars.length;

  return (
    <svg width={w} height={h} role="img" aria-label={label} className="shrink-0">
      {bars.map((v, i) => {
        const bh = Math.max(2, v * (h - 4));
        return (
          <rect
            key={i}
            x={r3(i * (barW + gap))}
            y={r3((h - bh) / 2)}
            width={r3(barW)}
            height={r3(bh)}
            rx={r3(Math.min(1.5, barW / 2))}
            fill={i < cut ? 'var(--color-ink)' : 'var(--color-sunken-deep)'}
          />
        );
      })}
    </svg>
  );
}
