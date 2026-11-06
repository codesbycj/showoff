import { useEffect, useState } from 'react';

import { Rail, TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { CoursesPane } from '@/panes/CoursesPane';
import { DashboardPane } from '@/panes/DashboardPane';
import { ProgressPane } from '@/panes/ProgressPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a rounded window posed on a purple gradient board; the
 * board and the window's own frame are presentation furniture, so the app runs
 * to the edge.
 *
 * Three pieces of state live here because they cross tabs: the course a tile
 * opens, the search, which filters whichever tab is showing, and the theme.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [course, setCourse] = useState('c1');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const openCourse = (id: string) => {
    setCourse(id);
    setTab('courses');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar active={tab} onSelect={setTab} query={query} onQuery={setQuery} />

      <div data-region="main" className="flex min-h-0 min-w-0 flex-1 gap-4 px-6 pb-5">
        <Rail theme={theme} onTheme={setTheme} />

        <main className="min-h-0 min-w-0 flex-1">
          {tab === 'dashboard' ? <DashboardPane query={query} onOpenCourse={openCourse} /> : null}
          {tab === 'courses' ? (
            <CoursesPane query={query} selected={course} onSelect={setCourse} />
          ) : null}
          {tab === 'progress' ? <ProgressPane query={query} /> : null}
        </main>
      </div>
    </div>
  );
}
