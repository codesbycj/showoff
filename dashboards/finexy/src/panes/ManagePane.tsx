import { BalanceCard } from '@/features/BalanceCard';
import { IncomeCard } from '@/features/IncomeCard';
import { MyCards, SpendingLimit } from '@/features/LimitAndCards';

/**
 * Manage: the wallets, the cards and the limit at the size they deserve.
 *
 * On the Overview all three are summaries squeezed down the left; here each one
 * has room — which is the whole reason this is one of the three built tabs
 * rather than another page of the same ledger.
 */
export function ManagePane({ onTransfer }: { onTransfer: () => void }) {
  return (
    <div
      data-pane="manage"
      className="grid h-full grid-cols-[minmax(320px,400px)_minmax(0,1fr)] grid-rows-[minmax(0,1fr)_minmax(0,0.9fr)] gap-4"
    >
      <div className="row-span-2 min-h-0">
        <BalanceCard onTransfer={onTransfer} />
      </div>

      <IncomeCard />

      <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-4">
        <SpendingLimit />
        <MyCards />
      </div>
    </div>
  );
}
