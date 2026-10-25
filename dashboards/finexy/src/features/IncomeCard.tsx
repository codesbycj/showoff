import { useState } from 'react';

import { ProfitLossBars } from '@/charts/ProfitLossBars';
import { Card, CardHead } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { PERIODS, PROFIT_LOSS, type PeriodId } from '@/data/deck';
import { usd } from '@/lib/format';

/**
 * Profit against loss over the period.
 *
 * The period control is real — eight months or four quarters, two different
 * series — and the two figures under the legend are summed from whichever one
 * is showing, so they can never disagree with the bars above them.
 */
export function IncomeCard() {
  const [period, setPeriod] = useState<PeriodId>('months');
  const [active, setActive] = useState<number | null>(null);

  const months = PROFIT_LOSS[period];
  const profit = months.reduce((t, m) => t + m.profit, 0);
  const loss = months.reduce((t, m) => t + m.loss, 0);

  return (
    <Card pane="income" className="min-h-0 p-5">
      <CardHead
        title="Total Income"
        sub="View your income in a certain period of time"
        action={<Segmented name="Period" value={period} options={PERIODS} onChange={setPeriod} />}
      />

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-ink m-0 text-[13px] font-bold">Profit and Loss</p>
        <ul className="text-muted m-0 flex list-none items-center gap-4 p-0 text-[12px] font-semibold">
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="bg-ink h-2.5 w-2.5 rounded-full" />
            Profit {usd(profit)}
          </li>
          <li className="flex items-center gap-1.5">
            <span aria-hidden="true" className="bg-accent h-2.5 w-2.5 rounded-full" />
            Loss {usd(loss)}
          </li>
        </ul>
      </div>

      <div className="mt-2 min-h-0 flex-1">
        <ProfitLossBars months={months} active={active} onActive={setActive} />
      </div>
    </Card>
  );
}
