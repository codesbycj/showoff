import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.04 import chip row
// import { ChipRow } from '@/features/vestabrowse/components/chip-row';
// STEP 1.23 import dock
// import { Dock } from '@/features/vestabrowse/components/dock';
// STEP 1.16 import product grid
// import { ProductGrid } from '@/features/vestabrowse/components/product-grid';
// STEP 1.10 import results row
// import { ResultsRow } from '@/features/vestabrowse/components/results-row';
// STEP 1.01 import search row
// import { SearchRow } from '@/features/vestabrowse/components/search-row';
// STEP 1.13 import section head
// import { SectionHead } from '@/features/vestabrowse/components/section-head';
import { useLayout } from '@/features/vestabrowse/layout';
import { ct } from '@/features/vestabrowse/theme';

/**
 * Vesta — explore.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The page scrolls because its grid genuinely continues (R6) — the board crops
 * the same grid at its dock. The dock floats over it rather than sitting under
 * it, so the list runs to the screen edge and the foot cannot open a band.
 */
export default function VestabrowseScreen() {
  const L = useLayout();
  const [chip, setChip] = useState('dresses');
  const [tab, setTab] = useState('shop');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: L.insets.top, paddingBottom: L.scrollPad }}
      >
        {/* STEP 1.01 search row
        <SearchRow height={L.searchH} margin={L.margin} />
        */}

        <View style={{ height: L.gapSearch }} />
        {/* STEP 1.04 chip row
        <ChipRow
          height={L.chips.h}
          margin={L.margin}
          radius={L.chips.radius}
          value={chip}
          onSelect={setChip}
        />
        */}

        <View style={{ height: L.gapChips }} />
        {/* STEP 1.10 results row
        <ResultsRow height={L.resultsH} margin={L.margin} />
        */}

        <View style={{ height: L.gapResults }} />
        {/* STEP 1.13 section head
        <SectionHead height={L.sectionH} margin={L.margin} />
        */}

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.16 product grid
        <ProductGrid
          margin={L.margin}
          gutter={L.gutter}
          col={L.col}
          photoH={L.card.photoH}
          radius={L.card.radius}
          heart={L.card.heart}
          onSelect={() => router.push('/vestaitem')}
        />
        */}
      </ScrollView>

      {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.23 dock
      <Dock
        height={L.dock.h}
        lift={L.dock.lift}
        radius={L.dock.radius}
        item={L.dock.item}
        margin={L.margin}
        bottomInset={L.insets.bottom}
        value={tab}
        onSelect={(id) => (id === 'home' ? router.push('/vestahome') : setTab(id))}
      />
      */}
    </View>
  );
}
