import { useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { RecurringPane } from '@/panes/RecurringPane';
import { TransactionsPane } from '@/panes/TransactionsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a very light grey ground; that surround
 * is a presentation effect and is dropped, so the panel's own ground is the
 * page and the sidebar runs to the window edge.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [mail, setMail] = useState(2);
  const [alerts, setAlerts] = useState(5);
  const [pro, setPro] = useState(false);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={go} pro={pro} onPro={() => setPro((v) => !v)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          mail={mail}
          onMail={() => setMail(0)}
          alerts={alerts}
          onAlerts={() => setAlerts(0)}
        />

        <main data-region="main" className="min-h-0 flex-1 p-5">
          {tab === 'dashboard' ? <DashboardPane query={query} onNavigate={go} /> : null}
          {tab === 'transactions' ? <TransactionsPane query={query} /> : null}
          {tab === 'recurring' ? <RecurringPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
