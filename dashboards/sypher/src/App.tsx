import { useState } from 'react';

import { TopNav } from '@/components/TopNav';
import type { RangeId } from '@/data/deck';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { FinancialsPane } from '@/panes/FinancialsPane';
import { FleetPane } from '@/panes/FleetPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * It holds the four pieces of state that cross panes — the tab, the date range
 * from the strip under the nav, the invoice search and whether a report has
 * been queued.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [range, setRange] = useState<RangeId>('month');
  const [query, setQuery] = useState('');
  const [reporting, setReporting] = useState(false);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen flex-col overflow-hidden">
      <TopNav
        tab={tab}
        onTab={setTab}
        range={range}
        onRange={setRange}
        reporting={reporting}
        onReport={() => setReporting((v) => !v)}
      />

      <main data-region="main" className="min-h-0 flex-1 p-3">
        {tab === 'dashboard' ? (
          <DashboardPane range={range} query={query} onQuery={setQuery} />
        ) : null}
        {tab === 'financials' ? <FinancialsPane range={range} /> : null}
        {tab === 'fleet' ? <FleetPane query={query} onQuery={setQuery} /> : null}
      </main>
    </div>
  );
}
