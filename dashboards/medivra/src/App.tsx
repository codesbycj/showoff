import { useState } from 'react';

import { TopBar } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { AssignmentsPane } from '@/panes/AssignmentsPane';
import { PatientsPane } from '@/panes/PatientsPane';
import { ShiftPane } from '@/panes/ShiftPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a browser window posed on a grey board with the designer's
 * own chrome around it; the board, the chrome and the window frame are
 * presentation furniture, so the ward runs to the window edge.
 *
 * Two pieces of state live here because they cross tabs: the patient a row or
 * a handover note opens, and the search, which filters whichever tab shows.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('shift');
  const [patient, setPatient] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const openPatient = (id: string) => {
    setPatient(id);
    setTab('patients');
  };

  return (
    <div data-shell className="flex h-screen w-screen flex-col overflow-hidden">
      <TopBar active={tab} onSelect={setTab} query={query} onQuery={setQuery} />

      <main data-region="main" className="min-h-0 min-w-0 flex-1 px-6 pb-5">
        {tab === 'shift' ? <ShiftPane query={query} onOpenPatient={openPatient} /> : null}
        {tab === 'patients' ? (
          <PatientsPane query={query} selected={patient} onSelect={setPatient} />
        ) : null}
        {tab === 'assignments' ? (
          <AssignmentsPane query={query} onOpenPatient={openPatient} />
        ) : null}
      </main>
    </div>
  );
}
