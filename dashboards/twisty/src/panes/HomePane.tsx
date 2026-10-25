import { IncomeTracker } from '@/features/IncomeTracker';
import { LetsConnect } from '@/features/LetsConnect';
import { PremiumCard } from '@/features/PremiumCard';
import { ProposalProgress } from '@/features/ProposalProgress';
import { RecentProjects } from '@/features/RecentProjects';

/**
 * The screen that was dropped. Assembly only (rule 4): five imports and a grid.
 *
 * The grid is the reference's own arrangement -- the tracker across two
 * columns, the project list down the right, and three blocks under them -- laid
 * out in fractions of the viewport rather than at the board's pixel sizes, so
 * it fills a real 1440x900 browser and still holds at 1280 and 1920.
 */
export function HomePane({ query }: { query: string }) {
  return (
    <div
      data-pane="home"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(360px,404px)] grid-rows-[minmax(0,1.58fr)_minmax(0,1fr)] gap-5"
    >
      <IncomeTracker />
      <RecentProjects query={query} />
      <LetsConnect />
      <PremiumCard />
      <ProposalProgress />
    </div>
  );
}
