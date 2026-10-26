import { useMemo, useState } from 'react';

import { CashflowBars } from '@/charts/CashflowBars';
import { Card, CardHead } from '@/components/Bits';
import { SelectPill } from '@/components/Controls';
import { YEARS, cashflow } from '@/data/deck';
import { usd } from '@/lib/format';

/** Cashflow over a year. The year control really changes the series. */
export function CashflowCard() {
  const [yearId, setYearId] = useState(YEARS[0].id);
  const months = useMemo(() => cashflow(yearId), [yearId]);
  const net = months.reduce((t, m) => t + m.income - m.expense, 0);

  return (
    <Card pane="cashflow" className="min-h-0 flex-1 p-4">
      <CardHead
        title="Cashflow"
        action={
          <>
            <Legend tone="var(--color-forest)" label="Income" />
            <Legend tone="var(--color-accent)" label="Expense" />
            <SelectPill
              name="year"
              value={yearId}
              options={YEARS.map((y) => ({ id: y.id, label: y.label }))}
              onChange={setYearId}
            />
          </>
        }
      />

      <p className="m-0 mt-2.5">
        <span className="text-muted block text-[11px]">Total Balance</span>
        <span
          data-figure="cashflow-net"
          className="tnum text-ink mt-0.5 block text-[21px] leading-none font-extrabold tracking-[-0.025em]"
        >
          {usd(net)}
        </span>
      </p>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <CashflowBars
          months={months}
          label={
            'Cashflow by month: ' +
            months.map((m) => `${m.label} in ${usd(m.income)}, out ${usd(m.expense)}`).join('; ')
          }
        />
      </div>
    </Card>
  );
}

function Legend({ tone, label }: { tone: string; label: string }) {
  return (
    <span className="text-body flex items-center gap-1.5 text-[11.5px] font-semibold">
      <span aria-hidden="true" style={{ background: tone }} className="h-2 w-2 rounded-full" />
      {label}
    </span>
  );
}
