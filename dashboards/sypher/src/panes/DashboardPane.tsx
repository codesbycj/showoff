import { BalanceCard, CostsCard } from '@/features/BalanceAndCosts';
import { DeliveriesCard } from '@/features/DeliveriesCard';
import { InvoicesCard } from '@/features/InvoicesCard';
import { RevenueCosts } from '@/features/RevenueCosts';
import type { RangeId } from '@/data/deck';

/**
 * The screen that was dropped. Assembly only (rule 4): four imports and a grid.
 *
 * The arrangement is the reference's own — operations stacked down the left,
 * the ledger down the right — laid out in fractions of the viewport rather than
 * at the board's pixel sizes.
 */
export function DashboardPane({
  range,
  query,
  onQuery,
}: {
  range: RangeId;
  query: string;
  onQuery: (q: string) => void;
}) {
  return (
    <div data-pane="dashboard" className="grid h-full grid-cols-2 gap-3">
      <div className="flex min-h-0 min-w-0 flex-col gap-3">
        <DeliveriesCard range={range} />
        <RevenueCosts range={range} />
        <div className="grid min-h-0 shrink-0 grid-cols-2 gap-3" style={{ height: 232 }}>
          <BalanceCard />
          <CostsCard />
        </div>
      </div>

      <InvoicesCard query={query} onQuery={onQuery} />
    </div>
  );
}
