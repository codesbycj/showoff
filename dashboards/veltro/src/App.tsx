import { useState } from 'react';

import { Sidebar, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { OrdersPane } from '@/panes/OrdersPane';
import { ProductsPane } from '@/panes/ProductsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a near-white ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page
 * and the sidebar runs to the window edge.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(4);
  const [exported, setExported] = useState(false);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={go} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          alerts={alerts}
          onAlerts={() => setAlerts(0)}
          exported={exported}
          onExport={() => setExported((v) => !v)}
        />

        <main data-region="main" className="min-h-0 flex-1 p-4">
          {tab === 'dashboard' ? <DashboardPane query={query} onNavigate={go} /> : null}
          {tab === 'products' ? <ProductsPane query={query} /> : null}
          {tab === 'orders' ? <OrdersPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
