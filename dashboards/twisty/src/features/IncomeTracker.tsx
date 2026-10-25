import { useState } from 'react';

import { IncomeChart } from '@/charts/IncomeChart';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { SelectPill } from '@/components/SelectPill';
import { RANGES, type Range } from '@/data/deck';
import { cx } from '@/lib/cx';
import { pct } from '@/lib/format';

const OPTIONS = RANGES.map((r) => ({ id: r.id, label: r.label }));

/**
 * The card the reference leads on.
 *
 * The range control is real: Week, Month and Year are three different series in
 * the deck, and switching redraws the chart, re-labels the chips and
 * recalculates the figure on the left. Year is deliberately negative, so the
 * card has to be able to say that income went *down* -- a dashboard that can
 * only render good news is a picture of a dashboard.
 */
export function IncomeTracker() {
  const [rangeId, setRangeId] = useState<Range['id']>('week');
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[0];
  const [selected, setSelected] = useState(range.initial);
  const [hovered, setHovered] = useState<number | null>(null);

  // A new range has a different number of marks, so the selection has to come
  // back to that range's own interesting one rather than keeping an index that
  // may not exist any more.
  //
  // Adjusted during render, not in an effect: an effect that sets state runs
  // after the browser has already been handed a frame drawn with the old
  // index, so the chart flickers through a wrong selection on the way. React
  // re-runs this component immediately and never commits the in-between.
  const [lastRange, setLastRange] = useState(range.id);
  if (lastRange !== range.id) {
    setLastRange(range.id);
    setSelected(range.initial);
    setHovered(null);
  }

  const up = range.delta >= 0;

  return (
    <Card pane="income" className="col-span-2 p-7 pb-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="bg-sunken text-body grid h-9 w-9 place-items-center rounded-xl">
            <Icon name="card" size={19} />
          </span>
          <h2 className="text-ink m-0 text-[34px] leading-[1.1] font-semibold tracking-[-0.025em]">
            Income Tracker
          </h2>
        </div>
        <SelectPill name="range" value={rangeId} options={OPTIONS} onChange={setRangeId} />
      </div>

      <p className="text-muted m-0 mt-3 max-w-[390px] text-[14px] leading-[1.45]">
        Track changes in income over time and access detailed data on each project and payments
        received
      </p>

      <div className="mt-5 flex min-h-0 flex-1 items-stretch gap-6">
        <div className="mt-auto w-[190px] shrink-0 pb-4">
          <p
            data-delta
            className={cx(
              'm-0 text-[46px] leading-[1] font-bold tracking-[-0.04em]',
              up ? 'text-ink' : 'text-accent',
            )}
          >
            {pct(range.delta)}
          </p>
          <p className="text-muted m-0 mt-3 text-[13px] leading-[1.45]">{range.caption}</p>
        </div>

        <div className="min-w-0 flex-1">
          <IncomeChart
            points={range.points}
            selected={selected}
            hovered={hovered}
            onSelect={setSelected}
            onHover={setHovered}
          />
        </div>
      </div>
    </Card>
  );
}
