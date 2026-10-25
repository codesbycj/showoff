import { useState } from 'react';

import { areaPath, smoothPath, type Pt } from '@/charts/path';
import { extent, scale } from '@/charts/scale';
import { ref, useDefIds } from '@/charts/ids';
import type { CostLine } from '@/data/deck';
import { cx } from '@/lib/cx';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The utilisation meter: a row of ticks, lit up to the figure.
 *
 * The reference draws it as a barcode with a couple of amber ticks near the
 * end. Here the amber ones are the last few lit — the band between the target
 * and the figure — so the colour means something instead of decorating.
 */
export function TickMeter({ value, ticks }: { value: number; ticks: number[] }) {
  const lit = Math.round((value / 100) * ticks.length);
  const warnFrom = Math.max(0, lit - 3);

  return (
    <span role="img" aria-label={value + ' per cent'} className="flex h-6 items-end gap-[2px]">
      {ticks.map((t, i) => (
        <span
          key={i}
          style={{ height: Math.round(t * 24) }}
          className={cx(
            'block flex-1 rounded-[1px] transition-colors duration-300',
            i >= lit ? 'bg-sunken-deep' : i >= warnFrom ? 'bg-warn' : 'bg-accent',
          )}
        />
      ))}
    </span>
  );
}

/**
 * The on-time meter: one bar running red to green with a marker on the figure.
 *
 * The gradient is the scale, so the marker's position *is* the reading — the
 * reference draws the same bar but puts its marker at the far right whatever
 * the number says.
 */
export function GradientMeter({ value }: { value: number }) {
  return (
    <span role="img" aria-label={value + ' per cent on time'} className="relative block">
      <span
        className="block h-2.5 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, var(--color-danger) 0%, var(--color-warn) 45%, var(--color-accent) 100%)',
        }}
      />
      <span
        aria-hidden="true"
        style={{ left: 'calc(' + Math.max(0, Math.min(100, value)) + '% - 5px)' }}
        className="ring-surface bg-ink absolute -top-[3px] h-4 w-2.5 rounded-full ring-2 transition-[left] duration-500"
      />
    </span>
  );
}

/** The deliveries trend: a small filled area, drawn from the deck. */
export function AreaSpark({ values, height = 40 }: { values: number[]; height?: number }) {
  const [box, size] = useMeasure<HTMLDivElement>();
  const ids = useDefIds('fill');

  const [lo, hi] = extent(values);
  const x = scale([0, values.length - 1], [0, Math.max(0, size.w)]);
  const y = scale([Math.min(lo, 0), hi || 1], [height - 4, 6]);
  const pts: Pt[] = values.map((v, i) => ({ x: x(i), y: y(v) }));
  const line = smoothPath(pts);

  return (
    <div ref={box} style={{ height }} className="w-full">
      {size.w > 0 ? (
        <svg
          width={size.w}
          height={height}
          viewBox={'0 0 ' + size.w + ' ' + height}
          role="img"
          aria-label={'Deliveries trend: ' + values.join(', ')}
        >
          <defs>
            <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.26" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath(line, 0, size.w, height)} fill={ref(ids.fill)} />
          <path
            d={line}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ) : null}
    </div>
  );
}

/**
 * The balance chart: a bar per month, below the line when the month lost money,
 * with a dotted trend through the running average.
 */
export function SignedBars({ bars, height = 120 }: { bars: number[]; height?: number }) {
  const [box, size] = useMeasure<HTMLDivElement>();
  const [at, setAt] = useState<number | null>(null);

  const max = Math.max(...bars.map((b) => Math.abs(b)));
  const zero = height * 0.72;
  const unit = (height * 0.62) / (max || 1);
  const step = bars.length ? size.w / bars.length : 0;
  const barW = Math.max(3, step * 0.56);

  // The running average, which is what the reference's dotted line is.
  const trend: Pt[] = bars.map((_, i) => {
    const slice = bars.slice(0, i + 1);
    const mean = slice.reduce((t, v) => t + v, 0) / slice.length;
    return { x: step * (i + 0.5), y: zero - mean * unit };
  });

  return (
    <div ref={box} style={{ height }} className="relative w-full">
      {size.w > 0 ? (
        <>
          <svg
            width={size.w}
            height={height}
            viewBox={'0 0 ' + size.w + ' ' + height}
            role="img"
            aria-label={'Monthly balance, ' + bars.length + ' months'}
          >
            <line x1="0" x2={size.w} y1={zero} y2={zero} stroke="var(--color-line)" />
            {bars.map((v, i) => {
              const h = Math.abs(v) * unit;
              const on = at === i;
              return (
                <rect
                  key={i}
                  data-mark={'bal-' + i}
                  x={step * (i + 0.5) - barW / 2}
                  y={v >= 0 ? zero - h : zero}
                  width={barW}
                  height={Math.max(2, h)}
                  rx={1.5}
                  className={cx(
                    'transition-opacity',
                    v >= 0 ? 'fill-accent' : 'fill-danger',
                    at !== null && !on && 'opacity-45',
                  )}
                />
              );
            })}
            <path
              d={smoothPath(trend)}
              fill="none"
              stroke="var(--color-ink)"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
          </svg>

          {bars.map((v, i) => (
            <button
              key={'hit-' + i}
              type="button"
              data-bal-hit={i}
              aria-label={'Month ' + (i + 1) + ', ' + (v >= 0 ? '+' : '') + v + 'K'}
              onMouseEnter={() => setAt(i)}
              onMouseLeave={() => setAt(null)}
              onFocus={() => setAt(i)}
              onBlur={() => setAt(null)}
              style={{ left: step * i, width: step, top: 0, height }}
              className="absolute"
            />
          ))}

          {at !== null ? (
            <span
              data-bal-tip
              style={{ left: Math.min(Math.max(step * (at + 0.5), 34), size.w - 34) }}
              className="bg-ink pointer-events-none absolute top-0 -translate-x-1/2 rounded-md px-2 py-1 text-[11px] font-semibold text-white"
            >
              {(bars[at] >= 0 ? '+' : '') + bars[at]}K
            </span>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

/** Costs by category, as one bar to scale. */
export function StackedBar({
  lines,
  active,
  onHover,
}: {
  lines: CostLine[];
  active: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="flex h-2.5 w-full rounded-full">
      {lines.map((line) => (
        <button
          key={line.id}
          type="button"
          data-seg={line.id}
          aria-label={line.label + ', ' + line.share + ' per cent'}
          onMouseEnter={() => onHover(line.id)}
          onMouseLeave={() => onHover(null)}
          onFocus={() => onHover(line.id)}
          onBlur={() => onHover(null)}
          style={{ width: line.share + '%', background: line.colour }}
          // The band stays 10px; the button around it is 26, so each segment
          // is a real target rather than a hairline.
          className={cx(
            '-my-2 h-full bg-clip-content py-2 transition-opacity duration-200',
            active && active !== line.id ? 'opacity-40' : 'opacity-100',
          )}
        />
      ))}
    </div>
  );
}
