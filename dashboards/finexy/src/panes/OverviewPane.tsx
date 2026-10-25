import { FIGURES } from '@/data/deck';
import { Activities } from '@/features/Activities';
import { BalanceCard, FigureTiles } from '@/features/BalanceCard';
import { IncomeCard } from '@/features/IncomeCard';
import { MyCards, SpendingLimit } from '@/features/LimitAndCards';

/**
 * The screen that was dropped. Assembly only (rule 4): five imports and a grid.
 *
 * The arrangement is the reference's own — the account down the left, the
 * figures and the chart across the top, the ledger underneath — laid out in
 * fractions of the viewport rather than at the board's pixel sizes.
 */
export function OverviewPane({
  query,
  onQuery,
  onTransfer,
}: {
  query: string;
  onQuery: (q: string) => void;
  onTransfer: () => void;
}) {
  return (
    <div
      data-pane="overview"
      className="grid h-full grid-cols-[minmax(320px,370px)_minmax(0,1fr)_minmax(0,1.15fr)] grid-rows-[minmax(0,1.16fr)_minmax(0,1fr)] gap-4"
    >
      <BalanceCard onTransfer={onTransfer} />
      <FigureTiles figures={FIGURES} />
      <IncomeCard />

      <div className="flex min-h-0 min-w-0 flex-col gap-4">
        <SpendingLimit />
        <MyCards />
      </div>

      <div className="col-span-2 min-h-0 min-w-0">
        <Activities query={query} onQuery={onQuery} compact />
      </div>
    </div>
  );
}
