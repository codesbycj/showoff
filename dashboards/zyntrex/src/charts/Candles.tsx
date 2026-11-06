import { useState } from 'react';

import { niceTicks, r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import type { Candle } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { short } from '@/lib/format';

/**
 * Candlesticks, which is what a trading surface charts.
 *
 * Volume rides under the price in its own band rather than in a second card:
 * a candle and its volume are one observation, and reading them apart is the
 * thing every desk puts them together to avoid.
 */
export function Candles({
  data,
  label,
  dp,
}: {
  data: Candle[];
  label: string;
  /** The pair's own tick precision; a global rule gets BTC and XRP both wrong. */
  dp: number;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const padTop = 12;
  const padBottom = 22;
  const padLeft = 58;
  const padRight = 8;
  const volShare = 0.22;
  const gap = 10;

  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const bodyH = Math.max(1, (h - padTop - padBottom - gap) * (1 - volShare));
  const volH = Math.max(1, (h - padTop - padBottom - gap) * volShare);

  const lo = Math.min(...data.map((c) => c.low));
  const hi = Math.max(...data.map((c) => c.high));
  const pad = (hi - lo) * 0.06 || hi * 0.004;
  const domain: [number, number] = [lo - pad, hi + pad];
  const y = scale(domain, [padTop + bodyH, padTop]);
  const ticks = niceTicks(domain, 5).filter((t) => t >= domain[0] && t <= domain[1]);

  const volTop = padTop + bodyH + gap;
  const volMax = Math.max(...data.map((c) => c.volume));
  const vy = scale([0, volMax], [volTop + volH, volTop]);

  const slot = plotW / Math.max(1, data.length);
  const bodyW = Math.max(2, Math.min(11, slot * 0.62));
  const every = Math.max(1, Math.ceil(data.length / 8));
  const shown = hover !== null ? data[hover] : null;

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
                {t >= 1000 ? short(t) : t.toFixed(dp > 2 ? 2 : dp)}
              </text>
            </g>
          ))}

          {data.map((c, i) => {
            const mid = padLeft + slot * i + slot / 2;
            const up = c.close >= c.open;
            const fill = up ? 'var(--color-bid)' : 'var(--color-ask)';
            const top = y(Math.max(c.open, c.close));
            const bottom = y(Math.min(c.open, c.close));
            return (
              <g
                key={c.at + i}
                data-mark={'candle-' + i}
                opacity={hover !== null && hover !== i ? 0.45 : 1}
                className="transition-opacity duration-150"
              >
                <line
                  x1={r3(mid)}
                  x2={r3(mid)}
                  y1={y(c.high)}
                  y2={y(c.low)}
                  stroke={fill}
                  strokeWidth="1.2"
                />
                <rect
                  x={r3(mid - bodyW / 2)}
                  y={r3(top)}
                  width={r3(bodyW)}
                  height={Math.max(1.5, bottom - top)}
                  rx="1.5"
                  fill={fill}
                />
                <rect
                  x={r3(mid - bodyW / 2)}
                  y={r3(vy(c.volume))}
                  width={r3(bodyW)}
                  height={Math.max(1, volTop + volH - vy(c.volume))}
                  rx="1.5"
                  fill={fill}
                  opacity="0.4"
                />
                <rect
                  x={r3(padLeft + slot * i)}
                  y={padTop}
                  width={r3(slot)}
                  height={bodyH + gap + volH}
                  fill="transparent"
                  className="cursor-crosshair"
                  onPointerEnter={() => setHover(i)}
                />
              </g>
            );
          })}

          <text
            x={padLeft - 10}
            y={volTop + 10}
            textAnchor="end"
            className="fill-[var(--color-muted)] text-[10px]"
          >
            Vol
          </text>

          {data.map((c, i) =>
            i % every === 0 ? (
              <text
                key={'x' + i}
                x={padLeft + slot * i + slot / 2}
                y={h - 7}
                textAnchor="middle"
                className="tnum fill-[var(--color-muted)] text-[10.5px]"
              >
                {c.at}
              </text>
            ) : null,
          )}
        </svg>
      ) : null}

      {shown && hover !== null ? (
        <Tip
          x={Math.min(Math.max(padLeft + slot * hover + slot / 2, 104), Math.max(104, w - 104))}
          y={Math.max(60, y(shown.high) - 8)}
        >
          <span className="text-muted block text-[11px]">{shown.at}</span>
          <span className="tnum block">
            O {shown.open.toFixed(dp)} · C {shown.close.toFixed(dp)}
          </span>
          <span className="tnum text-muted block text-[11px]">
            H {shown.high.toFixed(dp)} · L {shown.low.toFixed(dp)} · vol ${short(shown.volume)}
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
