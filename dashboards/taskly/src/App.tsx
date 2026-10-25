import { useEffect, useState } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { TopBar, type Theme } from '@/components/TopBar';
import { PROJECTS } from '@/data/deck';
import type { TabId } from '@/nav';
import { CalendarPane } from '@/panes/CalendarPane';
import { DashboardPane } from '@/panes/DashboardPane';
import { TasksPane } from '@/panes/TasksPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3).
 *
 * It holds the five pieces of state that cross panes — the tab, the selected
 * project, the search box, the theme and whether the bell has been cleared.
 * Which project is open is shell state rather than pane state because the
 * sidebar sets it and all three panes read it.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [projectId, setProjectId] = useState(PROJECTS[0].id);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('light');
  const [alerts, setAlerts] = useState(true);

  // Writing to the document is what an effect is for: synchronising an external
  // system with React state, rather than setting more state.
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  return (
    <div data-shell className="bg-ground flex h-screen w-screen overflow-hidden">
      <Sidebar active={tab} onSelect={setTab} projectId={projectId} onProject={setProjectId} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          query={query}
          onQuery={setQuery}
          theme={theme}
          onTheme={setTheme}
          alerts={alerts}
          onAlerts={() => setAlerts(false)}
        />

        <main data-region="main" className="min-h-0 flex-1 px-6 pt-4 pb-5">
          {tab === 'dashboard' ? <DashboardPane projectId={projectId} query={query} /> : null}
          {tab === 'tasks' ? <TasksPane projectId={projectId} query={query} /> : null}
          {tab === 'calendar' ? <CalendarPane projectId={projectId} query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
