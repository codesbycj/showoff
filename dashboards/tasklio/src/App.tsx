import { useState } from 'react';

import { Sidebar, TopBar } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import type { TabId } from '@/nav';
import { BoardPane } from '@/panes/BoardPane';
import { TasksPane } from '@/panes/TasksPane';
import { TeamPane } from '@/panes/TeamPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a rounded window posed on grey; the board behind it and
 * the window's own frame are presentation furniture, so the app runs to the
 * edge.
 *
 * Two pieces of state live here because they cross tabs: the task a card or a
 * row opens, and the search, which filters whichever tab is showing.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('board');
  const [task, setTask] = useState('k1');
  const [query, setQuery] = useState('');

  const openTask = (id: string) => {
    setTask(id);
    setTab('tasks');
  };

  return (
    <div data-shell className="flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Sidebar active={tab} onSelect={setTab} />

      <div data-region="main" className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopBar
          query={query}
          onQuery={setQuery}
          action={
            <span
              data-action="create"
              title="Create task — not available"
              aria-disabled="true"
              className="bg-ink text-ink-fg flex h-11 cursor-not-allowed items-center gap-2 rounded-full px-5 text-[13px] font-semibold opacity-60"
            >
              <Icon name="plus" size={15} />
              Create task
            </span>
          }
        />

        <main className="min-h-0 min-w-0 flex-1 pt-2">
          {tab === 'board' ? <BoardPane query={query} onOpenTask={openTask} /> : null}
          {tab === 'tasks' ? <TasksPane query={query} selected={task} onSelect={setTask} /> : null}
          {tab === 'team' ? <TeamPane query={query} onOpenTask={openTask} /> : null}
        </main>
      </div>
    </div>
  );
}
