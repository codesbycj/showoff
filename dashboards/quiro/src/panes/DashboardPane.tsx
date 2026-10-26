import { useState } from 'react';

import { Button } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ACCOUNT, PAYMENTS, WALLETS } from '@/data/deck';
import {
  BalanceCard,
  CreditCard,
  EngagementCard,
  GoalsCard,
  MandatoryCard,
  PaymentHistory,
  WalletCard,
  WeeklyRevenue,
} from '@/features/DashCards';

type SortKey = 'name' | 'stamp' | 'amount';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three columns of `fr`, each a flex stack, so all three reach the bottom of
 * the shell together at 900px and at 1080px alike.
 */
export function DashboardPane({
  query,
  onNavigate,
}: {
  query: string;
  onNavigate: (tab: 'history') => void;
}) {
  const [walletId, setWalletId] = useState(WALLETS[0].id);
  const [sent, setSent] = useState(false);
  const [payee, setPayee] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [sort, setSort] = useState<SortKey>('stamp');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = PAYMENTS.filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'amount') return (a.amount - b.amount) * dir;
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
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
        <h2 className="text-ink m-0 text-[30px] leading-none font-bold tracking-[-0.035em]">
          Welcome Back, <span className="text-muted font-semibold">{ACCOUNT.first}</span>
        </h2>

        <div className="flex shrink-0 items-center gap-2.5">
          <p className="border-line bg-surface text-body m-0 flex items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold">
            <Icon name="calendar" size={15} className="text-muted" />
            {ACCOUNT.range}
            <Icon name="chevron-down" size={13} className="text-muted" strokeWidth={2.2} />
          </p>
          <Button
            icon={added ? 'check' : 'plus'}
            variant={added ? 'accent' : 'solid'}
            name="add-wallet"
            onClick={() => setAdded((v) => !v)}
          >
            {added ? 'Wallet added' : 'Add New Wallet'}
          </Button>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[274px_1fr_298px] gap-4">
        <div className="flex min-h-0 flex-col gap-4">
          <WalletCard walletId={walletId} />
          <GoalsCard walletId={walletId} onWallet={setWalletId} />
          <WeeklyRevenue />
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <EngagementCard />
          <PaymentHistory rows={rows} query={query} sort={sort} desc={desc} onSort={onSort} />
        </div>

        <div className="flex min-h-0 flex-col gap-4">
          <BalanceCard sent={sent} onSend={() => setSent((v) => !v)} />
          <CreditCard />
          <MandatoryCard selected={payee} onSelect={setPayee} />
          <button
            type="button"
            data-action="open-history"
            onClick={() => onNavigate('history')}
            className="text-accent-deep hover:bg-accent-faint flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full text-[12.5px] font-bold transition-colors"
          >
            See the full history
            <Icon name="chevron-right" size={14} strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </div>
  );
}
