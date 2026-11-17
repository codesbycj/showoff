import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.22 import barcode
// import { Barcode } from '@/features/skyticket/components/barcode';
// STEP 1.04 import flight card
// import { FlightCard } from '@/features/skyticket/components/flight-card';
// STEP 1.17 import passenger card
// import { PassengerCard } from '@/features/skyticket/components/passenger-card';
// STEP 1.25 import save button
// import { SaveButton } from '@/features/skyticket/components/save-button';
// STEP 1.01 import ticket header
// import { TicketHeader } from '@/features/skyticket/components/ticket-header';
import { useLayout } from '@/features/skyticket/layout';
import { ct } from '@/features/skyticket/theme';

/**
 * Skylark — the boarding pass.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The passenger card is the remainder, so the screen ends on its action with
 * no band under it and no hole in the middle (I3, R1c).
 */
export default function SkyticketScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 ticket header
      <TicketHeader
        margin={L.margin}
        height={L.headerH}
        onBack={() => router.push('/skyresults')}
      />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 flight card
      <View style={{ marginHorizontal: L.margin }}>
        <FlightCard height={L.flight.h} radius={L.flight.radius} />
      </View>
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.17 passenger card
      <View style={{ marginHorizontal: L.margin }}>
        <PassengerCard height={L.passengers.h} radius={L.passengers.radius} />
      </View>
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.22 barcode
      <View style={{ marginHorizontal: L.margin }}>
        <Barcode width={L.W - L.margin * 2} height={L.barcode.h} radius={L.passengers.radius} />
      </View>
      */}

      <View style={{ height: L.gapCta }} />
      {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.25 save button
      <SaveButton margin={L.margin} height={L.cta.h} />
      */}
    </View>
  );
}
