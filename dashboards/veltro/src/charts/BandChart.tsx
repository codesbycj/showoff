import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { areaPath, smoothPath } from '@/charts/path';
import { niceTicks, scale } from '@/charts/scale';
import type { Band } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { short } from '@/lib/format';

/**
 * The analytics band: a hatched spread around a line, with the hovered month
 * lifted out as a column.
 *
 * The hatch is a `<pattern>` and its id comes from `useDefIds` — pattern ids
 * are document-global, so two charts that both declare `id="hatch"` collapse
 * into one and the second paints in the first one's colour.
 *
 * The plot is scaled to the band's own ceiling and the gridlines are the nice
 * values that fit under it.
 */
export function BandChart({
  bands,
  peakId,
  label,
}: {
  bands: Band[];
  peakId: string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const ids = useDefIds('hatch');

  const padTop = 30;
  const padBottom = 24;
  const padLeft = 44;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 8);
  const plotH = Math.max(1, h - padTop - padBottom);

  const top = Math.max(...bands.map((b) => b.high), 1);
  const y = scale([0, top], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, top], 5).filter((t) => t <= top);
  const x = (i: number) => padLeft + (i / Math.max(1, bands.length - 1)) * plotW;

  const line = smoothPath(bands.map((b, i) => ({ x: x(i), y: y(b.value) })));
  const highs = bands.map((b, i) => ({ x: x(i), y: y(b.high) }));
  const lows = bands.map((b, i) => ({ x: x(i), y: y(b.low) })).reverse();
  const bandPath = smoothPath(highs) + ' L' + smoothPath(lows).slice(1) + ' Z';

  const shownId = hover ?? peakId;
  const shown = bands.find((b) => b.id === shownId) ?? bands[0];
  const shownIndex = bands.indexOf(shown);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            <defs>
              <pattern
                id={ids.hatch}
                width="6"
                height="6"
                patternTransform="rotate(45)"
                patternUnits="userSpaceOnUse"
              >
                <rect width="6" height="6" fill="var(--color-accent-faint)" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="var(--color-accent-soft)"
                  strokeWidth="2.4"
                />
              </pattern>
            </defs>

            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={padLeft}
                  x2={w - 8}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[10.5px]"
                >
                  {'$' + short(t)}
                </text>
              </g>
            ))}

            {/* The hovered month, lifted out as a column behind the band. */}
            <rect
              x={x(shownIndex) - 11}
              y={padTop}
              width="22"
              height={plotH}
              rx="11"
              fill="var(--color-accent)"
              opacity="0.16"
            />

            <path d={bandPath} fill={ref(ids.hatch)} />
            <path
              d={areaPath(line, x(0), x(bands.length - 1), padTop + plotH)}
              fill="transparent"
            />
            <path
              d={line}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {bands.map((b, i) => (
              <circle
                key={b.id}
                cx={x(i)}
                cy={y(b.value)}
                r={shownId === b.id ? 5 : 3}
                fill="var(--color-surface)"
                stroke="var(--color-accent)"
                strokeWidth="2"
              />
            ))}

            {bands.map((b, i) => (
              <text
                key={b.id + '-l'}
                x={x(i)}
                y={h - 6}
                /* The first and last labels are anchored to the plot's edges,
                   not centred on them: centred, "AUG" ran past the right edge
                   and lost its G. */
                textAnchor={i === 0 ? 'start' : i === bands.length - 1 ? 'end' : 'middle'}
                className="fill-[var(--color-muted)] text-[10.5px] tracking-[0.04em]"
              >
                {b.label}
              </text>
            ))}

            {/* Hit columns, so a beat can put the pointer on a named month. */}
            {bands.map((b, i) => (
              <rect
                key={b.id + '-h'}
                data-mark={b.id}
                x={x(i) - plotW / bands.length / 2}
                y={padTop}
                width={plotW / bands.length}
                height={plotH}
                fill="transparent"
                className="cursor-pointer"
                onPointerEnter={() => setHover(b.id)}
                onPointerLeave={() => setHover((cur) => (cur === b.id ? null : cur))}
              />
            ))}
          </svg>

          <div
            data-tip
            style={{
              left: Math.min(Math.max(x(shownIndex), 44), w - 44),
              top: Math.max(4, y(shown.high) - 12),
            }}
            className="bg-ink-fill text-ink-fg pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap"
          >
            {(shown.delta >= 0 ? '+' : '') + shown.delta}%
          </div>
        </>
      ) : null}
    </div>
  );
}
