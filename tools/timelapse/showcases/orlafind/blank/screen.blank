import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import brand bar
// import { BrandBar } from '@/features/orlafind/components/brand-bar';
// STEP 1.08 import collection count
// import { CollectionCount } from '@/features/orlafind/components/collection-count';
// STEP 1.04 import discover title
// import { DiscoverTitle } from '@/features/orlafind/components/discover-title';
// STEP 1.12 import kind chips
// import { KindChips } from '@/features/orlafind/components/kind-chips';
// STEP 1.19 import ring rail
// import { RingRail } from '@/features/orlafind/components/ring-rail';
import { useLayout } from '@/features/orlafind/layout';
import { ct } from '@/features/orlafind/theme';

/**
 * Orla - the collection.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The card rail is the remainder and runs past the screen edge, so the screen
 * ends on a card crossing the frame with no band under it (I3).
 */
export default function OrlafindScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 brand bar
      <BrandBar margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 discover title
      <DiscoverTitle margin={L.margin} height={L.displayH} />
      */}

      {/* STEP 1.08 collection count
      <CollectionCount margin={L.margin} height={L.countH} />
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.12 kind chips
      <KindChips margin={L.margin} height={L.chipH} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.19 ring rail
      <RingRail
        margin={L.margin}
        width={L.card.w}
        height={L.card.h}
        radius={L.card.radius}
        onOpen={() => router.push('/orlaring')}
      />
      */}

      {/* STEP 1.02 a stray rule | FIX 1.03 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.footer }} />
    </View>
  );
}
