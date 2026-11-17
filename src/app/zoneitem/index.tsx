import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.13 import addon head
// import { AddonHead } from '@/features/zoneitem/components/addon-head';
// STEP 1.17 import addon list
// import { AddonList } from '@/features/zoneitem/components/addon-list';
// STEP 1.22 import cart bar
// import { CartBar } from '@/features/zoneitem/components/cart-bar';
// STEP 1.12 import item blurb
// import { ItemBlurb } from '@/features/zoneitem/components/item-blurb';
// STEP 1.01 import item hero
// import { ItemHero } from '@/features/zoneitem/components/item-hero';
// STEP 1.08 import item title
// import { ItemTitle } from '@/features/zoneitem/components/item-title';
// STEP 1.06 import liked badge
// import { LikedBadge } from '@/features/zoneitem/components/liked-badge';
import { useLayout } from '@/features/zoneitem/layout';
import { ct } from '@/features/zoneitem/theme';

/**
 * Food Zone — item detail.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero takes the screen's slack (see `layout.ts`), so the foot cannot open
 * a band.
 */
export default function ZoneitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 item hero
      <ItemHero
        width={L.W}
        height={L.hero.h}
        topInset={L.insets.top}
        control={L.hero.control}
        onBack={() => router.back()}
      />
      */}

      <View style={{ height: L.gapHero }} />
      {/* STEP 1.06 liked badge
      <LikedBadge margin={L.margin} height={L.badgeH} />
      */}

      <View style={{ height: L.gapBadge }} />
      {/* STEP 1.08 item title
      <ItemTitle margin={L.margin} nameH={L.nameH} metaH={L.metaH} priceH={L.priceH} />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.12 item blurb
      <ItemBlurb margin={L.margin} height={L.blurbH} />
      */}

      <View style={{ height: L.gapBlurb }} />
      {/* STEP 1.13 addon head
      <AddonHead margin={L.margin} height={L.addonHeadH} />
      */}

      {/* STEP 1.17 addon list
      <AddonList margin={L.margin} height={L.options.h} rowH={L.options.rowH} box={L.options.box} />
      */}

      <View style={{ height: L.gapOptions }} />
      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.22 cart bar
      <CartBar
        margin={L.margin}
        height={L.bar.h}
        radius={L.bar.radius}
        step={L.bar.step}
        onAdd={() => router.push('/zoneroute')}
      />
      */}
    </View>
  );
}
