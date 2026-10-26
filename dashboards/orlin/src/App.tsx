import { useRef, useState } from 'react';

import { Rail, TopNav } from '@/components/Chrome';
import { SearchBox } from '@/components/Controls';
import type { TabId } from '@/nav';
import { ActivityPane } from '@/panes/ActivityPane';
import { DashboardPane } from '@/panes/DashboardPane';
import { WalletsPane } from '@/panes/WalletsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a flat grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page.
 *
 * Three pieces of state cross every pane, and all three are driven from the
 * left rail: the search, the watchlist filter and the mask.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [mail, setMail] = useState(3);
  const [alerts, setAlerts] = useState(2);
  const [collapsed, setCollapsed] = useState(false);
  const [starred, setStarred] = useState(false);
  const [masked, setMasked] = useState(false);
  const [shared, setShared] = useState(false);
  const search = useRef<HTMLDivElement>(null);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden px-5 pb-5">
      <TopNav
        active={tab}
        onSelect={go}
        mail={mail}
        onMail={() => setMail(0)}
        alerts={alerts}
        onAlerts={() => setAlerts(0)}
      />

      <div className="flex min-h-0 flex-1 gap-4">
        <Rail
          collapsed={collapsed}
          onCollapse={() => setCollapsed((v) => !v)}
          starred={starred}
          onStar={() => setStarred((v) => !v)}
          masked={masked}
          onMask={() => setMasked((v) => !v)}
          shared={shared}
          onShare={() => setShared((v) => !v)}
          onSearch={() => search.current?.querySelector('input')?.focus()}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div ref={search} className="flex shrink-0 justify-end">
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Search the ledger"
              className="w-[280px]"
            />
          </div>

          <main data-region="main" className="min-h-0 flex-1">
            {tab === 'dashboard' ? (
              <DashboardPane query={query} masked={masked} starred={starred} />
            ) : null}
            {tab === 'activity' ? (
              <ActivityPane query={query} masked={masked} starred={starred} />
            ) : null}
            {tab === 'wallets' ? (
              <WalletsPane query={query} masked={masked} starred={starred} />
            ) : null}
          </main>
        </div>
      </div>
    </div>
  );
}
