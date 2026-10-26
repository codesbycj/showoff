import { useMemo, useState } from 'react';

import { AreaChart } from '@/charts/AreaChart';
import { Card, CardHead, Delta } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { RANGES, netWorthSeries, type Currency } from '@/data/deck';
import { compactMoney, money } from '@/lib/money';

/** Net worth over the selected range. The range really changes the series. */
export function NetWorthCard({ currency }: { currency: Currency }) {
  const [rangeId, setRangeId] = useState('6m');
  const range = RANGES.find((r) => r.id === rangeId) ?? RANGES[1];
  const values = useMemo(() => netWorthSeries(rangeId), [rangeId]);

  const first = values[0];
  const last = values[values.length - 1];
  const change = Math.round(((last - first) / first) * 1000) / 10;

  return (
    <Card pane="networth" className="min-h-0 p-5">
      <CardHead
        title="Net Worth"
        icon={<Icon name="trend-up" size={16} />}
        action={
          <Segmented
            name="range"
            size="sm"
            value={rangeId}
            options={RANGES.map((r) => ({ id: r.id, label: r.label }))}
            onChange={setRangeId}
          />
        }
      />

      <p className="m-0 mt-3 flex flex-wrap items-baseline gap-3">
        <span
          data-figure="networth"
          className="tnum text-ink text-[38px] leading-none font-semibold tracking-[-0.035em]"
        >
          {money(last, currency)}
        </span>
        <Delta value={change} />
        <span className="text-muted text-[12.5px]">over {range.label}</span>
      </p>

      <AreaChart
        values={values}
        ticks={range.ticks}
        format={(n) => compactMoney(n, currency)}
        label={`Net worth over ${range.label}, from ${money(first, currency)} to ${money(last, currency)}`}
      />
    </Card>
  );
}
