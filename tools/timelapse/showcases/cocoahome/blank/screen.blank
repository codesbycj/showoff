import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.17 import cart bar
// import { CartBar } from '@/features/cocoahome/components/cart-bar';
// STEP 1.04 import kind chips
// import { KindChips } from '@/features/cocoahome/components/kind-chips';
// STEP 1.13 import pack rail
// import { PackRail } from '@/features/cocoahome/components/pack-rail';
// STEP 1.01 import shop header
// import { ShopHeader } from '@/features/cocoahome/components/shop-header';
// STEP 1.10 import text
// import { T } from '@/features/cocoahome/components/text';
import { header } from '@/features/cocoahome/data/shop';
import { useLayout } from '@/features/cocoahome/layout';
import { ct } from '@/features/cocoahome/theme';

/**
 * Cocoa - the shop.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The collection rail is the remainder, so the screen always ends on the
 * pinned cart with no band under it (I3).
 */
export default function CocoahomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 shop header
      <ShopHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 kind chips
      <KindChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.10 collections
      <View style={{ marginHorizontal: L.margin, height: L.sectionH, justifyContent: 'center' }}>
        <T variant="section">{header.collections}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.13 pack rail
      <PackRail
        margin={L.margin}
        width={L.card.w}
        height={L.card.h}
        radius={L.card.radius}
        onOpen={() => router.push('/cocoaitem')}
      />
      */}

      <View style={{ flex: 1 }} />
      {/* STEP 1.17 cart bar
      <CartBar
        margin={L.margin}
        height={L.bar.h}
        radius={L.bar.radius}
        onPress={() => router.push('/cocoacart')}
      />
      */}

      {/* STEP 1.02 a stray rule | FIX 1.03 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.11 a stray rule | FIX 1.12 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      <View style={{ height: 16 }} />
    </View>
  );
}
