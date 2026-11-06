import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import dock
// import { Dock } from '@/features/wandertrips/components/dock';
// STEP 1.02 import packing panel
// import { PackingPanel } from '@/features/wandertrips/components/packing-panel';
// STEP 1.03 import trip cards
// import { FlightCard, TripCard } from '@/features/wandertrips/components/trip-cards';
// STEP 1.04 import trip header
// import { NextTripRow, TabRail, TripHeader } from '@/features/wandertrips/components/trip-header';
import {
  GAP_CARDS,
  GAP_HEADER_TABS,
  GAP_NEXT_SHEET,
  GAP_TABS_NEXT,
  MARGIN,
  PAD_TOP,
  SHEET_PAD,
  useTripsLayout,
} from '@/features/wandertrips/layout';
import { ct, radius } from '@/features/wandertrips/theme';
import { useInsets } from '@/features/wandertrips/use-insets';

/**
 * Wander — my trips.
 *
 * Assembly only: who you are, which trips, the next one, the flight, and how
 * ready you are for it.
 *
 * The two panels at the foot take the height the sheet has left, so the pair
 * lands on the dock. Nothing here scrolls: the screen is one view of one
 * trip, and a scroller would only give the slack somewhere to hide.
 */
export default function WandertripsScreen() {
  const insets = useInsets();
  const { panelH } = useTripsLayout(insets);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.05 trip header
      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        <TripHeader />
      </View>
      */}

      {/* STEP 1.06 tab rail
      <View style={{ marginTop: GAP_HEADER_TABS }}>
        <TabRail />
      </View>
      */}

      {/* STEP 1.07 next trip row
      <View style={{ marginTop: GAP_TABS_NEXT, paddingHorizontal: MARGIN }}>
        <NextTripRow />
      </View>
      */}

      {/* STEP 1.08 trip card
      <View
        style={{
          flex: 1,
          marginTop: GAP_NEXT_SHEET,
          backgroundColor: ct.sheet,
          borderTopLeftRadius: radius.sheet,
          borderTopRightRadius: radius.sheet,
          paddingHorizontal: MARGIN,
          paddingTop: SHEET_PAD,
        }}
      >
        <TripCard />

        <View style={{ marginTop: GAP_CARDS }}>
          <FlightCard />
        </View>

        <View style={{ marginTop: GAP_CARDS }}>
          <PackingPanel height={panelH} />
        </View>

        <View style={{ flex: 1 }} />

        <Dock active={1} bottom={insets.bottom} />
      </View>
      */}
      {/* STEP 1.09 a stray gap under it | FIX 1.10 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
