import { BalanceCard } from '@/features/BalanceCard';
import { IncomeMix } from '@/features/IncomeMix';
import { PayoutHistory } from '@/features/PayoutHistory';

/**
 * Wallet. The same three-column rhythm as Home -- a wide block across two
 * columns, a tall card down the right, and the list underneath -- so moving
 * between tabs does not feel like moving between apps.
 */
export function WalletPane({ query }: { query: string }) {
  return (
    <div
      data-pane="wallet"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(360px,404px)] grid-rows-[minmax(0,0.78fr)_minmax(0,1fr)] gap-5"
    >
      <BalanceCard />
      <IncomeMix />
      <PayoutHistory query={query} />
    </div>
  );
}
