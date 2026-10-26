import { useState } from 'react';

import { Sidebar, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { OverviewPane } from '@/panes/OverviewPane';
import { ProjectionPane } from '@/panes/ProjectionPane';
import { SavingsPane } from '@/panes/SavingsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The reference is a browser window on a grey board — traffic lights, a back
 * arrow, a URL bar. The chrome is a presentation effect exactly as the board
 * is, so both are dropped and the page starts at the app's own header.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [shared, setShared] = useState(false);
  const [trial, setTrial] = useState(false);

  const go = (next: TabId) => {
    setTab(next);
    setQuery('');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar
        tab={tab}
        query={query}
        onQuery={setQuery}
        shared={shared}
        onShare={() => setShared((v) => !v)}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar active={tab} onSelect={go} trial={trial} onTrial={() => setTrial((v) => !v)} />

        <main data-region="main" className="min-h-0 min-w-0 flex-1 p-5">
          {tab === 'overview' ? <OverviewPane query={query} /> : null}
          {tab === 'projection' ? <ProjectionPane query={query} /> : null}
          {tab === 'savings' ? <SavingsPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
