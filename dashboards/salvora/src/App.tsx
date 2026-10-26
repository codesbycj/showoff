import { useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { CustomersPane } from '@/panes/CustomersPane';
import { OverviewPane } from '@/panes/OverviewPane';
import { TransactionsPane } from '@/panes/TransactionsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * The board's rounded panel floats on a flat grey ground; that surround is a
 * presentation effect and is dropped, so the panel's own ground is the page —
 * but the sidebar keeps its rounded corners, because in this design it is a
 * dark panel sitting *on* that ground rather than a rail attached to the edge.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [query, setQuery] = useState('');
  const [added, setAdded] = useState(false);
  const [inbox, setInbox] = useState(5);

  return (
    <div data-shell className="flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Sidebar
        active={tab}
        onSelect={(next) => {
          setTab(next);
          setQuery('');
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          added={added}
          onAdd={() => setAdded((v) => !v)}
          inbox={inbox}
          onInbox={() => setInbox(0)}
        />

        <main data-region="main" className="min-h-0 flex-1">
          {tab === 'overview' ? (
            <OverviewPane
              query={query}
              onNavigate={(next) => {
                setTab(next);
                setQuery('');
              }}
            />
          ) : null}
          {tab === 'transactions' ? <TransactionsPane query={query} /> : null}
          {tab === 'customers' ? <CustomersPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
