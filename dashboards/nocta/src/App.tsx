import { useState } from 'react';

import { Rail } from '@/components/Rail';
import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { InvoicesPane } from '@/panes/InvoicesPane';
import { OverviewPane } from '@/panes/OverviewPane';
import { TransactionsPane } from '@/panes/TransactionsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why `probe.js` treats a scrolling
 * document as a defect.
 *
 * The rail is a floating panel with the board showing around it, which is the
 * one piece of the reference's posed composition worth keeping at real size —
 * it is how the design separates navigation from content.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(true);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Rail active={tab} onSelect={setTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          alerts={alerts}
          onAlerts={() => setAlerts(false)}
        />

        <main data-region="main" className="min-h-0 flex-1 pb-1">
          {tab === 'overview' ? <OverviewPane onNavigate={setTab} /> : null}
          {tab === 'transactions' ? <TransactionsPane query={query} /> : null}
          {tab === 'invoices' ? <InvoicesPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
