import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.22 import fact chips
// import { FactChips } from '@/features/ferntrip/components/fact-chips';
// STEP 1.14 import flag disc
// import { FlagDisc } from '@/features/ferntrip/components/flag-disc';
// STEP 1.01 import hero summit
// import { HeroSummit } from '@/features/ferntrip/components/hero-summit';
// STEP 1.25 import stay card
// import { StayCard } from '@/features/ferntrip/components/stay-card';
// STEP 1.20 import text
// import { T } from '@/features/ferntrip/components/text';
import { trip } from '@/features/ferntrip/data/trip';
import { useLayout } from '@/features/ferntrip/layout';
import { ct } from '@/features/ferntrip/theme';

/**
 * Fernweh — the trip.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The summit is the remainder — the sheet is budgeted block by block from the
 * foot up and the photograph takes what is left — so the stay card always
 * lands on the foot with no band under it (I3).
 */
export default function FerntripScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 hero summit
      <HeroSummit
        width={L.W}
        height={L.hero.h}
        dome={L.hero.dome}
        disc={L.hero.disc}
        margin={L.margin}
        insetTop={L.insets.top}
        onBack={() => router.push('/fernlist')}
      />
      */}

      <View style={{ height: L.gapDome }} />
      <View
        style={{
          height: L.countryH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
        }}
      >
        {/* STEP 1.14 flag disc
        <FlagDisc name={trip.flag} size={14} />
        */}
        {/* STEP 1.20 t
        <T variant="country">{trip.country.toUpperCase()}</T>
        */}
      </View>

      <View style={{ height: L.gapCountry }} />
      {/* STEP 1.21 title
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        <T variant="title" style={{ textAlign: 'center' }}>
          {trip.title}
        </T>
      </View>
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.22 fact chips
      <FactChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.25 stay card
      <StayCard
        margin={L.margin}
        height={L.stay.h}
        radius={L.stay.radius}
        thumb={L.stay.thumb}
        thumbRadius={L.stay.thumbRadius}
        onPress={() => router.push('/fernhome')}
      />
      */}
    </View>
  );
}
