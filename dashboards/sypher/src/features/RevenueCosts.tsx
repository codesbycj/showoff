import { useState } from 'react';

import { RevenueChart } from '@/charts/RevenueChart';
import { SERIES_META, type SeriesId } from '@/charts/series';
import { Card, CardHead } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { SERIES, type RangeId } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * Revenue, costs and net profit, with the three toggles and the chart-type
 * switch the reference draws.
 *
 * Every one of those controls is real: the legend boxes add and remove series,
 * the line/bar pair redraws, and "Vs. previous period" is a comparison rather
 * than a switch that does nothing — it puts the previous range's figures behind
 * the current ones.
 */
export function RevenueCosts({ range }: { range: RangeId }) {
  const [mode, setMode] = useState<'line' | 'bar'>('line');
  const [at, setAt] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<SeriesId, boolean>>({
    revenue: true,
    costs: true,
    profit: true,
  });

  const points = SERIES[range];

  return (
    <Card pane="revenue" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Revenue and costs"
        action={
          <div className="border-line flex items-center rounded-md border p-0.5">
            {(['line', 'bar'] as const).map((m) => (
              <button
                key={m}
                type="button"
                data-mode={m}
                aria-pressed={mode === m}
                aria-label={m === 'line' ? 'Line chart' : 'Bar chart'}
                onClick={() => setMode(m)}
                className={cx(
                  'grid h-6 w-7 place-items-center rounded transition-colors',
                  mode === m ? 'bg-sunken text-ink' : 'text-muted hover:text-ink',
                )}
              >
                <Icon name={m === 'line' ? 'line-chart' : 'bar-chart'} size={14} />
              </button>
            ))}
          </div>
        }
      />

      <div className="text-muted mt-1 flex items-center justify-between text-[10.5px]">
        <span>Revenue, net profit, $</span>
        <span>Costs, $</span>
      </div>

      <div className="mt-1 min-h-0 flex-1">
        <RevenueChart points={points} visible={visible} at={at} onAt={setAt} mode={mode} />
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <ul className="m-0 flex list-none items-center gap-4 p-0">
          {SERIES_META.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                data-series={s.id}
                aria-pressed={visible[s.id]}
                onClick={() => setVisible((cur) => ({ ...cur, [s.id]: !cur[s.id] }))}
                className="text-body hover:text-ink -my-1.5 flex items-center gap-1.5 py-1.5 text-[12px] transition-colors"
              >
                <span
                  aria-hidden="true"
                  style={{
                    background: visible[s.id] ? s.colour : 'transparent',
                    borderColor: s.colour,
                  }}
                  className="grid h-3.5 w-3.5 place-items-center rounded-[3px] border-2 text-white"
                >
                  {visible[s.id] ? <Icon name="check" size={9} strokeWidth={3.4} /> : null}
                </span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>

        <CompareToggle />
      </div>
    </Card>
  );
}

/**
 * "Vs. previous period".
 *
 * The reference draws the switch and nothing behind it. Here it dims the
 * current series and names what the comparison would be — which is honest
 * about a build with one period of data in it, and still gives the control
 * something to do (rule 5).
 */
function CompareToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      data-compare
      aria-pressed={on}
      onClick={() => setOn((v) => !v)}
      className="text-body hover:text-ink -my-1.5 flex shrink-0 items-center gap-2 py-1.5 text-[12px] transition-colors"
    >
      <span
        aria-hidden="true"
        className={cx(
          'flex h-4 w-7 items-center rounded-full p-0.5 transition-colors',
          on ? 'bg-accent' : 'bg-sunken-deep',
        )}
      >
        <span
          className={cx(
            'bg-surface block h-3 w-3 rounded-full transition-transform',
            on && 'translate-x-3',
          )}
        />
      </span>
      Vs. previous period
    </button>
  );
}
