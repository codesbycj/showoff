import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 import category rail
// import { CategoryRail } from '@/features/volthome/components/category-rail';
// STEP 1.22 import product grid
// import { ProductGrid } from '@/features/volthome/components/product-grid';
// STEP 1.08 import promo banner
// import { PromoBanner } from '@/features/volthome/components/promo-banner';
// STEP 1.05 import search bar
// import { SearchBar } from '@/features/volthome/components/search-bar';
// STEP 1.11 import section row
// import { SectionRow } from '@/features/volthome/components/section-row';
// STEP 1.01 import shop header
// import { ShopHeader } from '@/features/volthome/components/shop-header';
// STEP 1.23 import tab bar
// import { TabBar } from '@/features/volthome/components/tab-bar';
import { useCountdown } from '@/features/volthome/components/use-countdown';
import { SALE_SECONDS, sections } from '@/features/volthome/data/home';
import { useLayout } from '@/features/volthome/layout';
import { ct } from '@/features/volthome/theme';

/**
 * Voltline — shop.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The grid runs off the bottom of the frame, so the foot cannot open a band
 * (I3), and the sale clock counts rather than being typed (R9).
 */
export default function VolthomeScreen() {
  const L = useLayout();
  const clock = useCountdown(SALE_SECONDS);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 shop header
      <ShopHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 search bar
      <SearchBar margin={L.margin} height={L.search.h} radius={L.search.radius} />
      */}

      <View style={{ height: L.gapSearch }} />
      {/* STEP 1.08 promo banner
      <PromoBanner margin={L.margin} height={L.promo.h} radius={L.promo.radius} />
      */}

      <View style={{ height: L.gapPromo }} />
      {/* STEP 1.11 section row
      <SectionRow margin={L.margin} height={L.sectionH} label={sections.categories} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.18 category rail
      <CategoryRail margin={L.margin} width={L.tile.w} height={L.tile.h} labelH={L.tile.labelH} />
      */}

      <View style={{ height: L.gapTiles }} />
      {/* STEP 1.19 section row
      <SectionRow margin={L.margin} height={L.sectionH} label={sections.flash} timer={clock} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.22 product grid
      <ProductGrid
        margin={L.margin}
        width={L.card.w}
        imageH={L.card.imageH}
        radius={L.card.radius}
        bottomPad={L.bar.h + 12}
        onSelect={() => router.push('/voltitem')}
      />
      */}

      {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.23 tab bar
      <TabBar height={L.bar.h} onCart={() => router.push('/voltcart')} />
      */}
    </View>
  );
}
