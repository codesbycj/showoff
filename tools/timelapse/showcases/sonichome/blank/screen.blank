import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.16 import category chips
// import { CategoryChips } from '@/features/sonichome/components/category-chips';
// STEP 1.14 import category label
// import { CategoryLabel } from '@/features/sonichome/components/category-label';
// STEP 1.23 import collection card
// import { CollectionCard } from '@/features/sonichome/components/collection-card';
// STEP 1.21 import collection head
// import { CollectionHead } from '@/features/sonichome/components/collection-head';
// STEP 1.31 import dock
// import { Dock } from '@/features/sonichome/components/dock';
// STEP 1.01 import greeting bar
// import { GreetingBar } from '@/features/sonichome/components/greeting-bar';
// STEP 1.28 import playlist head
// import { PlaylistHead } from '@/features/sonichome/components/playlist-head';
// STEP 1.18 import popular head
// import { PopularHead } from '@/features/sonichome/components/popular-head';
// STEP 1.19 import song rail
// import { SongRail } from '@/features/sonichome/components/song-rail';
// STEP 1.29 import track list
// import { TrackList } from '@/features/sonichome/components/track-list';
import { categories } from '@/features/sonichome/data/home';
import { useLayout } from '@/features/sonichome/layout';
import { ct } from '@/features/sonichome/theme';

/**
 * Sonic — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every sleeve is free-licensed photography standing in for a fictional
 * release — the board's own are real album covers, and shipping those would be
 * impersonation.
 */
export default function SonichomeScreen() {
  const L = useLayout();
  const [cat, setCat] = useState<string>(categories.items[0]);
  const [tab, setTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page, paddingTop: L.insets.top }}>
      <StatusBar style="light" />

      {/* STEP 1.01 greeting bar
      <GreetingBar margin={L.margin} height={L.barH} control={L.control} />
      */}

      <View style={{ height: L.gapBar }} />
      {/* STEP 1.14 category label
      <CategoryLabel margin={L.margin} height={L.catLabelH} />
      */}

      <View style={{ height: L.gapCatLabel }} />
      {/* STEP 1.16 category chips
      <CategoryChips margin={L.margin} height={L.chipsH} value={cat} onSelect={setCat} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.18 popular head
      <PopularHead margin={L.margin} height={L.popularH} />
      */}

      <View style={{ height: L.gapPopular }} />
      {/* STEP 1.19 song rail
      <SongRail
        margin={L.margin}
        height={L.songRail.h}
        art={L.songRail.art}
        onSelect={() => router.push('/sonicplay')}
      />
      */}

      <View style={{ height: L.gapRail }} />
      {/* STEP 1.21 collection head
      <CollectionHead margin={L.margin} height={L.collectionHeadH} />
      */}

      <View style={{ height: L.gapCollectionHead }} />
      {/* STEP 1.23 collection card
      <CollectionCard
        margin={L.margin}
        height={L.collection.h}
        width={L.collection.w}
        radius={L.collection.radius}
      />
      */}

      <View style={{ height: L.gapCollection }} />
      {/* STEP 1.28 playlist head
      <PlaylistHead margin={L.margin} height={L.playlistHeadH} />
      */}

      <View style={{ height: L.gapPlaylistHead }} />
      {/* STEP 1.29 track list
      <TrackList
        margin={L.margin}
        height={L.list.h}
        rowH={L.list.rowH}
        art={L.list.art}
        count={L.list.rows}
        onSelect={() => router.push('/sonicplay')}
      />
      */}

      {/* STEP 1.31 dock
      <Dock
        width={L.dock.w}
        height={L.dock.h}
        lift={L.dock.lift}
        item={L.dock.item}
        bottomInset={L.insets.bottom}
        value={tab}
        onSelect={(id) => (id === 'search' ? router.push('/sonicexplore') : setTab(id))}
      />
      */}
      {/* STEP 1.33 a stray gap under it | FIX 1.34 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
