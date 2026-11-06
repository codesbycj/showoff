/**
 * A quota ring — the reference's "target completion" dial.
 *
 * Drawn with a stroke-dasharray over a track, which is the cheap way and the
 * right one: no path maths, and the arc is exactly the percentage. The ring
 * is `aria-hidden` because the row beside it states the figure in words; a
 * dial that repeats its own label is decoration for a screen reader.
 *
 * **The colour is the band, not the brand.** Under 50% of quota is the danger
 * red, under 80% the warning amber, at or over it the positive green — so a
 * row can be read at a glance without comparing numbers.
 */
export function Ring({
  value,
  size = 46,
  thickness = 5,
}: {
  /** Percent of quota. Over 100 is allowed and draws a full ring. */
  value: number;
  size?: number;
  thickness?: number;
}) {
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const colour =
    value >= 100
      ? 'var(--color-positive)'
      : value >= 80
        ? 'var(--color-accent-deep)'
        : value >= 50
          ? 'var(--color-warn)'
          : 'var(--color-danger)';

  return (
    <span
      className="relative inline-grid shrink-0 place-items-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} aria-hidden="true" focusable="false" className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-sunken-deep)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colour}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
        />
      </svg>
      <span className="tnum text-ink absolute text-[11px] font-bold" style={{ color: colour }}>
        {Math.round(value)}%
      </span>
    </span>
  );
}
