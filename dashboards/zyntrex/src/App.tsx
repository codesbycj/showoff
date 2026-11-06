import { useEffect, useState } from 'react';

import { TopBar } from '@/components/Chrome';
import { WATCHED } from '@/data/deck';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { MarketPane } from '@/panes/MarketPane';
import { TradePane } from '@/panes/TradePane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a browser window posed on a grey board with the designer's
 * own chrome around it; the board, the chrome and the window frame are
 * presentation furniture, so the desk runs to the window edge.
 *
 * Three pieces of state live here because they cross tabs: the pair the Trade
 * surface is on (a row on Market opens it), the watchlist (Market sets it) and
 * the header's search, which filters whichever tab is showing.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [symbol, setSymbol] = useState('BTC');
  const [watchlist, setWatchlist] = useState<string[]>(WATCHED);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const openTrade = (next: string) => {
    setSymbol(next);
    setTab('trade');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar
        active={tab}
        onSelect={setTab}
        theme={theme}
        onTheme={setTheme}
        query={query}
        onQuery={setQuery}
      />

      <main data-region="main" className="min-h-0 min-w-0 flex-1 px-5 py-4">
        {tab === 'dashboard' ? <DashboardPane query={query} onOpenTrade={openTrade} /> : null}
        {tab === 'trade' ? <TradePane symbol={symbol} onSymbol={setSymbol} /> : null}
        {tab === 'market' ? (
          <MarketPane
            query={query}
            watchlist={watchlist}
            onWatch={(s) =>
              setWatchlist((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
            }
            onOpenTrade={openTrade}
          />
        ) : null}
      </main>
    </div>
  );
}
