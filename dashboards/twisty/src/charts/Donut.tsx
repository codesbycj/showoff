import { arcPath } from '@/charts/path';
import type { Slice } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * The income mix.
 *
 * Every segment is `arcPath` from the shared chart maths, so the geometry comes
 * out of the deck: change a figure and the ring redraws. The active segment is
 * drawn at a slightly larger radius rather than translated outward -- pushing a
 * segment along its bisector opens a wedge-shaped gap against its neighbours,
 * which looks like a rendering fault at small sizes.
 */
export function Donut({
  slices,
  size = 200,
  thickness = 30,
  active,
  onHover,
}: {
  slices: Slice[];
  size?: number;
  thickness?: number;
  active: number | null;
  onHover: (index: number | null) => void;
}) {
  const total = slices.reduce((t, s) => t + s.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2 - 4;
  const rInner = rOuter - thickness;
  const GAP = 2.2; // degrees between segments

  // Each segment's start angle, accumulated up front. Doing this by mutating a
  // running total from inside the map callback is a closure over a
  // render-scoped variable, which the React compiler rejects outright.
  const starts: number[] = [];
  let acc = 0;
  for (const slice of slices) {
    starts.push(acc);
    acc += (slice.value / total) * 360;
  }

  const segments = slices.map((slice, i) => {
    const sweep = (slice.value / total) * 360;
    const a0 = starts[i] + GAP / 2;
    const a1 = starts[i] + sweep - GAP / 2;
    const on = active === i;
    return {
      slice,
      i,
      d: arcPath(
        cx,
        cy,
        on ? rOuter + 3 : rOuter,
        on ? rInner - 1 : rInner,
        a0,
        Math.max(a0 + 0.4, a1),
      ),
    };
  });

  const shown = active === null ? null : slices[active];

  return (
    <svg
      width={size}
      height={size}
      viewBox={'0 0 ' + size + ' ' + size}
      role="img"
      aria-label={
        'Income by type. ' + slices.map((s) => s.label + ' ' + usd(s.value)).join(', ') + '.'
      }
    >
      {segments.map(({ slice, d, i }) => (
        <path
          key={slice.id}
          d={d}
          data-mark={'slice-' + slice.id}
          fill={slice.colour}
          onMouseEnter={() => onHover(i)}
          onMouseLeave={() => onHover(null)}
          className="cursor-pointer transition-[d,opacity] duration-200"
          opacity={active === null || active === i ? 1 : 0.42}
        />
      ))}

      <text
        x="50%"
        y={cy - 8}
        textAnchor="middle"
        className="fill-muted text-[11.5px] font-medium tracking-[0.03em] uppercase"
      >
        {shown ? shown.label : 'Total'}
      </text>
      <text
        x="50%"
        y={cy + 18}
        textAnchor="middle"
        className="fill-ink text-[23px] font-semibold tracking-[-0.03em]"
      >
        {usd(shown ? shown.value : total)}
      </text>
    </svg>
  );
}
