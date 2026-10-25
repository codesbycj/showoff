import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { TopBar, type Theme } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { OrdersPane } from '@/panes/OrdersPane';
import { ProductsPane } from '@/panes/ProductsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why `probe.js` treats a scrolling
 * document as a defect.
 *
 * It holds the four pieces of state that cross panes — the tab, the search box,
 * the theme and whether the bell has been cleared — and nothing else.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [alerts, setAlerts] = useState(true);

  // Writing to the document is what an effect is actually for: synchronising an
  // external system with React state, rather than setting more state.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={setTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          query={query}
          onQuery={setQuery}
          theme={theme}
          onTheme={setTheme}
          alerts={alerts}
          onAlerts={() => setAlerts(false)}
        />

        <main data-region="main" className="min-h-0 flex-1 px-6 pb-6">
          {tab === 'dashboard' ? <DashboardPane query={query} /> : null}
          {tab === 'products' ? <ProductsPane query={query} /> : null}
          {tab === 'orders' ? <OrdersPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
