import { useState } from 'react';

import { Card, CardHead } from '@/components/Bits';
import { IconButton, SelectPill } from '@/components/Controls';
import { SPANS, TXNS } from '@/data/deck';
import { BalanceCard } from '@/features/BalanceCard';
import { CashflowCard } from '@/features/CashflowCard';
import { DailyLimit } from '@/features/DailyLimit';
import { QuickActions } from '@/features/QuickActions';
import { RecentActivity } from '@/features/RecentActivity';
import { SavingPlansCard } from '@/features/SavingPlansCard';
import { StatCards } from '@/features/StatCards';
import { StatisticCard } from '@/features/StatisticCard';
import { TransactionTable, type SortKey } from '@/features/TransactionTable';
import { sortTxns } from '@/lib/sortTxns';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three columns with the middle one taking the slack, and every column a flex
 * stack whose last card is `flex-1` — so the three reach the bottom of the
 * shell together at 900px and at 1080px alike.
 */
export function DashboardPane({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (tab: 'transactions' | 'plans') => void;
}) {
  const [armed, setArmed] = useState<string | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [spanId, setSpanId] = useState(SPANS[0].id);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = sortTxns(
    TXNS.filter((t) =>
      q ? (t.name + ' ' + t.category + ' ' + t.note).toLowerCase().includes(q) : true,
    ),
    sort,
    desc,
  );

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="dashboard" className="grid h-full grid-cols-[264px_1fr_300px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <BalanceCard />
        <QuickActions armed={armed} onArm={setArmed} />
        <DailyLimit />
        <SavingPlansCard selected={plan} onSelect={setPlan} onAdd={() => onNavigate('plans')} />
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        <StatCards />
        <CashflowCard />

        <Card pane="recent" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Recent Transactions"
            action={
              <>
                <SelectPill
                  name="recent-span"
                  value={spanId}
                  options={SPANS.map((s) => ({ id: s.id, label: s.label }))}
                  onChange={setSpanId}
                />
                <IconButton
                  icon="filter"
                  label="Open the full ledger"
                  onClick={() => onNavigate('transactions')}
                />
              </>
            }
          />
          <TransactionTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="recent"
            compact
          />
        </Card>
      </div>

      <div className="flex min-h-0 flex-col gap-4">
        {/* The ring plus five legend rows needs more of the column than the
            activity list does; at 1:1 the last legend row was clipped. */}
        <div className="flex min-h-0 flex-[1.35] flex-col">
          <StatisticCard />
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <RecentActivity query={query} />
        </div>
      </div>
    </div>
  );
}
