import type { Stat } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';

const TONES: Record<Stat['tone'], { rest: string; active: string }> = {
  line: { rest: 'var(--color-line)', active: 'var(--color-muted)' },
  accent: { rest: 'var(--color-accent)', active: 'var(--color-accent)' },
  ink: { rest: 'var(--color-ink)', active: 'var(--color-ink)' },
};

/**
 * The barcode strip under a proposal figure: one thin bar per day of the last
 * 26, its height the day's share of the period's busiest.
 *
 * Drawn from the deck's own seeded numbers, so it is a chart rather than a
 * decoration -- switching the date pill above gives it a different shape
 * because it is different data, not a different random draw.
 */
export function ProposalStrip({ stat, active }: { stat: Stat; active: boolean }) {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const tone = TONES[stat.tone];
  const n = stat.strip.length;
  const gap = 3;
  const barW = n > 0 ? Math.max(1.5, (size.w - gap * (n - 1)) / n) : 0;

  return (
    <div ref={ref} className="h-[72px] w-full">
      {size.w > 0 ? (
        <svg
          width={size.w}
          height={72}
          viewBox={'0 0 ' + size.w + ' 72'}
          role="img"
          aria-label={stat.label + ' over the last 26 days'}
        >
          {stat.strip.map((v, i) => {
            const h = Math.max(4, v * 72);
            return (
              <rect
                key={i}
                data-mark={stat.id + '-' + i}
                x={i * (barW + gap)}
                y={72 - h}
                width={barW}
                height={h}
                rx={barW / 2}
                fill={active ? tone.active : tone.rest}
                opacity={active ? 1 : stat.tone === 'line' ? 1 : 0.42}
                className="transition-[opacity,fill] duration-200"
              />
            );
          })}
        </svg>
      ) : null}
    </div>
  );
}
