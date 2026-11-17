import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.04 import category rail
// import { CategoryRail } from '@/features/zonehome/components/category-rail';
// STEP 1.01 import home header
// import { HomeHeader } from '@/features/zonehome/components/home-header';
// STEP 1.22 import search bar
// import { SearchBar } from '@/features/zonehome/components/search-bar';
// STEP 1.17 import quick head
// import { QuickHead } from '@/features/zonehome/components/quick-head';
// STEP 1.18 import quick list
// import { QuickList } from '@/features/zonehome/components/quick-list';
// STEP 1.14 import restaurant rail
// import { RestaurantRail } from '@/features/zonehome/components/restaurant-rail';
// STEP 1.11 import section head
// import { SectionHead } from '@/features/zonehome/components/section-head';
// STEP 1.25 import tab bar
// import { TabBar } from '@/features/zonehome/components/tab-bar';
import { useLayout } from '@/features/zonehome/layout';
import { ct } from '@/features/zonehome/theme';

/**
 * Food Zone — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The category tiles and the restaurant cards are **photographs** (I4) — food
 * is a picture *of* something, and drawing it produces cartoons.
 */
export default function ZonehomeScreen() {
  const L = useLayout();
  const [tab, setTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: L.scrollPad }}
      >
        {/* STEP 1.01 home header
        <HomeHeader
          width={L.W}
          height={L.header.h}
          radius={L.header.radius}
          margin={L.margin}
          topInset={L.insets.top}
          barH={L.barH}
          gapBar={L.gapBar}
          promoH={L.promoH}
        />
        */}

        <View style={{ height: L.gapHeader }} />
        {/* STEP 1.04 category rail
        <CategoryRail height={L.cats.h} margin={L.margin} tile={L.cats.tile} gap={L.cats.gap} />
        */}

        <View style={{ height: L.gapCats }} />
        {/* STEP 1.11 section head
        <SectionHead margin={L.margin} height={L.sectionH} />
        */}

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.14 restaurant rail
        <RestaurantRail
          margin={L.margin}
          width={L.card.w}
          photoH={L.card.photoH}
          radius={L.card.radius}
          gap={L.card.gap}
          onSelect={() => router.push('/zonemenu')}
        />
        */}

        <View style={{ height: L.gapRail }} />
        {/* STEP 1.17 quick head
        <QuickHead margin={L.margin} height={L.quickHeadH} />
        */}

        <View style={{ height: L.gapQuickHead }} />
        {/* STEP 1.18 quick list
        <QuickList
          margin={L.margin}
          rowH={L.quick.rowH}
          thumb={L.quick.thumb}
          radius={L.quick.radius}
          onSelect={() => router.push('/zonemenu')}
        />
        */}
      </ScrollView>

      {/* STEP 1.22 search bar
      <SearchBar
        margin={L.margin}
        height={L.search.h}
        control={L.search.control}
        top={L.header.h - L.search.h / 2}
      />
      */}

      {/* STEP 1.31 a stray gap above it | FIX 1.32 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.25 tab bar
      <TabBar
        height={L.tabs.h}
        bottomInset={L.insets.bottom}
        cart={L.tabs.cart}
        cartLift={L.tabs.cartLift}
        value={tab}
        onSelect={(id) => (id === 'cart' ? router.push('/zoneitem') : setTab(id))}
      />
      */}
    </View>
  );
}
