import { useState } from 'react';

import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { CardsPane } from '@/panes/CardsPane';
import { OverviewPane } from '@/panes/OverviewPane';
import { WealthPane } from '@/panes/WealthPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own pale ground is the
 * page. What is left to hold here is what crosses panes: the tab, the search,
 * and the notification count.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [alerts, setAlerts] = useState(24);

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden px-5 pb-5">
      <TopBar
        tab={tab}
        onSelect={(next) => {
          setTab(next);
          setQuery('');
        }}
        query={query}
        onQuery={setQuery}
        searchOpen={searchOpen}
        onSearchOpen={setSearchOpen}
        alerts={alerts}
        onAlerts={() => setAlerts(0)}
      />

      <main data-region="main" className="min-h-0 flex-1">
        {tab === 'overview' ? <OverviewPane query={query} /> : null}
        {tab === 'wealth' ? <WealthPane query={query} /> : null}
        {tab === 'cards' ? <CardsPane query={query} /> : null}
      </main>
    </div>
  );
}
