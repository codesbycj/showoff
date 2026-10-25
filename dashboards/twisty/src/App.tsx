import { useState } from 'react';

import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { HomePane } from '@/panes/HomePane';
import { ProjectsPane } from '@/panes/ProjectsPane';
import { WalletPane } from '@/panes/WalletPane';

/**
 * The shell. 100vh, and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why `probe.js` treats a scrolling
 * document as a defect.
 *
 * It holds the three pieces of state that cross panes -- which tab is showing,
 * what is in the search box, and whether the bell has been cleared -- and
 * nothing else. Every component below is presentational: the pane decides what
 * a selection does, the component just reports it (rule 4).
 */
export function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [query, setQuery] = useState('');
  const [notifications, setNotifications] = useState(true);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen flex-col overflow-hidden">
      <TopBar
        tab={tab}
        onTab={setTab}
        query={query}
        onQuery={setQuery}
        notifications={notifications}
        onNotifications={() => setNotifications(false)}
      />

      <main data-region="main" className="min-h-0 flex-1 px-8 pb-7">
        {tab === 'home' ? <HomePane query={query} /> : null}
        {tab === 'projects' ? <ProjectsPane query={query} /> : null}
        {tab === 'wallet' ? <WalletPane query={query} /> : null}
      </main>
    </div>
  );
}
