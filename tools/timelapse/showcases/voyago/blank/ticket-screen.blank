import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.03 import the pass
// import { BoardingPass } from '@/features/voyago/components/boarding-pass';
// STEP 3.12 import the dock
// import { TicketDock } from '@/features/voyago/components/ticket-dock';
// STEP 3.01 import the header
// import { TicketHeader } from '@/features/voyago/components/ticket-header';
import { BARCODE, DOCK, PASS, ROUTE, TITLE } from '@/features/voyago/data/ticket';
import { SP, voyagoTheme, vy } from '@/features/voyago/theme';

/**
 * Screen 3 — the boarding pass.
 *
 * Like the hotels screen this one does not scroll: the export splits it
 * `justify-between`, pass at the top and dock at the bottom, with the slack
 * falling between them. The dock is part of the layout here, not floating over
 * it as on home.
 */
export default function VoyagoTicket() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        voyagoTheme,
        {
          flex: 1,
          backgroundColor: vy.canvas,
          justifyContent: 'space-between',
          paddingTop: insets.top + SP.xl,
          paddingHorizontal: SP.gutter,
          paddingBottom: insets.bottom + SP.xs,
        },
      ]}
    >
      <StatusBar style="dark" />

      <View>
{/* STEP 3.02 the header
        <TicketHeader lead={TITLE.lead} accent={TITLE.accent} onBack={() => router.back()} />
*/}

{/* STEP 3.04 the pass itself
        <BoardingPass pass={PASS} route={ROUTE} barcode={BARCODE} />
*/}
      </View>

{/* STEP 3.13 the dock | FIX 3.15 the labels are the wrong way round
      <TicketDock
        ticketsLabel={DOCK.home}
        homeLabel={DOCK.tickets}
        onHome={() => router.dismissTo('/voyago')}
      />
*/}

{/* STEP 3.14 the dock, labelled properly
      <TicketDock
        ticketsLabel={DOCK.tickets}
        homeLabel={DOCK.home}
        onHome={() => router.dismissTo('/voyago')}
      />
*/}
    </View>
  );
}
