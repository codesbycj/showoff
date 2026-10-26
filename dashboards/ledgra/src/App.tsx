import { useState } from 'react';

import { Banner, Sidebar, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { HomePane } from '@/panes/HomePane';
import { StatementsPane } from '@/panes/StatementsPane';
import { TaxPane } from '@/panes/TaxPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a light grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page
 * and the sidebar runs to the window edge.
 *
 * The search lives on the Home pane rather than in the header, because that
 * is where the reference puts it — so it is held here and handed down.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [query, setQuery] = useState('');
  const [shared, setShared] = useState(false);
  const [upgraded, setUpgraded] = useState(false);
  const [banner, setBanner] = useState(true);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={go} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar tab={tab} shared={shared} onShare={() => setShared((v) => !v)} />

        <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
          {banner ? (
            <Banner
              taken={upgraded}
              onTake={() => setUpgraded((v) => !v)}
              onDismiss={() => setBanner(false)}
            />
          ) : null}

          <main data-region="main" className="min-h-0 flex-1">
            {tab === 'home' ? <HomePane query={query} onQuery={setQuery} onNavigate={go} /> : null}
            {tab === 'statements' ? <StatementsPane query={query} onQuery={setQuery} /> : null}
            {tab === 'tax' ? <TaxPane query={query} onQuery={setQuery} /> : null}
          </main>
        </div>
      </div>
    </div>
  );
}
