import { useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { CustomersPane } from '@/panes/CustomersPane';
import { DashboardPane } from '@/panes/DashboardPane';
import { OrdersPane } from '@/panes/OrdersPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * It holds the five pieces of state that cross panes — the tab, the search box,
 * the unread count, and whether the two primary actions have been used.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(3);
  const [placed, setPlaced] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={setTab} onAdd={() => setAdded((v) => !v)} added={added} />

      <div className="flex min-w-0 flex-1 flex-col pr-4 pb-4">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          alerts={alerts}
          onAlerts={() => setAlerts(0)}
          onNewOrder={() => setPlaced((v) => !v)}
          placed={placed}
        />

        <main data-region="main" className="min-h-0 flex-1">
          {tab === 'dashboard' ? <DashboardPane onNavigate={setTab} /> : null}
          {tab === 'orders' ? <OrdersPane query={query} /> : null}
          {tab === 'customers' ? <CustomersPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
