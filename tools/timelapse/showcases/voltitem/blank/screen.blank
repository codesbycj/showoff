import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.23 import add to cart
// import { AddToCart } from '@/features/voltitem/components/add-to-cart';
// STEP 1.20 import fact rows
// import { FactRows } from '@/features/voltitem/components/fact-rows';
// STEP 1.06 import item controls
// import { ItemControls } from '@/features/voltitem/components/item-controls';
// STEP 1.01 import item gallery
// import { ItemGallery } from '@/features/voltitem/components/item-gallery';
// STEP 1.09 import item title
// import { ItemTitle } from '@/features/voltitem/components/item-title';
// STEP 1.16 import price row
// import { PriceRow } from '@/features/voltitem/components/price-row';
// STEP 1.12 import rating pills
// import { RatingPills } from '@/features/voltitem/components/rating-pills';
// STEP 1.26 import text
// import { T } from '@/features/voltitem/components/text';
import { product } from '@/features/voltitem/data/item';
import { useLayout } from '@/features/voltitem/layout';
import { ct } from '@/features/voltitem/theme';

/**
 * Voltline — product.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The gallery is the remainder, so the sheet below it always ends on its
 * action with no band under it (I3) and never runs beneath it (R3).
 */
export default function VoltitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.surface }}>
      <StatusBar style="dark" />

      {/* STEP 1.01 item gallery
      <ItemGallery width={L.W} height={L.gallery.h} />
      */}

      {/* STEP 1.06 item controls
      <ItemControls
        margin={L.margin}
        top={L.insets.top + 4}
        size={L.gallery.control}
        onBack={() => router.push('/volthome')}
      />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.09 item title
      <ItemTitle margin={L.margin} height={L.titleH} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.12 rating pills
      <RatingPills margin={L.margin} height={L.pillsH} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.16 price row
      <PriceRow margin={L.margin} height={L.financeH} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.20 fact rows
      <FactRows margin={L.margin} height={L.fact.h} gap={L.fact.gap} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.23 add to cart
      <AddToCart margin={L.margin} height={L.cta.h} onPress={() => router.push('/voltcart')} />
      */}

      <View style={{ height: 6 }} />
      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.26 delivery
      <View style={{ height: L.deliveryH, alignItems: 'center' }}>
        <T variant="delivery">{product.delivery}</T>
      </View>
      */}
    </View>
  );
}
