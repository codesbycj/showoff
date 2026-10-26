import { useState } from 'react';

import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { PlansPane } from '@/panes/PlansPane';
import { TransactionsPane } from '@/panes/TransactionsPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * This is the one flat UI export in the batch, so the frame is the reference's
 * own: a fixed sidebar, a header, the pane, and the footer the picture ends
 * on — which is why the footer is part of the shell rather than something each
 * pane re-draws.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [query, setQuery] = useState('');
  const [alerts, setAlerts] = useState(4);
  const [messages, setMessages] = useState(2);
  const [pro, setPro] = useState(false);

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={setTab} pro={pro} onPro={() => setPro((v) => !v)} />

      <div className="flex min-w-0 flex-1 flex-col px-5">
        <TopBar
          tab={tab}
          query={query}
          onQuery={setQuery}
          alerts={alerts}
          onAlerts={() => setAlerts(0)}
          messages={messages}
          onMessages={() => setMessages(0)}
        />

        <main data-region="main" className="min-h-0 flex-1 pb-1">
          {tab === 'dashboard' ? (
            <DashboardPane
              query={query}
              onNavigate={(next) => {
                setTab(next);
                setQuery('');
              }}
            />
          ) : null}
          {tab === 'transactions' ? <TransactionsPane query={query} /> : null}
          {tab === 'plans' ? <PlansPane query={query} /> : null}
        </main>

        <Footer />
      </div>
    </div>
  );
}
