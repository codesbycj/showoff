import { useState } from 'react';

import { Rail } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { HomePane } from '@/panes/HomePane';
import { RecordingsPane } from '@/panes/RecordingsPane';
import { TeamPane } from '@/panes/TeamPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a rounded window posed on white with a wide margin all
 * round; the margin and the window's own frame are presentation furniture, so
 * the workspace runs to the edge.
 *
 * Two pieces of state live here because they cross tabs: the recording a row
 * or a notification opens, and the search, which filters whichever tab shows.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('home');
  const [recording, setRecording] = useState('r1');
  const [query, setQuery] = useState('');

  const openRecording = (id: string) => {
    setRecording(id);
    setTab('recordings');
  };

  return (
    <div data-shell className="flex h-screen w-screen gap-4 overflow-hidden p-4">
      <Rail active={tab} onSelect={setTab} />

      <main data-region="main" className="min-h-0 min-w-0 flex-1">
        {tab === 'home' ? (
          <HomePane
            query={query}
            onQuery={setQuery}
            onOpenRecording={openRecording}
            onOpenTeam={() => setTab('team')}
          />
        ) : null}
        {tab === 'recordings' ? (
          <RecordingsPane
            query={query}
            onQuery={setQuery}
            selected={recording}
            onSelect={setRecording}
          />
        ) : null}
        {tab === 'team' ? (
          <TeamPane query={query} onQuery={setQuery} onOpenRecording={openRecording} />
        ) : null}
      </main>
    </div>
  );
}
