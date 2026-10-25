import { AssistantCard } from '@/features/AssistantCard';
import { CalendarCard } from '@/features/CalendarCard';
import { InvoicesCard } from '@/features/InvoicesCard';
import { RevenueCard } from '@/features/RevenueCard';
import { SpendingCard } from '@/features/SpendingCard';
import type { TabId } from '@/nav';

/**
 * The screen that was dropped. Assembly only (rule 4): five imports, a grid,
 * and the one decision a pane is allowed to make — where "View all invoices"
 * goes.
 */
export function OverviewPane({ onNavigate }: { onNavigate: (id: TabId) => void }) {
  return (
    <div
      data-pane="overview"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,340px)] grid-rows-[minmax(0,1.05fr)_minmax(0,1fr)] gap-4"
    >
      <RevenueCard />
      <CalendarCard />
      <AssistantCard />
      <SpendingCard />
      <InvoicesCard onViewAll={() => onNavigate('invoices')} />
    </div>
  );
}
