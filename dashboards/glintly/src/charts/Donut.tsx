import { useState, type ReactNode } from 'react';

import { arcPath } from '@/charts/path';
import { Tip } from '@/components/Bits';
import { cx } from '@/lib/cx';

export interface Slice {
  id: string;
  label: string;
  value: number;
  /** A CSS custom property name, so the legend and the arc cannot drift apart. */
  token: string;
}

/**
 * The sessions-by-device ring.
 *
 * Geometry is computed from the data, never traced: change a figure in the
 * deck and the arcs move (rule 6). The reference draws a closed ring with the
 * first slice starting at twelve o'clock, so this one is called with a full
 * 360-degree sweep from -90; the defaults are the three-quarter arc the
 * component also has to serve.
 *
 * **Hover targets the wedge, not the ring's bounding box.** A donut segment's
 * box centre is inside the hole, so a harness that hovers a mark by its box
 * lands on nothing at all — which it reports as a hover that changed zero
 * pixels. The wedge path is the hit area and `data-mark` is on it.
 */
export function Donut({
  slices,
  size = 176,
  thickness = 22,
  sweep = 270,
  from = -135,
  pad = 0,
  active,
  onActive,
  center,
  className,
}: {
  slices: Slice[];
  size?: number;
  thickness?: number;
  sweep?: number;
  from?: number;
  /** Degrees of gap between slices, as the reference draws them. */
  pad?: number;
  active: string | null;
  onActive: (id: string | null) => void;
  center?: ReactNode;
  className?: string;
}) {
  const [tip, setTip] = useState<{ x: number; y: number; slice: Slice } | null>(null);

  const total = slices.reduce((t, s) => t + s.value, 0) || 1;
  const cx0 = size / 2;
  const rOuter = size / 2;
  const rInner = rOuter - thickness;

  /*
   * Each arc's start is the sum of the slices before it, computed rather than
   * accumulated into a variable the map closes over: a running total mutated
   * during render is reused on the next one, and the lint rule that catches it
   * is catching a real class of bug rather than a style preference.
   */
  const arcs = slices.map((s, i) => {
    const before = slices.slice(0, i).reduce((t, x) => t + x.value, 0);
    const a0 = from + (before / total) * sweep;
    const a1 = a0 + (s.value / total) * sweep;
    /* The gap is taken off the *end* of each arc, and never more than half
       the arc — a 1.8% slice is narrower than the gap, and subtracting a
       fixed pad from it would run its end past its own start. */
    const gap = Math.min(pad, (a1 - a0) / 2);
    return { slice: s, d: arcPath(cx0, cx0, rOuter, rInner, a0, a1 - gap) };
  });

  return (
    <div
      className={cx('relative', className)}
      style={{ width: size, height: size }}
      onPointerLeave={() => {
        setTip(null);
        onActive(null);
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={
          'Sessions by device: ' +
          slices.map((s) => `${s.label} ${Math.round((s.value / total) * 100)}%`).join(', ')
        }
      >
        {/* The track the reference draws behind the sweep. */}
        <path
          d={arcPath(cx0, cx0, rOuter, rInner, from, from + sweep)}
          fill="var(--color-sunken-deep)"
        />
        {arcs.map(({ slice, d }) => (
          <path
            key={slice.id}
            d={d}
            data-mark={slice.id}
            fill={`var(${slice.token})`}
            className="cursor-pointer transition-opacity duration-150"
            opacity={active && active !== slice.id ? 0.28 : 1}
            onPointerMove={(e) => {
              const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
              setTip({ x: e.clientX - box.left, y: e.clientY - box.top - 8, slice });
              onActive(slice.id);
            }}
          />
        ))}
      </svg>

      {center ? (
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          {center}
        </div>
      ) : null}

      {tip ? (
        <Tip x={tip.x} y={tip.y}>
          <span className="font-semibold">{tip.slice.label}</span>
          <span className="opacity-75"> · {Math.round((tip.slice.value / total) * 100)}%</span>
        </Tip>
      ) : null}
    </div>
  );
}
