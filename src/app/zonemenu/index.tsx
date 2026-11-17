import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.20 import dish grid
// import { DishGrid } from '@/features/zonemenu/components/dish-grid';
// STEP 1.19 import menu tabs
// import { MenuTabs } from '@/features/zonemenu/components/menu-tabs';
// STEP 1.13 import delivery card
// import { DeliveryCard } from '@/features/zonemenu/components/delivery-card';
// STEP 1.01 import menu banner
// import { MenuBanner } from '@/features/zonemenu/components/menu-banner';
// STEP 1.16 import offer row
// import { OfferRow } from '@/features/zonemenu/components/offer-row';
// STEP 1.25 import place disc
// import { PlaceDisc } from '@/features/zonemenu/components/place-disc';
// STEP 1.05 import place meta
// import { PlaceMeta } from '@/features/zonemenu/components/place-meta';
// STEP 1.04 import place title
// import { PlaceTitle } from '@/features/zonemenu/components/place-title';
import { tabs } from '@/features/zonemenu/data/menu';
import { useLayout } from '@/features/zonemenu/layout';
import { ct } from '@/features/zonemenu/theme';

/**
 * Food Zone — restaurant.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The grid runs past the fold, which R6 allows for a list that genuinely
 * continues — the board crops the same grid at the screen edge.
 */
export default function ZonemenuScreen() {
  const L = useLayout();
  const [tab, setTab] = useState<string>(tabs[0]);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: L.scrollPad }}
      >
        {/* STEP 1.01 menu banner
        <MenuBanner
          width={L.W}
          height={L.banner.h}
          margin={L.margin}
          topInset={L.insets.top}
          control={L.banner.control}
          onBack={() => router.back()}
        />
        */}

        <View style={{ height: L.gapDisc }} />
        {/* STEP 1.04 place title
        <PlaceTitle margin={L.margin} height={L.placeH} />
        */}
        {/* STEP 1.05 place meta
        <PlaceMeta margin={L.margin} height={L.metaH} />
        */}

        <View style={{ height: L.gapPlace }} />
        {/* STEP 1.13 delivery card
        <DeliveryCard margin={L.margin} height={L.delivery.h} radius={L.delivery.radius} />
        */}

        <View style={{ height: L.gapDelivery }} />
        {/* STEP 1.16 offer row
        <OfferRow margin={L.margin} height={L.offer.h} radius={L.offer.radius} gap={L.gutter} />
        */}

        <View style={{ height: L.gapOffer }} />
        {/* STEP 1.19 menu tabs
        <MenuTabs height={L.tabsH} margin={L.margin} value={tab} onSelect={setTab} />
        */}

        <View style={{ height: L.gapTabs }} />
        {/* STEP 1.20 dish grid
        <DishGrid
          margin={L.margin}
          gutter={L.gutter}
          col={L.col}
          photoH={L.card.photoH}
          radius={L.card.radius}
          add={L.card.add}
          onSelect={() => router.push('/zoneitem')}
        />
        */}
      </ScrollView>

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.25 place disc
      <PlaceDisc size={L.banner.disc} top={L.banner.h - L.banner.disc / 2} />
      */}
    </View>
  );
}
