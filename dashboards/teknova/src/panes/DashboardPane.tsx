import { ProfitOverview } from '@/features/ProfitOverview';
import { RecentTransactions } from '@/features/RecentTransactions';
import { SalesPerformance } from '@/features/SalesPerformance';
import { TopMarket } from '@/features/TopMarket';
import { TopProduct } from '@/features/TopProduct';

/**
 * The screen that was dropped. Assembly only (rule 4): five imports and a grid.
 *
 * The arrangement is the reference's own — the profit chart across two columns,
 * the gauge down the right, the table under it, and the market and product
 * cards stacked beside the table — laid out in fractions of the viewport rather
 * than at the board's pixel sizes.
 */
export function DashboardPane({ query }: { query: string }) {
  return (
    <div
      data-pane="dashboard"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,336px)] grid-rows-[minmax(0,1.08fr)_minmax(0,1fr)] gap-4"
    >
      <ProfitOverview />
      <SalesPerformance />
      <RecentTransactions query={query} />
      <div className="flex min-h-0 min-w-0 flex-col gap-4">
        <TopMarket />
        <TopProduct />
      </div>
    </div>
  );
}
