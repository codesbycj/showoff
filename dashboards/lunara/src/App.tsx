import { useState } from 'react';

import { Rail, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { ActivityPane } from '@/panes/ActivityPane';
import { MarketsPane } from '@/panes/MarketsPane';
import { OverviewPane } from '@/panes/OverviewPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a posed board with no surround to drop, so the layout is
 * the picture's own: an icon rail down the left, a header across the top, and
 * the page under both.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [alerts, setAlerts] = useState(2);

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Rail active={tab} onSelect={setTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar alerts={alerts} onAlerts={() => setAlerts((n) => (n ? 0 : 2))} />

        <main data-region="main" className="min-h-0 flex-1 px-7 py-6">
          {tab === 'overview' ? <OverviewPane /> : null}
          {tab === 'markets' ? <MarketsPane /> : null}
          {tab === 'activity' ? <ActivityPane /> : null}
        </main>
      </div>
    </div>
  );
}
