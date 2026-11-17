import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.19 import deal row
// import { DealRow } from '@/features/pawshome/components/deal-row';
// STEP 1.22 import dock
// import { Dock } from '@/features/pawshome/components/dock';
// STEP 1.01 import home header
// import { HomeHeader } from '@/features/pawshome/components/home-header';
// STEP 1.08 import pet chips
// import { PetChips } from '@/features/pawshome/components/pet-chips';
// STEP 1.14 import product grid
// import { ProductGrid } from '@/features/pawshome/components/product-grid';
// STEP 1.04 import search field
// import { SearchField } from '@/features/pawshome/components/search-field';
// STEP 1.12 import section row
// import { SectionRow } from '@/features/pawshome/components/section-row';
import { sections } from '@/features/pawshome/data/home';
import { useLayout } from '@/features/pawshome/layout';
import { ct } from '@/features/pawshome/theme';

/**
 * Paws — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The product grid is the remainder — its cards grow into whatever the header,
 * the search field, the chips and the dock leave — so the screen always ends
 * on the dock with no band under it (I3).
 */
export default function PawshomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 home header
      <HomeHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 search field
      <SearchField margin={L.margin} height={L.search.h} radius={L.search.radius} />
      */}

      <View style={{ height: L.gapSearch }} />
      {/* STEP 1.08 pet chips
      <PetChips margin={L.margin} height={L.pet.h} size={L.pet.size} />
      */}

      <View style={{ height: L.gapPets }} />
      {/* STEP 1.12 section row
      <SectionRow margin={L.margin} height={L.sectionH} title={sections.popular} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.14 product grid
      <ProductGrid
        margin={L.margin}
        width={L.card.w}
        height={L.card.h}
        radius={L.card.radius}
        onOpen={() => router.push('/pawsitem')}
      />
      */}

      <View style={{ height: L.gapDeal }} />
      {/* STEP 1.16 section row
      <SectionRow margin={L.margin} height={L.sectionH} title={sections.deals} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.19 deal row
      <DealRow
        margin={L.margin}
        height={L.deal.h}
        radius={L.deal.radius}
        thumb={L.deal.thumb}
        onOpen={() => router.push('/pawsitem')}
      />
      */}

      {/* STEP 1.22 dock
      <Dock height={L.dock.h} onCart={() => router.push('/pawsitem')} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
