import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.05 import card ground
// import { CardGround } from '@/features/skyplan/components/card-ground';
// STEP 1.02 import plan header
// import { PlanHeader } from '@/features/skyplan/components/plan-header';
// STEP 1.18 import saved header
// import { SavedHeader } from '@/features/skyplan/components/saved-header';
// STEP 1.16 import search button
// import { SearchButton } from '@/features/skyplan/components/search-button';
// STEP 1.01 import sky ground
// import { SkyGround } from '@/features/skyplan/components/sky-ground';
// STEP 1.30 import tab bar
// import { TabBar } from '@/features/skyplan/components/tab-bar';
// STEP 1.06 import trip fields
// import { TripFields } from '@/features/skyplan/components/trip-fields';
// STEP 1.12 import trip options
// import { TripOptions } from '@/features/skyplan/components/trip-options';
// STEP 1.21 import trip rail
// import { TripRail } from '@/features/skyplan/components/trip-rail';
import { useLayout } from '@/features/skyplan/layout';
import { ct } from '@/features/skyplan/theme';

/**
 * Skylark — plan a trip.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The sky is the page's own ground and may paint in frame one; the search
 * card's fill is an absolutely-filled child so that it does not (§5.5).
 */
export default function SkyplanScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 sky ground
      <SkyGround width={L.W} height={Math.round(L.H * 0.42)} />
      */}

      <View style={{ paddingTop: L.insets.top }}>
        {/* STEP 1.02 plan header
        <PlanHeader margin={L.margin} height={L.headerH} />
        */}

        <View style={{ height: L.gapHeader }} />
        <View style={{ marginHorizontal: L.margin, padding: L.card.pad }}>
          {/* STEP 1.05 card ground
          <CardGround radius={L.card.radius} />
          */}

          {/* STEP 1.06 trip fields
          <TripFields height={L.card.fieldH} />
          */}
          {/* STEP 1.11 view
          <View style={{ height: 1, backgroundColor: ct.line }} />
          */}
          {/* STEP 1.12 trip options
          <TripOptions height={L.card.optionH} />
          */}
          <View style={{ height: 10 }} />
          {/* STEP 1.16 search button
          <SearchButton height={L.card.ctaH} onPress={() => router.push('/skyresults')} />
          */}
        </View>

        <View style={{ height: L.gapCard }} />
        {/* STEP 1.18 saved header
        <SavedHeader margin={L.margin} height={L.sectionH} />
        */}

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.21 trip rail
        <TripRail
          margin={L.margin}
          width={L.rail.w}
          height={L.rail.h}
          radius={L.rail.radius}
          gap={L.rail.gap}
        />
        */}
      </View>

      {/* STEP 1.34 a stray gap above it | FIX 1.35 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.30 tab bar
      <TabBar height={L.bar.h} />
      */}
    </View>
  );
}
