import { scoreTicks } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The payment-score meter: a row of thin ticks, lit up to the score.
 *
 * The tick heights vary slightly, seeded off the score, so it reads as a meter
 * rather than a progress bar — which is the reference's own treatment. The
 * number beside it is the same value, so the bar never has to be read alone.
 */
export function ScoreMeter({ score, label = 'Payment Score' }: { score: number; label?: string }) {
  const ticks = scoreTicks(score);
  const lit = Math.round((score / 100) * ticks.length);

  return (
    <div className="bg-raised flex items-center gap-3 rounded-full px-3.5 py-2.5">
      <span className="text-muted shrink-0 text-[12px] font-medium">{label}</span>
      <span
        role="img"
        aria-label={label + ': ' + score + ' out of 100'}
        className="flex h-5 min-w-0 flex-1 items-end gap-[2px]"
      >
        {ticks.map((t, i) => (
          <span
            key={i}
            style={{ height: Math.round(t * 20) }}
            className={cx(
              'block flex-1 rounded-full transition-colors duration-300',
              i < lit ? 'bg-cat-office' : 'bg-sunken-deep',
            )}
          />
        ))}
      </span>
      <span className="text-ink shrink-0 text-[13px] font-semibold">{score}</span>
    </div>
  );
}
