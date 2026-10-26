import { useState } from 'react';

import { Card, CardHead } from '@/components/Bits';
import { Button, IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACCOUNT, EXPENSES, SAVINGS, TXNS, WALLETS } from '@/data/deck';
import { BalanceCard, OverviewCard, PlansCard, StatCard, TxnTable } from '@/features/DashCards';

type SortKey = 'activity' | 'stamp' | 'price';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Two rows of `fr`, so the lower row takes whatever is left and the cards
 * reach the bottom of the shell at 900px and at 1080px alike.
 */
export function DashboardPane({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (tab: 'transactions') => void;
}) {
  const [walletId, setWalletId] = useState<string>(WALLETS[0].id);
  const [sent, setSent] = useState<'send' | 'request' | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [exported, setExported] = useState(false);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) =>
    q ? (t.activity + ' ' + t.category).toLowerCase().includes(q) : true,
  )
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'activity') return a.activity.localeCompare(b.activity) * -dir;
      if (sort === 'price') return (a.price - b.price) * dir;
      return (a.stamp - b.stamp) * dir;
    });

  const onSort = (key: SortKey) => {
    if (key === sort) setDesc((v) => !v);
    else {
      setSort(key);
      setDesc(true);
    }
  };

  return (
    <div data-pane="dashboard" className="flex h-full flex-col gap-4">
      <div className="flex shrink-0 flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-ink m-0 text-[24px] leading-none font-extrabold tracking-[-0.03em]">
            Welcome back {ACCOUNT.holder}
          </h2>
          <p className="text-muted m-0 mt-1.5 text-[12.5px]">
            Monitor and control what happens with your money today for financial health.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2.5">
          <p className="border-line bg-surface text-body m-0 flex items-center gap-2 rounded-[10px] border px-3 py-2 text-[12px] font-semibold">
            <Icon name="calendar" size={15} className="text-muted" />
            {ACCOUNT.date}
          </p>
          <Button
            icon={exported ? 'check' : 'export'}
            variant={exported ? 'accent' : 'solid'}
            name="export"
            onClick={() => setExported((v) => !v)}
          >
            {exported ? 'Exported' : 'Export'}
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-[1.22] grid-cols-[1fr_1.18fr] gap-4">
        <BalanceCard walletId={walletId} onWallet={setWalletId} sent={sent} onSend={setSent} />

        <div className="flex min-h-0 flex-col gap-4">
          <div className="grid shrink-0 grid-cols-2 gap-4">
            <StatCard
              label="Total Expenses"
              amount={EXPENSES.amount}
              delta={EXPENSES.delta}
              goodWhen="down"
              icon="trend-down"
            />
            <StatCard
              label="Total Savings"
              amount={SAVINGS.amount}
              delta={SAVINGS.delta}
              goodWhen="up"
              icon="wallet"
            />
          </div>
          <OverviewCard />
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.18fr] gap-4">
        <PlansCard open={plan} onOpen={setPlan} />

        <Card pane="recent" className="min-h-0 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title="Recent Transaction"
            icon={<Icon name="exchange" size={16} />}
            action={
              <IconButton
                icon="filter"
                label="Open the full ledger"
                tone="outline"
                size={34}
                onClick={() => onNavigate('transactions')}
              />
            }
          />
          <TxnTable
            rows={rows}
            query={query}
            sort={sort}
            desc={desc}
            onSort={onSort}
            scroller="recent"
          />
        </Card>
      </div>
    </div>
  );
}
