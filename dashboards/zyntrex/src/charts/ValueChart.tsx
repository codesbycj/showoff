import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { areaPath, linePath, type Pt } from '@/charts/path';
import { niceTicks, r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import type { Point } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { short, usd } from '@/lib/format';

/**
 * The account's value over the selected window.
 *
 * Drawn as a polyline rather than a spline: the reference's own curve is
 * jagged and a crypto balance genuinely is — smoothing it would invent prices
 * between two points that never traded.
 *
 * The y axis starts at the series' own floor, not at zero. A balance that
 * moves 2% in a day is a flat line on a zero-based axis, and the whole point
 * of the card is the shape of that 2%.
 */
export function ValueChart({ points, label }: { points: Point[]; label: string }) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('fade');

  const padTop = 16;
  const padBottom = 26;
  const padLeft = 54;
  const padRight = 8;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const values = points.map((p) => p.value);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.18 || hi * 0.01;
  const domain: [number, number] = [lo - pad, hi + pad];
  const y = scale(domain, [padTop + plotH, padTop]);
  const x = (i: number) =>
    padLeft + (points.length < 2 ? plotW / 2 : (i / (points.length - 1)) * plotW);
  const ticks = niceTicks(domain, 4).filter((t) => t >= domain[0] && t <= domain[1]);

  const pts: Pt[] = points.map((p, i) => ({ x: x(i), y: y(p.value) }));
  const line = linePath(pts);
  const rising = values[values.length - 1] >= values[0];
  const stroke = rising ? 'var(--color-accent)' : 'var(--color-danger)';

  /* Label every point only when they fit; otherwise every nth. */
  const every = Math.max(1, Math.ceil(points.length / 7));

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <svg
          width={w}
          height={h}
          role="img"
          aria-label={label}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={ids.fade} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
              <stop offset="100%" stopColor={stroke} stopOpacity="0" />
            </linearGradient>
          </defs>

          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={padLeft}
                x2={w - padRight}
                y1={y(t)}
                y2={y(t)}
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <text
                x={padLeft - 10}
                y={y(t) + 4}
                textAnchor="end"
                className="tnum fill-[var(--color-muted)] text-[10.5px]"
              >
                ${short(t)}
              </text>
            </g>
          ))}

          <path
            d={areaPath(line, pts[0].x, pts[pts.length - 1].x, padTop + plotH)}
            fill={ref(ids.fade)}
          />
          <path d={line} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />

          {points.map((p, i) =>
            i % every === 0 || i === points.length - 1 ? (
              <text
                key={p.at + i}
                x={x(i)}
                y={h - 8}
                textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                className="tnum fill-[var(--color-muted)] text-[10.5px]"
              >
                {p.at}
              </text>
            ) : null,
          )}

          {hover !== null ? (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={padTop}
                y2={padTop + plotH}
                stroke="var(--color-sunken-deep)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx={x(hover)}
                cy={y(points[hover].value)}
                r="4.5"
                fill="var(--color-surface)"
                stroke={stroke}
                strokeWidth="2.5"
              />
            </g>
          ) : null}

          {/* One hit band per point, so the whole column is hoverable rather
              than a 4px dot. */}
          {points.map((_, i) => (
            <rect
              key={'hit' + i}
              data-mark={'point-' + i}
              x={r3(x(i) - plotW / Math.max(1, points.length - 1) / 2)}
              y={padTop}
              width={r3(plotW / Math.max(1, points.length - 1))}
              height={plotH}
              fill="transparent"
              onPointerEnter={() => setHover(i)}
            />
          ))}
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(x(hover), 86), Math.max(86, w - 86))}
          y={y(points[hover].value) - 12}
        >
          <span className="text-muted block text-[11px]">{points[hover].at}</span>
          <span className="tnum font-bold">{usd(points[hover].value, true)}</span>
        </Tip>
      ) : null}
    </div>
  );
}
