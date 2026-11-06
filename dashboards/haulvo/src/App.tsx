import { useState } from 'react';

import { Rail } from '@/components/Chrome';
import type { TabId } from '@/nav';
import { BuildPane } from '@/panes/BuildPane';
import { ShipmentsPane } from '@/panes/ShipmentsPane';
import { TrackingPane } from '@/panes/TrackingPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a browser window posed on a blue-grey board; both are
 * presentation furniture and both are dropped, so the rail runs to the window
 * edge.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('build');

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Rail active={tab} onSelect={setTab} />

      <main data-region="main" className="min-h-0 min-w-0 flex-1 px-6 py-5">
        {tab === 'shipments' ? <ShipmentsPane onOpen={() => setTab('build')} /> : null}
        {tab === 'build' ? <BuildPane /> : null}
        {tab === 'tracking' ? <TrackingPane /> : null}
      </main>
    </div>
  );
}
