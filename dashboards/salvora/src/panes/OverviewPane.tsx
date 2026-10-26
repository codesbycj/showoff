import { useState } from 'react';

import { Icon } from '@/components/Icon';
import { RANGE, TXNS, txnTotal } from '@/data/deck';
import {
  MoneyCard,
  PerformanceCard,
  PulseCard,
  RevenueCard,
  SalesReportCard,
  TransactionList,
  UpsellCard,
} from '@/features/OverviewCards';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three columns, each a flex stack whose cards share the slack, so all three
 * reach the bottom of the shell together at 900px and at 1080px alike.
 *
 * Net Income and Total Return are summed from the ledger rather than written
 * down — the reference prints $193.000 here and again as the Revenue card's
 * headline over twelve months of bars that are nothing like it.
 */
export function OverviewPane({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (tab: 'transactions' | 'customers') => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [guided, setGuided] = useState(false);
  const [plus, setPlus] = useState(false);

  const settled = TXNS.filter((t) => t.status === 'Completed');
  const refunded = TXNS.filter((t) => t.status === 'Refunded');
  const netIncome = settled.reduce((s, t) => s + txnTotal(t), 0);
  const totalReturn = refunded.reduce((s, t) => s + txnTotal(t), 0);

  return (
    <div data-pane="overview" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[24px] leading-none font-extrabold tracking-[-0.03em]">
            Dashboard
          </h2>
          <p className="text-muted m-0 mt-1.5 text-[12.5px]">
            An any way to manage sales with care and precision.
          </p>
        </div>
        <p className="border-line text-body m-0 flex shrink-0 items-center gap-2 rounded-[10px] border px-3 py-2 text-[12px] font-semibold">
          <Icon name="calendar" size={15} className="text-muted" />
          {RANGE}
        </p>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[272px_1fr_258px] gap-4">
        <TransactionList
          query={query}
          open={open}
          onOpen={setOpen}
          onSeeAll={() => onNavigate('transactions')}
        />

        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid shrink-0 grid-cols-3 gap-4">
            <PulseCard onSeeStats={() => onNavigate('transactions')} />
            <MoneyCard label="Net Income" value={netIncome} delta={35} />
            <MoneyCard label="Total Return" value={totalReturn} delta={-24} goodWhen="down" />
          </div>
          <RevenueCard />
          <SalesReportCard />
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <PerformanceCard guided={guided} onGuide={() => setGuided((v) => !v)} />
          <UpsellCard taken={plus} onTake={() => setPlus((v) => !v)} />
        </div>
      </div>
    </div>
  );
}
