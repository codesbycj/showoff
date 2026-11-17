import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.12 import category row
// import { CategoryRow } from '@/features/tamarfind/components/category-row';
// STEP 1.09 import category title
// import { CategoryTitle } from '@/features/tamarfind/components/category-title';
// STEP 1.01 import find header
// import { FindHeader } from '@/features/tamarfind/components/find-header';
// STEP 1.04 import search field
// import { SearchField } from '@/features/tamarfind/components/search-field';
// STEP 1.13 import map ground
// import { MapGround } from '@/features/tamarfind/components/map-ground';
// STEP 1.13 import map pins
// import { MapPins } from '@/features/tamarfind/components/map-pins';
// STEP 1.32 import tab bar
// import { TabBar } from '@/features/tamarfind/components/tab-bar';
// STEP 1.25 import venue card
// import { VenueCard } from '@/features/tamarfind/components/venue-card';
import { useLayout } from '@/features/tamarfind/layout';
import { ct } from '@/features/tamarfind/theme';

/**
 * Tamarran — find classes.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The map takes the screen's slack (see `layout.ts`), so the foot cannot open
 * a band. It is built as the map *idea* rather than traced — see
 * `map-ground.tsx` and I4.
 */
export default function TamarfindScreen() {
  const L = useLayout();
  const [cat, setCat] = useState('strength');
  const [tab, setTab] = useState('explore');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />

      {/* STEP 1.01 find header
      <FindHeader height={L.headerH} margin={L.margin} control={L.control} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 search field
      <SearchField height={L.searchH} margin={L.margin} />
      */}

      <View style={{ height: L.gapSearch }} />
      {/* STEP 1.09 category title
      <CategoryTitle height={L.catTitleH} margin={L.margin} />
      */}

      <View style={{ height: L.gapCatTitle }} />
      {/* STEP 1.12 category row
      <CategoryRow
        height={L.chips.h}
        margin={L.margin}
        radius={L.chips.radius}
        value={cat}
        onSelect={setCat}
      />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.13 map ground
      <View style={{ height: L.map.h }}>
        <MapGround width={L.W} height={L.map.h} />
        <MapPins width={L.W} height={L.map.h} />
      </View>
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.25 venue card
      <VenueCard
        margin={L.margin}
        height={L.card.h}
        radius={L.card.radius}
        photoH={L.card.photoH}
        reserveH={L.card.reserveH}
        onReserve={() => router.push('/tamargym')}
      />
      */}

      {/* STEP 1.37 a stray gap above it | FIX 1.38 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.32 tab bar
      <TabBar height={L.tabs.h} bottomInset={L.insets.bottom} value={tab} onSelect={setTab} />
      */}
    </View>
  );
}
