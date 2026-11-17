import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.14 import chip row
// import { ChipRow } from '@/features/vestahome/components/chip-row';
// STEP 1.27 import dock
// import { Dock } from '@/features/vestahome/components/dock';
// STEP 1.22 import product grid
// import { ProductGrid } from '@/features/vestahome/components/product-grid';
// STEP 1.07 import promo card
// import { PromoCard } from '@/features/vestahome/components/promo-card';
// STEP 1.04 import search row
// import { SearchRow } from '@/features/vestahome/components/search-row';
// STEP 1.19 import section head
// import { SectionHead } from '@/features/vestahome/components/section-head';
// STEP 1.01 import top bar
// import { TopBar } from '@/features/vestahome/components/top-bar';
import { useLayout } from '@/features/vestahome/layout';
import { ct } from '@/features/vestahome/theme';

/**
 * Vesta — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The page scrolls because its grid genuinely continues (R6) — the board crops
 * the same grid at its dock. The dock floats over it rather than sitting under
 * it, so the list runs to the screen edge and the foot cannot open a band.
 */
export default function VestahomeScreen() {
  const L = useLayout();
  const [chip, setChip] = useState('dresses');
  const [tab, setTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: L.insets.top, paddingBottom: L.scrollPad }}
      >
        {/* STEP 1.01 top bar
        <TopBar
          height={L.headerH}
          margin={L.margin}
          pillH={L.pill.h}
          avatarSize={L.pill.avatar}
          control={L.control}
        />
        */}

        <View style={{ height: L.gapHeader }} />
        {/* STEP 1.04 search row
        <SearchRow height={L.searchH} margin={L.margin} />
        */}

        <View style={{ height: L.gapSearch }} />
        {/* STEP 1.07 promo card
        <PromoCard
          margin={L.margin}
          height={L.promo.h}
          radius={L.promo.radius}
          photoW={L.promo.photoW}
          ctaH={L.promo.cta}
        />
        */}

        <View style={{ height: L.gapPromo }} />
        {/* STEP 1.14 chip row
        <ChipRow
          height={L.chips.h}
          margin={L.margin}
          radius={L.chips.radius}
          value={chip}
          onSelect={setChip}
        />
        */}

        <View style={{ height: L.gapChips }} />
        {/* STEP 1.19 section head
        <SectionHead height={L.sectionH} margin={L.margin} />
        */}

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.22 product grid
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

      {/* STEP 1.32 a stray gap above it | FIX 1.33 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.27 dock
      <Dock
        height={L.dock.h}
        lift={L.dock.lift}
        radius={L.dock.radius}
        item={L.dock.item}
        margin={L.margin}
        bottomInset={L.insets.bottom}
        value={tab}
        onSelect={(id) => (id === 'shop' ? router.push('/vestabrowse') : setTab(id))}
      />
      */}
    </View>
  );
}
