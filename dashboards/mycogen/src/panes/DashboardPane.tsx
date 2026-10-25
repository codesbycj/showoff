import {
  ActivePromotions,
  CustomerInsights,
  QuickActions,
  SalesAnalytics,
  StatGrid,
} from '@/features/Overview';
import type { TabId } from '@/nav';

/**
 * The screen that was dropped. Assembly only (rule 4): five imports and a grid.
 *
 * The arrangement is the reference's own — the shortcuts across the top, the
 * six figures and the chart down the left, the customer column on the right —
 * laid out in fractions of the viewport rather than at the board's pixel sizes.
 */
export function DashboardPane({ onNavigate }: { onNavigate: (id: TabId) => void }) {
  return (
    <div data-pane="dashboard" className="flex h-full flex-col gap-3">
      <QuickActions onPick={() => {}} />

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(280px,320px)] grid-rows-[minmax(0,0.85fr)_minmax(0,1fr)] gap-3">
        <div className="col-span-2 min-h-0">
          <StatGrid />
        </div>
        <div className="row-span-2 flex min-h-0 min-w-0 flex-col gap-3">
          <CustomerInsights onOpen={() => onNavigate('customers')} />
          <div className="h-[170px] shrink-0">
            <ActivePromotions />
          </div>
        </div>
        <div className="col-span-2 min-h-0">
          <SalesAnalytics />
        </div>
      </div>
    </div>
  );
}
