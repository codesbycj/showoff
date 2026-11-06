import { r3 } from '@/charts/scale';

/**
 * A recording's waveform, with how far through it this account has got.
 *
 * This is what replaces the reference's video thumbnails. Its tiles are
 * frames of surgical footage captioned with a real hospital and a real
 * microscope — a photograph of a thing is out of drawing range (rule 8), and
 * the caption could not stay either. What a workspace's recording list
 * actually needs is how long a recording is and where the talking happens,
 * and that is interface.
 */
export function Waveform({
  bars,
  played = 0,
  label,
  w = 220,
  h = 34,
}: {
  bars: number[];
  /** 0–1, how much of it has been watched. */
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
            fill={i < cut ? 'var(--color-accent-deep)' : 'var(--color-accent-soft)'}
          />
        );
      })}
    </svg>
  );
}
