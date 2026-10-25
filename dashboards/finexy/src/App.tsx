import { useEffect, useState } from 'react';

import { Rail, type Theme } from '@/components/Rail';
import { Greeting, TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { ActivityPane } from '@/panes/ActivityPane';
import { ManagePane } from '@/panes/ManagePane';
import { OverviewPane } from '@/panes/OverviewPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The rail and the top nav are two presentations of the same tab state, which
 * is why both live here rather than either owning it.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [alerts, setAlerts] = useState(true);
  const [transfers, setTransfers] = useState(2);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen overflow-hidden">
      <Rail tab={tab} onTab={setTab} theme={theme} onTheme={setTheme} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar tab={tab} onTab={setTab} alerts={alerts} onAlerts={() => setAlerts(false)} />
        <Greeting live={transfers} />

        <main data-region="main" className="min-h-0 flex-1 px-5 pt-3 pb-5">
          {tab === 'overview' ? (
            <OverviewPane
              query={query}
              onQuery={setQuery}
              onTransfer={() => setTransfers((t) => t + 1)}
            />
          ) : null}
          {tab === 'activity' ? <ActivityPane query={query} onQuery={setQuery} /> : null}
          {tab === 'manage' ? <ManagePane onTransfer={() => setTransfers((t) => t + 1)} /> : null}
        </main>
      </div>
    </div>
  );
}
