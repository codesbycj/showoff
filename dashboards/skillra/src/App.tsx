import { useEffect, useState } from 'react';

import { Rail, TopBar } from '@/components/Chrome';
import { TRACKS } from '@/data/deck';
import type { TabId } from '@/nav';
import { CoursesPane } from '@/panes/CoursesPane';
import { LearnPane } from '@/panes/LearnPane';
import { TasksPane } from '@/panes/TasksPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a rounded window posed on a pale gradient board; the board
 * and the window's own frame are presentation furniture, so the app runs to
 * the edge.
 *
 * Four pieces of state live here because they cross tabs: the course a card
 * opens, the track pills in the header, the search, and the theme.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('learn');
  const [course, setCourse] = useState('c1');
  const [query, setQuery] = useState('');
  const [track, setTrack] = useState('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const openCourse = (id: string) => {
    setCourse(id);
    setTab('courses');
  };

  return (
    <div data-shell className="flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Rail active={tab} onSelect={setTab} />

      <div data-region="main" className="flex min-h-0 min-w-0 flex-1 flex-col">
        <TopBar
          query={query}
          onQuery={setQuery}
          track={track}
          onTrack={setTrack}
          tracks={TRACKS}
          theme={theme}
          onTheme={setTheme}
        />

        <main className="min-h-0 min-w-0 flex-1 pt-2">
          {tab === 'learn' ? (
            <LearnPane
              query={query}
              track={track}
              onOpenCourse={openCourse}
              onOpenTasks={() => setTab('tasks')}
            />
          ) : null}
          {tab === 'courses' ? (
            <CoursesPane query={query} track={track} selected={course} onSelect={setCourse} />
          ) : null}
          {tab === 'tasks' ? <TasksPane query={query} track={track} /> : null}
        </main>
      </div>
    </div>
  );
}
