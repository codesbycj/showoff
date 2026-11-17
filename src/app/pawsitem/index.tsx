import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.21 import add button
// import { AddButton } from '@/features/pawsitem/components/add-button';
// STEP 1.13 import fact row
// import { FactRow } from '@/features/pawsitem/components/fact-row';
// STEP 1.01 import item header
// import { ItemHeader } from '@/features/pawsitem/components/item-header';
// STEP 1.08 import product hero
// import { ProductHero } from '@/features/pawsitem/components/product-hero';
// STEP 1.02 import text
// import { T } from '@/features/pawsitem/components/text';
import { product } from '@/features/pawsitem/data/item';
import { useLayout } from '@/features/pawsitem/layout';
import { ct } from '@/features/pawsitem/theme';

/**
 * Paws — the product.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder — everything under it is budgeted block by
 * block — so the screen always ends on its button with no band under it (I3).
 */
export default function PawsitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 item header
      <ItemHeader margin={L.margin} height={L.headerH} onBack={() => router.push('/pawshome')} />
      */}

      <View style={{ height: L.gapHeader }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        {/* STEP 1.02 name
        <T variant="itemName" numberOfLines={1}>
          {product.name}
        </T>
        */}
        {/* STEP 1.05 sub
        <T variant="itemSub">{product.sub}</T>
        */}
      </View>

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.08 product hero
      <ProductHero width={L.W} height={L.hero.h} variant={L.hero.variant} margin={L.margin} />
      */}

      {/* STEP 1.13 fact row
      <FactRow margin={L.margin} height={L.factsH} />
      */}

      <View style={{ height: L.gapFacts }} />
      {/* STEP 1.18 body
      <View style={{ marginHorizontal: L.margin, height: L.bodyH }}>
        <T variant="body">{product.body}</T>
      </View>
      */}

      <View style={{ height: L.gapBody }} />
      {/* STEP 1.21 add button
      <AddButton margin={L.margin} height={L.cta.h} onPress={() => router.push('/pawshome')} />
      */}
        {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
        <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
        {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.19 a stray rule | FIX 1.20 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
