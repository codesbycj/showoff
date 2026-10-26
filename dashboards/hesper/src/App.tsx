import { useState } from 'react';

import { TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { OverviewPane } from '@/panes/OverviewPane';
import { PaymentsPane } from '@/panes/PaymentsPane';
import { TasksPane } from '@/panes/TasksPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a macOS browser window posed on a pale ground. Both are
 * presentation furniture and both are dropped, so the app's own header runs
 * to the window edge.
 *
 * **`focusMatter` is held here, not in the Task pane**, because three places
 * open a matter: a row in the Overview table, a case in Progress Case, and
 * the header's quick find. Each hands the shell an id, the shell switches
 * tab, and the pane arrives with that row already expanded — a destination
 * is then one line here rather than a change to three components.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('overview');
  const [focusMatter, setFocusMatter] = useState<string | null>(null);

  const openMatter = (id: string) => {
    setFocusMatter(id);
    setTab('tasks');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar active={tab} onSelect={setTab} onOpenMatter={openMatter} />

      <main data-region="main" className="min-h-0 flex-1 px-7 py-6">
        {tab === 'overview' ? <OverviewPane onNavigate={setTab} onOpenMatter={openMatter} /> : null}
        {tab === 'tasks' ? <TasksPane focus={focusMatter} onFocus={setFocusMatter} /> : null}
        {tab === 'payments' ? <PaymentsPane /> : null}
      </main>
    </div>
  );
}
