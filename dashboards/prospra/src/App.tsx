import { useState } from 'react';

import { TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { DashboardPane } from '@/panes/DashboardPane';
import { LeadsPane } from '@/panes/LeadsPane';
import { SalesPane } from '@/panes/SalesPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a browser window posed on a pale board. Both are
 * presentation furniture and both are dropped, so the app's own header runs
 * to the window edge.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [messages, setMessages] = useState(4);

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar
        active={tab}
        onSelect={setTab}
        messages={messages}
        onMessages={() => setMessages((n) => (n ? 0 : 4))}
      />

      <main data-region="main" className="min-h-0 flex-1 px-7 pb-6">
        {tab === 'dashboard' ? <DashboardPane onNavigate={setTab} /> : null}
        {tab === 'leads' ? <LeadsPane onOpenDeal={() => setTab('sales')} /> : null}
        {tab === 'sales' ? <SalesPane /> : null}
      </main>
    </div>
  );
}
