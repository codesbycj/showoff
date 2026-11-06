import { useState } from 'react';

import { Sidebar, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { CompaniesPane } from '@/panes/CompaniesPane';
import { InvestmentsPane } from '@/panes/InvestmentsPane';
import { SyndicatesPane } from '@/panes/SyndicatesPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a rendered mock-up on a grey board; the board is dropped,
 * and the sidebar and header are the picture's own.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('investments');
  const [mail, setMail] = useState(3);

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          active={tab}
          onSelect={setTab}
          mail={mail}
          onMail={() => setMail((n) => (n ? 0 : 3))}
        />

        <main data-region="main" className="min-h-0 flex-1 px-6 pb-6">
          {tab === 'investments' ? <InvestmentsPane /> : null}
          {tab === 'syndicates' ? <SyndicatesPane /> : null}
          {tab === 'companies' ? <CompaniesPane /> : null}
        </main>
      </div>
    </div>
  );
}
