import { linePath, type Pt } from '@/charts/path';
import { scale } from '@/charts/scale';

/**
 * Five earlier scores beside the current one.
 *
 * A single score is a snapshot; the thing that decides whether to escalate is
 * which way it is going. The line is coloured by that direction, not by the
 * band — a patient at 3 and climbing is the one to look at before a patient
 * at 5 and falling.
 */
export function ScoreSpark({
  values,
  label,
  w = 62,
  h = 24,
}: {
  values: number[];
  label: string;
  w?: number;
  h?: number;
}) {
  /* A fixed 0–12 domain, so two rows can be compared. A per-row domain makes
     a patient who moved 0 to 1 look like one who moved 2 to 10. */
  const y = scale([0, 12], [h - 2, 2]);
  const pts: Pt[] = values.map((v, i) => ({ x: (i / (values.length - 1)) * (w - 2) + 1, y: y(v) }));
  const rising = values[values.length - 1] > values[0];
  const flat = values[values.length - 1] === values[0];

  return (
    <svg width={w} height={h} role="img" aria-label={label} className="shrink-0">
      <path
        d={linePath(pts)}
        fill="none"
        stroke={
          flat ? 'var(--color-muted)' : rising ? 'var(--color-danger)' : 'var(--color-positive)'
        }
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
