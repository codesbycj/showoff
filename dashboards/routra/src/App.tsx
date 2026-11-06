import { useState } from 'react';

import { Rail, TopBar } from '@/components/Chrome';
import { Badge } from '@/components/Bits';
import { DEPOT, countState } from '@/data/deck';
import { TITLES, type TabId } from '@/nav';
import { FleetPane } from '@/panes/FleetPane';
import { RoutesPane } from '@/panes/RoutesPane';
import { VehiclesPane } from '@/panes/VehiclesPane';

/**
 * The shell. 100vh and the document never scrolls: anything that scrolls does
 * it inside its own region (rule 3), which is why probe.js treats a scrolling
 * document as a defect.
 *
 * The reference is a console with no surround to drop — the rail runs to the
 * window edge, as it does in the picture.
 */
export function App() {
  const [tab, setTab] = useState<TabId>('fleet');

  return (
    <div data-shell className="flex h-screen w-screen overflow-hidden">
      <Rail active={tab} onSelect={setTab} />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          title={TITLES[tab]}
          note={`${DEPOT.site} · shift ${DEPOT.shift}`}
          action={
            <>
              <Badge tone="accent" dot>
                {countState('way')} on the way
              </Badge>
              <Badge tone="warn">{countState('loading')} loading</Badge>
              <Badge tone="quiet">{countState('waiting')} waiting</Badge>
            </>
          }
        />

        <main data-region="main" className="min-h-0 flex-1 p-4">
          {tab === 'fleet' ? <FleetPane /> : null}
          {tab === 'routes' ? <RoutesPane /> : null}
          {tab === 'vehicles' ? <VehiclesPane /> : null}
        </main>
      </div>
    </div>
  );
}
