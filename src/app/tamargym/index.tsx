import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.21 import about block
// import { AboutBlock } from '@/features/tamargym/components/about-block';
// STEP 1.13 import amenity row
// import { AmenityRow } from '@/features/tamargym/components/amenity-row';
// STEP 1.22 import fact strip
// import { FactStrip } from '@/features/tamargym/components/fact-strip';
// STEP 1.10 import gym address
// import { GymAddress } from '@/features/tamargym/components/gym-address';
// STEP 1.07 import gym title
// import { GymTitle } from '@/features/tamargym/components/gym-title';
// STEP 1.18 import price row
// import { PriceRow } from '@/features/tamargym/components/price-row';
// STEP 1.26 import reserve cta
// import { ReserveCta } from '@/features/tamargym/components/reserve-cta';
// STEP 1.01 import gym hero
// import { GymHero } from '@/features/tamargym/components/gym-hero';
import { useLayout } from '@/features/tamargym/layout';
import { ct } from '@/features/tamargym/theme';

/**
 * Tamarran — venue detail.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero takes the screen's slack (see `layout.ts`), so the foot cannot open
 * a band — and the Reserve button is the last block in the column rather than a
 * pill floating over the copy, because covering text is an R3 FAIL.
 */
export default function TamargymScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 gym hero
      <GymHero
        width={L.W}
        height={L.hero.h}
        topInset={L.insets.top}
        control={L.hero.control}
        onBack={() => router.back()}
      />
      */}

      <View style={{ height: L.gapHero }} />
      {/* STEP 1.07 gym title
      <GymTitle margin={L.margin} height={L.titleH} />
      */}
      {/* STEP 1.10 gym address
      <GymAddress margin={L.margin} height={L.addressH} />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.13 amenity row
      <AmenityRow margin={L.margin} height={L.chips.h} radius={L.chips.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.18 price row
      <PriceRow margin={L.margin} height={L.priceH} />
      */}

      <View style={{ height: L.gapPrice }} />
      {/* STEP 1.21 about block
      <AboutBlock margin={L.margin} height={L.aboutH} />
      */}

      <View style={{ height: L.gapAbout }} />
      {/* STEP 1.22 fact strip
      <FactStrip margin={L.margin} height={L.facts.h} radius={L.facts.radius} />
      */}

      <View style={{ height: L.gapFacts }} />
      {/* STEP 1.29 a stray gap above it | FIX 1.30 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.26 reserve cta
      <ReserveCta
        margin={L.margin}
        height={L.cta.h}
        radius={L.cta.radius}
        onPress={() => router.back()}
      />
      */}
    </View>
  );
}
