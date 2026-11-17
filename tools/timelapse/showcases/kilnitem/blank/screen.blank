import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 import buy bar
// import { BuyBar } from '@/features/kilnitem/components/buy-bar';
// STEP 1.06 import frame rail
// import { FrameRail } from '@/features/kilnitem/components/frame-rail';
// STEP 1.15 import ship line
// import { ShipLine } from '@/features/kilnitem/components/ship-line';
// STEP 1.01 import item hero
// import { ItemHero } from '@/features/kilnitem/components/item-hero';
// STEP 1.12 import text
// import { T } from '@/features/kilnitem/components/text';
import { piece } from '@/features/kilnitem/data/item';
import { useLayout } from '@/features/kilnitem/layout';
import { ct } from '@/features/kilnitem/theme';

/**
 * Kiln - the piece.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder, so the screen always ends on its pinned
 * bar with no band under it (I3).
 */
export default function KilnitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 item hero
      <ItemHero
        width={L.W}
        height={L.hero.h}
        margin={L.margin}
        insetTop={L.insets.top}
        onClose={() => router.push('/kilnfind')}
      />
      */}

      {/* STEP 1.06 frame rail
      <FrameRail margin={L.margin} height={L.rail.h} width={L.rail.w} />
      */}

      {/* STEP 1.12 body
      <View style={{ marginHorizontal: L.margin, height: L.bodyH }}>
        <T variant="body">{piece.body}</T>
      </View>
      */}

      {/* STEP 1.15 ship line
      <ShipLine margin={L.margin} height={L.shipH} />
      */}

      {/* STEP 1.18 buy bar
      <BuyBar height={L.bar.h} onPress={() => router.push('/kilnview')} />
      */}
      {/* STEP 1.04 a stray rule | FIX 1.05 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
