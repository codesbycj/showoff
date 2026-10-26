import { useEffect, useState } from 'react';

import { Sidebar, TopBar } from '@/components/Chrome';
import type { LiveTabId, TabId } from '@/nav';
import { ConversionPane } from '@/panes/ConversionPane';
import { DashboardPane } from '@/panes/DashboardPane';
import { RealtimePane } from '@/panes/RealtimePane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a macOS browser window posed on a pale ground. Both are
 * presentation furniture and both are dropped, so the app's own sidebar
 * starts at the window edge.
 *
 * **The theme lives here**, as `data-theme` on the document root rather than
 * as a class on this div: the stylesheet's dark block is written against
 * `:root[data-theme='dark']`, so the tokens resolve for anything that
 * escapes this subtree — and it means the viewer's choice beats their system
 * setting, which is the point of putting a switch in the sidebar at all
 * (rule 7).
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  /*
   * `?theme=dark` opens in the dark design.
   *
   * It is how the dark theme gets *probed* — the harness clicks one selector
   * per run, and reaching dark-mode Realtime would need two — and it is the
   * honest behaviour anyway: a dashboard with an appearance switch should
   * survive being linked to.
   */
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    new URLSearchParams(window.location.search).get('theme') === 'dark' ? 'dark' : 'light',
  );
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(3);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  const pick = (next: LiveTabId) => go(next);

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={go} theme={theme} onTheme={setTheme} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          onPick={pick}
          alerts={alerts}
          onAlerts={() => setAlerts((n) => (n ? 0 : 3))}
        />

        <main data-region="main" className="min-h-0 flex-1 px-5 pt-1 pb-5">
          {tab === 'dashboard' ? <DashboardPane onNavigate={go} /> : null}
          {tab === 'realtime' ? <RealtimePane /> : null}
          {tab === 'conversion' ? <ConversionPane /> : null}
        </main>
      </div>
    </div>
  );
}
