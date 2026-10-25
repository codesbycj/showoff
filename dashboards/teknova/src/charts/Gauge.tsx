/**
 * The sales-goal gauge: a half ring of separate tapered segments, filled up to
 * the goal.
 *
 * Each segment is one rounded rect rotated about the gauge's centre, rather
 * than an arc path. At this size the segments are nearly straight, a rect reads
 * identically, and rotating a rect keeps the rounded ends square to the ring
 * instead of smearing them along the curve.
 */
export function Gauge({
  value,
  size = 230,
  segments = 13,
  label = 'Sales Goal',
}: {
  /** 0-100. */
  value: number;
  size?: number;
  segments?: number;
  label?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const outer = size / 2 - 4;
  const len = size * 0.155; // segment length, outward from the ring
  const w = size * 0.062;
  const lit = Math.round((Math.max(0, Math.min(100, value)) / 100) * segments);

  // The ring runs from -100deg to +100deg, so it opens slightly past the
  // horizontal the way the reference's does.
  const SPAN = 200;
  const step = SPAN / (segments - 1);

  return (
    <svg
      width={size}
      height={size * 0.68}
      viewBox={'0 0 ' + size + ' ' + size * 0.68}
      role="img"
      aria-label={label + ': ' + value + ' per cent'}
    >
      {Array.from({ length: segments }, (_, i) => {
        const angle = -SPAN / 2 + i * step;
        const on = i < lit;
        return (
          <rect
            key={i}
            x={cx - w / 2}
            y={cy - outer}
            width={w}
            height={len}
            rx={w / 2}
            fill={on ? 'var(--color-accent)' : 'var(--color-sunken-deep)'}
            opacity={on ? 1 - (i / segments) * 0.35 : 1}
            transform={'rotate(' + angle + ' ' + cx + ' ' + cy + ')'}
            className="transition-[fill,opacity] duration-300"
          />
        );
      })}

      <text
        x="50%"
        y={cy + 2}
        textAnchor="middle"
        className="fill-ink text-[40px] font-extrabold tracking-[-0.04em]"
      >
        {value}%
      </text>
      <text
        x="50%"
        y={cy + 26}
        textAnchor="middle"
        className="fill-muted text-[12.5px] font-semibold"
      >
        {label}
      </text>
    </svg>
  );
}
