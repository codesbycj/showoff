import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.21 import dock
// import { Dock } from '@/features/sonicexplore/components/dock';
// STEP 1.04 import explore title
// import { ExploreTitle } from '@/features/sonicexplore/components/explore-title';
// STEP 1.05 import feature rail
// import { FeatureRail } from '@/features/sonicexplore/components/feature-rail';
// STEP 1.14 import genre grid
// import { GenreGrid } from '@/features/sonicexplore/components/genre-grid';
// STEP 1.11 import moods title
// import { MoodsTitle } from '@/features/sonicexplore/components/moods-title';
// STEP 1.01 import search field
// import { SearchField } from '@/features/sonicexplore/components/search-field';
import { useLayout } from '@/features/sonicexplore/layout';
import { ct } from '@/features/sonicexplore/theme';

/**
 * Sonic — explore.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The board heads this screen with a real service's name; renamed here,
 * because a rebuild that keeps it is impersonation. Every tile's artwork is
 * free-licensed photography standing in for a fictional release.
 */
export default function SonicexploreScreen() {
  const L = useLayout();
  const [tab, setTab] = useState('search');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page, paddingTop: L.insets.top }}>
      <StatusBar style="light" />

      {/* STEP 1.01 search field
      <SearchField margin={L.margin} height={L.searchH} />
      */}

      <View style={{ height: L.gapSearch }} />
      {/* STEP 1.04 explore title
      <ExploreTitle margin={L.margin} height={L.exploreH} />
      */}

      <View style={{ height: L.gapExplore }} />
      {/* STEP 1.05 feature rail
      <FeatureRail margin={L.margin} height={L.rail.h} width={L.rail.w} radius={L.rail.radius} />
      */}
      {/* STEP 1.09 a stray gap under it | FIX 1.10 take the gap back out
      <View style={{ height: 11 }} />
      */}

      <View style={{ height: L.gapRail }} />
      {/* STEP 1.11 moods title
      <MoodsTitle margin={L.margin} height={L.moodsH} />
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 17 }} />
      */}

      <View style={{ height: L.gapMoods }} />
      {/* STEP 1.14 genre grid
      <GenreGrid
        margin={L.margin}
        height={L.grid.h}
        gutter={L.gutter}
        rowH={L.grid.rowH}
        radius={L.grid.radius}
        art={L.grid.art}
        tile={L.grid.tile}
      />
      */}

      {/* STEP 1.21 dock
      <Dock
        width={L.dock.w}
        height={L.dock.h}
        lift={L.dock.lift}
        item={L.dock.item}
        bottomInset={L.insets.bottom}
        value={tab}
        onSelect={(id) => (id === 'home' ? router.push('/sonichome') : setTab(id))}
      />
      */}
      {/* STEP 1.27 a stray gap under it | FIX 1.28 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
