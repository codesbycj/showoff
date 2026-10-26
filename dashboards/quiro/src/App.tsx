import { useState } from 'react';

import { Rail, TopNav } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { HistoryPane } from '@/panes/HistoryPane';
import { ReportsPane } from '@/panes/ReportsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a flat grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page.
 * The header and the rail keep their pill shapes, because in this design they
 * are floating controls rather than edges of the window.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(3);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col gap-4 overflow-hidden p-4">
      <TopNav
        active={tab}
        onSelect={go}
        query={query}
        onQuery={setQuery}
        alerts={alerts}
        onAlerts={() => setAlerts(0)}
      />

      <div className="flex min-h-0 flex-1 gap-4">
        <Rail active={tab} onSelect={go} />

        <main data-region="main" className="min-h-0 min-w-0 flex-1">
          {tab === 'dashboard' ? <DashboardPane query={query} onNavigate={go} /> : null}
          {tab === 'reports' ? <ReportsPane query={query} /> : null}
          {tab === 'history' ? <HistoryPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
