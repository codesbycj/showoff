import { useState } from 'react';

import { Nav } from '@/components/Nav';
import { TopBar } from '@/components/TopBar';
import { CARDS } from '@/data/deck';
import type { TabId } from '@/nav';
import { HistoryPane } from '@/panes/HistoryPane';
import { HomePane } from '@/panes/HomePane';
import { WalletPane } from '@/panes/WalletPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a warm grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page.
 * What is held here is what crosses panes: the tab, the search, the unread
 * count, and which card is selected — Home shows it and Wallet opens it, so
 * switching tabs must not lose it.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(3);
  const [cardId, setCardId] = useState(CARDS[0].id);

  return (
    <div data-shell className="flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Nav
        active={tab}
        onSelect={(next) => {
          setTab(next);
          setQuery('');
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          alerts={alerts}
          onAlerts={() => setAlerts(0)}
        />

        <main data-region="main" className="min-h-0 flex-1">
          {tab === 'home' ? (
            <HomePane query={query} cardId={cardId} onCard={setCardId} onNavigate={setTab} />
          ) : null}
          {tab === 'history' ? <HistoryPane query={query} /> : null}
          {tab === 'wallet' ? (
            <WalletPane query={query} cardId={cardId} onCard={setCardId} />
          ) : null}
        </main>
      </div>
    </div>
  );
}
