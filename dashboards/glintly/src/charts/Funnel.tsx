import { useState } from 'react';

import { r3 } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';
import { num } from '@/lib/format';

export interface Band {
  id: string;
  label: string;
  users: number;
}

/**
 * The conversion funnel: one tapering band per step, drawn from the deck.
 *
 * Geometry is computed, never traced — each band's top edge is its own count
 * and its bottom edge is the next step's, so the taper *is* the drop-off
 * rather than a drawing of one. Change a figure in the deck and the shape
 * moves (rule 6).
 *
 * **No text inside the SVG.** The bands run from the brand blue to a pale
 * tint of it, and a tint pale enough to read as "nearly empty" cannot carry
 * white type at 4.5:1 — so the labels live in the list beside the chart,
 * on the card's own ground, where they pass.
 *
 * A band is also the hit area, which matters: the last step is 3% of the
 * first, so a hover driven at a band's bounding-box centre would land on the
 * gap beside it rather than on the wedge.
 */
export function Funnel({
  bands,
  active,
  onActive,
  label,
}: {
  bands: Band[];
  active: string | null;
  onActive: (id: string | null) => void;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [tip, setTip] = useState<{ x: number; y: number; band: Band } | null>(null);

  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const gap = 5;
  const bandH = (h - gap * (bands.length - 1)) / bands.length;
  const top = bands[0].users || 1;

  /*
   * Width is the **square root** of the ratio, not the ratio.
   *
   * Straight proportion draws this deck as a cone and then a pipe: the top
   * step is 42,180 and every step under it is between 2.8% and 22.9% of it,
   * so four of the five bands come out within a few pixels of each other and
   * the drop-off that the card exists to show is invisible. The square root
   * keeps the order and the relative sizes legible, and the list beside the
   * chart carries the real counts and the real step rates — which is where a
   * figure should be read off anyway.
   */
  const width = (users: number) => Math.max(0.1, Math.sqrt(users / top)) * w;

  const shape = (i: number) => {
    const wTop = width(bands[i].users);
    const wBottom = width(bands[i + 1]?.users ?? bands[i].users);
    const y0 = i * (bandH + gap);
    const y1 = y0 + bandH;
    const x = (bw: number) => r3((w - bw) / 2);
    return (
      'M' +
      x(wTop) +
      ' ' +
      r3(y0) +
      ' H' +
      r3(x(wTop) + wTop) +
      ' L' +
      r3(x(wBottom) + wBottom) +
      ' ' +
      r3(y1) +
      ' H' +
      x(wBottom) +
      ' Z'
    );
  };

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} role="img" aria-label={label}>
          {bands.map((b, i) => (
            <path
              key={b.id}
              d={shape(i)}
              data-mark={b.id}
              fill={`var(--color-funnel-${i})`}
              className="cursor-pointer transition-opacity duration-150"
              opacity={active && active !== b.id ? 0.3 : 1}
              onPointerMove={(e) => {
                const box = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
                setTip({ x: e.clientX - box.left, y: e.clientY - box.top - 8, band: b });
              }}
              onPointerLeave={() => setTip((cur) => (cur && cur.band.id === b.id ? null : cur))}
              onClick={() => onActive(active === b.id ? null : b.id)}
            />
          ))}
        </svg>
      ) : null}

      {tip ? (
        <Tip x={Math.min(Math.max(tip.x, 64), Math.max(64, w - 64))} y={tip.y}>
          <span className="font-semibold">{tip.band.label}</span>
          <span className="opacity-75"> · {num(tip.band.users)}</span>
        </Tip>
      ) : null}
    </div>
  );
}
