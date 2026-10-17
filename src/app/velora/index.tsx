import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// STEP 1.22 the row of categories
// import { CategoryRow } from '@/features/velora/components/category-row';
// STEP 1.29 somewhere to put the products
// import { ProductGrid } from '@/features/velora/components/product-grid';
// STEP 1.09 the offer
// import { PromoCard } from '@/features/velora/components/promo-card';
// STEP 1.05 somewhere to search from
// import { SearchField } from '@/features/velora/components/search-field';
// STEP 1.18 a section needs a name
// import { SectionHead } from '@/features/velora/components/section-head';
// STEP 1.37 everywhere else the app goes
// import { TabBar } from '@/features/velora/components/tab-bar';
// STEP 1.01 the bar across the top
// import { TopBar } from '@/features/velora/components/top-bar';
import {
  CATEGORIES,
  NEW_ARRIVALS,
  PROMO,
  SEARCH_PLACEHOLDER,
  SECTIONS,
} from '@/features/velora/data/home';
import { MARGIN, SCROLL_BOTTOM_PAD, SECTION_GAP } from '@/features/velora/layout';
import { vl } from '@/features/velora/theme';
import { useInsets } from '@/features/velora/use-insets';

/**
 * Velora — home.
 *
 * Assembly only. Every band on the page is a component and this file's whole
 * job is to stack them: the page margin, the gap between sections, and which
 * of them are allowed to run past the margin.
 */
export default function VeloraHome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: vl.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingBottom: SCROLL_BOTTOM_PAD + insets.bottom,
          gap: SECTION_GAP,
        }}
      >
        {/* STEP 1.02 hang it at the top
        <View style={{ paddingHorizontal: MARGIN }}>
          <TopBar />
        </View>
        */}

        {/* STEP 1.06 drop the field in under it
        <View style={{ paddingHorizontal: MARGIN }}>
          <SearchField placeholder={SEARCH_PLACEHOLDER} />
        </View>
        */}

        {/* STEP 1.10 lay the offer across the page
        <View style={{ paddingHorizontal: MARGIN }}>
          <PromoCard
            badge={PROMO.badge}
            headline={PROMO.headline}
            cta={PROMO.cta}
            image={PROMO.image}
            slides={PROMO.slides}
          />
        </View>
        */}

        {/*
          The heading keeps the margin; the row underneath does not.

          This wrapper stays uncommented and its three children are staged as
          separate blocks. One STEP block cannot be nested inside another: the
          inner block's closing marker would end the outer one early and the
          file would stop parsing.
        */}
        <View style={{ gap: 12 }}>
          {/* STEP 1.19 name the first section | FIX 1.20 that is the reference's own typo, not ours
          <SectionHead title="Catergories" action={SECTIONS.categories.action} style={{ paddingHorizontal: MARGIN }} />
          */}

          {/* STEP 1.21 spell it properly this time
          <SectionHead
            title={SECTIONS.categories.title}
            action={SECTIONS.categories.action}
            style={{ paddingHorizontal: MARGIN }}
          />
          */}

          {/* STEP 1.23 run the chips along under it
          <CategoryRow categories={CATEGORIES} />
          */}
        </View>

        <View style={{ paddingHorizontal: MARGIN, gap: 14 }}>
          {/* STEP 1.28 name what is new
          <SectionHead title={SECTIONS.arrivals.title} action={SECTIONS.arrivals.action} />
          */}

          {/* STEP 1.30 and lay the products out under it
          <ProductGrid products={NEW_ARRIVALS} />
          */}
        </View>
      </ScrollView>

      {/* STEP 1.38 float the bar over it all
      <TabBar active="home" bottomInset={insets.bottom} />
      */}
    </View>
  );
}
