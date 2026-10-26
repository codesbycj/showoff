import { useState } from 'react';

import { arcPath } from '@/charts/path';
import { Tip } from '@/components/Bits';

export interface Segment {
  id: string;
  label: string;
  share: number;
  token: string;
}

/**
 * The analytics gauge: a half-ring, read clockwise from nine o'clock.
 *
 * Computed from the data, not traced — change a share in the deck and the arc
 * moves (rule 6). The headline percentage is the first segment's own share
 * rather than a separate number, because the reference prints "90% Done" over
 * segments that are nothing like nine tenths of its arc.
 *
 * **Hover is on the wedge, not the bounding box.** A ring segment's box centre
 * is inside the hole, so hovering a mark by its box lands on nothing — which a
 * numeric diff reports as a hover that changed zero pixels.
 */
export function Gauge({
  segments,
  size = 188,
  thickness = 20,
  label,
}: {
  segments: Segment[];
  size?: number;
  thickness?: number;
  label: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  const total = segments.reduce((t, s) => t + s.share, 0) || 1;
  const c = size / 2;
  const rOuter = size / 2;
  const rInner = rOuter - thickness;
  const sweep = 180;
  const from = -90;

  const arcs = segments.map((s, i) => {
    const before = segments.slice(0, i).reduce((t, x) => t + x.share, 0);
    const a0 = from + (before / total) * sweep;
    const a1 = a0 + (s.share / total) * sweep;
    return { seg: s, d: arcPath(c, c, rOuter, rInner, a0, a1) };
  });

  const current = segments.find((s) => s.id === active) ?? segments[0];

  return (
    <div
      className="relative mx-auto"
      style={{ width: size, height: size / 2 + 6 }}
      onPointerLeave={() => {
        setActive(null);
        setTip(null);
      }}
    >
      <svg
        width={size}
        height={size / 2 + 6}
        viewBox={`0 0 ${size} ${size / 2 + 6}`}
        role="img"
        aria-label={label}
      >
        {arcs.map(({ seg, d }) => (
          <path
            key={seg.id}
            d={d}
            data-mark={seg.id}
            fill={`var(${seg.token})`}
            className="cursor-pointer transition-opacity duration-150"
            opacity={active && active !== seg.id ? 0.3 : 1}
            onPointerMove={(e) => {
              const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
              setActive(seg.id);
              setTip({ x: e.clientX - box.left, y: e.clientY - box.top - 8 });
            }}
          />
        ))}
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 text-center">
        <p className="tnum text-ink m-0 text-[30px] leading-none font-bold tracking-[-0.03em]">
          {current.share}%
        </p>
        <p className="text-muted m-0 mt-1 text-[12.5px]">{current.label}</p>
      </div>

      {tip ? (
        <Tip x={tip.x} y={tip.y}>
          <span className="font-semibold">{current.label}</span>
          <span className="opacity-75"> · {current.share}%</span>
        </Tip>
      ) : null}
    </div>
  );
}
