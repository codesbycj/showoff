import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.18 import add bar
// import { AddBar } from '@/features/cocoaitem/components/add-bar';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/cocoaitem/components/glyph';
// STEP 1.10 import item hero
// import { ItemHero } from '@/features/cocoaitem/components/item-hero';
// STEP 1.14 import qty row
// import { QtyRow } from '@/features/cocoaitem/components/qty-row';
// STEP 1.04 import text
// import { T } from '@/features/cocoaitem/components/text';
import { product } from '@/features/cocoaitem/data/item';
import { useLayout } from '@/features/cocoaitem/layout';
import { ct } from '@/features/cocoaitem/theme';

/**
 * Cocoa - the product.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder, so the screen always ends on its action
 * with no band under it (I3).
 */
export default function CocoaitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 "Back"
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/cocoahome')}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={18} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ height: L.gapHeader }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        {/* STEP 1.04 name
        <T variant="itemName" numberOfLines={1}>
          {product.name}
        </T>
        */}
        {/* STEP 1.07 maker
        <T variant="itemMaker">{product.maker}</T>
        */}
      </View>

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.10 item hero
      <ItemHero width={L.W} height={L.hero.h} variant={L.hero.variant} margin={L.margin} />
      */}

      {/* STEP 1.14 qty row
      <QtyRow margin={L.margin} height={L.stepH} />
      */}

      <View style={{ height: L.gapStep }} />
      {/* STEP 1.18 add bar
      <AddBar
        margin={L.margin}
        height={L.cta.h}
        radius={L.cta.radius}
        onPress={() => router.push('/cocoacart')}
      />
      */}

      {/* STEP 1.02 a stray rule | FIX 1.03 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.05 a stray rule | FIX 1.06 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
        {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
        <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
