import { r3 } from '@/charts/scale';

/**
 * The four counters at the top of the shift.
 *
 * A ring rather than a bar because the reference uses one and because each of
 * these is a share of the same ward: the gap says what is *not* in this
 * category, which a bar on its own does not.
 */
export function Ring({
  value,
  total,
  label,
  tone = 'accent',
  size = 54,
}: {
  value: number;
  total: number;
  label: string;
  tone?: 'accent' | 'band-low' | 'band-mid' | 'band-high';
  size?: number;
}) {
  const stroke = 5;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const share = total > 0 ? Math.min(1, value / total) : 0;
  const colour = `var(--color-${tone})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={label}
      className="shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r3(r)}
        fill="none"
        stroke="var(--color-sunken-deep)"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r3(r)}
        fill="none"
        stroke={colour}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${r3(c * share)} ${r3(c)}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-[stroke-dasharray] duration-500"
      />
    </svg>
  );
}
