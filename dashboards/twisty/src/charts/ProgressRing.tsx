/**
 * A progress ring, drawn as one stroked arc.
 *
 * `strokeDasharray` with a dash the length of the arc and a gap the length of
 * the rest is the whole trick: no path maths, and it animates from any value to
 * any other without the join moving.
 */
export function ProgressRing({
  value,
  size = 128,
  width = 10,
  label,
}: {
  /** 0-100. */
  value: number;
  size?: number;
  width?: number;
  label?: string;
}) {
  const r = (size - width) / 2;
  const c = 2 * Math.PI * r;
  const done = Math.max(0, Math.min(100, value)) / 100;

  return (
    <svg
      width={size}
      height={size}
      viewBox={'0 0 ' + size + ' ' + size}
      role="img"
      aria-label={(label ? label + ': ' : '') + Math.round(value) + '% complete'}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-sunken)"
        strokeWidth={width}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={done === 1 ? 'var(--color-positive)' : 'var(--color-ink)'}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={c * done + ' ' + c * (1 - done)}
        transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'}
        className="transition-[stroke-dasharray,stroke] duration-500 ease-out"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-ink text-[24px] font-semibold tracking-[-0.03em]"
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}
