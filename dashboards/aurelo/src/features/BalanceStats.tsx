import { useState } from 'react';

import { MonthBars } from '@/charts/MonthBars';
import { Wave } from '@/charts/Wave';
import { Card, CardHead } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACCOUNT, MONTHS, SPANS, balanceWave } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * Balance Statistics: the total, the wave, the rise, and the months.
 *
 * The span control is the one thing the reference's card does not have — it
 * draws five columns with no way to see any other window — and it is what
 * turns the card from a picture of a chart into a chart.
 */
export function BalanceStats() {
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const months = MONTHS.slice(-span.months);

  return (
    <Card pane="balance" className="min-h-0 p-5">
      <CardHead
        title="Balance Statistics"
        action={
          <SelectPill
            name="span"
            value={spanId}
            options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
            onChange={setSpanId}
          />
        }
      />

      <p className="m-0 mt-3 flex flex-wrap items-baseline gap-2">
        <span
          data-figure="balance"
          className="tnum text-ink text-[31px] leading-none font-bold tracking-[-0.035em]"
        >
          {usd(ACCOUNT.balance, true)}
        </span>
        <span className="text-muted text-[12.5px]">Total amount</span>
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Wave values={balanceWave(spanId)} label="Earnings trend" />
        <span className="bg-positive-soft text-positive inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12.5px] font-semibold">
          <Icon name="arrow-up" size={13} strokeWidth={2.2} />
          {ACCOUNT.delta}%
        </span>
        <span className="text-muted text-[12px] leading-[15px]">
          Always see
          <br />
          your earning updates
        </span>
      </div>

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <MonthBars
          months={months}
          format={(n) => usd(n)}
          label={`Money in over ${span.label}: ${months.map((m) => `${m.label} ${usd(m.earned)}`).join(', ')}`}
        />
      </div>
    </Card>
  );
}
