import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.10 import offer list
// import { OfferList } from '@/features/skyresults/components/offer-list';
// STEP 1.01 import results header
// import { ResultsHeader } from '@/features/skyresults/components/results-header';
// STEP 1.05 import sort chips
// import { SortChips } from '@/features/skyresults/components/sort-chips';
import { useLayout } from '@/features/skyresults/layout';
import { ct } from '@/features/skyresults/theme';

/**
 * Skylark — flight results.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The list is the remainder and runs off the bottom edge, so the foot cannot
 * open a band (I3).
 *
 * **The board's floating filter button is not reproduced.** It sits on top of
 * its own third card, over the arrival time — covering text is an R3 FAIL,
 * the fix for which is to inset the content, and there is no content to inset
 * in a list that scrolls under it. The sort chips above carry the same
 * function, so the control is dropped rather than copied.
 */
export default function SkyresultsScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 results header
      <ResultsHeader margin={L.margin} height={L.headerH} onBack={() => router.push('/skyplan')} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.08 a stray gap above it | FIX 1.09 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.05 sort chips
      <SortChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.31 a stray gap above it | FIX 1.32 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.10 offer list
      <OfferList
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.card.h}
        radius={L.card.radius}
        gap={L.cardGap}
        onSelect={() => router.push('/skyticket')}
      />
      */}
    </View>
  );
}
