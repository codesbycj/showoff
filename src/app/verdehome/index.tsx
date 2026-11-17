import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import account row
// import { AccountRow } from '@/features/verdehome/components/account-row';
// STEP 1.18 import category chips
// import { CategoryChips } from '@/features/verdehome/components/category-chips';
// STEP 1.19 import dish grid
// import { DishGrid } from '@/features/verdehome/components/dish-grid';
// STEP 1.22 import pill dock
// import { PillDock } from '@/features/verdehome/components/pill-dock';
// STEP 1.08 import promo card
// import { PromoCard } from '@/features/verdehome/components/promo-card';
// STEP 1.05 import search row
// import { SearchRow } from '@/features/verdehome/components/search-row';
// STEP 1.11 import section row
// import { SectionRow } from '@/features/verdehome/components/section-row';
import { sections } from '@/features/verdehome/data/home';
import { useLayout } from '@/features/verdehome/layout';
import { ct } from '@/features/verdehome/theme';

/**
 * Verdeat — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The dish grid runs under the floating dock exactly as the board crops it, so
 * the foot cannot open a band (I3).
 */
export default function VerdehomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 account row
      <AccountRow margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 search row
      <SearchRow margin={L.margin} height={L.search.h} radius={L.search.radius} />
      */}

      <View style={{ height: L.gapSearch }} />
      {/* STEP 1.08 promo card
      <PromoCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.promo.h}
        radius={L.promo.radius}
      />
      */}

      <View style={{ height: L.gapPromo }} />
      {/* STEP 1.11 section row
      <SectionRow margin={L.margin} height={L.sectionH} label={sections.categories} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.18 category chips
      <CategoryChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.19 dish grid
      <DishGrid
        margin={L.margin}
        width={L.card.w}
        imageH={L.card.imageH}
        radius={L.card.radius}
        bottomPad={L.dock.h + L.dock.bottom}
        onSelect={() => router.push('/verdedish')}
      />
      */}

      {/* STEP 1.26 a stray gap above it | FIX 1.27 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.22 pill dock
      <PillDock height={L.dock.h} bottom={L.dock.bottom} active="home" />
      */}
    </View>
  );
}
