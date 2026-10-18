import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.10 the categories
// import { FilterRow } from '@/features/treathome/components/filter-row';
// STEP 1.01 who is here
// import { Header } from '@/features/treathome/components/header';
// STEP 1.15 and what is in it
// import { ProductCard } from '@/features/treathome/components/product-card';
// STEP 1.06 what they can look for
// import { SearchField } from '@/features/treathome/components/search-field';
// STEP 1.21 the way around
// import { TabBar } from '@/features/treathome/components/tab-bar';
import { T } from '@/features/treathome/components/text';
import { products, section } from '@/features/treathome/data/home';
import {
  CARD_GAP,
  FILTER_TOP,
  HEADER_TOP,
  MARGIN,
  SCROLL_TAIL,
  SEARCH_TOP,
  SECTION_GAP,
  SECTION_TOP,
} from '@/features/treathome/layout';
import { tr } from '@/features/treathome/theme';
import { useInsets } from '@/features/treathome/use-insets';

/**
 * Treats — the home screen.
 *
 * Assembly only: who is here, what they can look for, what is on, and the
 * collection itself — over a scroll, with the tab bar pinned below it.
 *
 * The tab bar is a sibling of the scroll rather than the last thing in it, so
 * it stays put while the cards run under it. `SCROLL_TAIL` is what buys the
 * last card room to clear it.
 */
export default function TreatHome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tr.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 at the top
        <Header />
        */}

        <View style={{ marginTop: SEARCH_TOP }}>
          {/* STEP 1.07 under the greeting
          <SearchField />
          */}
        </View>

        <View style={{ marginTop: FILTER_TOP }}>
          {/* STEP 1.11 in a row off the edge
          <FilterRow />
          */}
        </View>

        {/* STEP 1.14 what the collection is
        <View
          style={{
            marginTop: SECTION_TOP,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <T variant="section" color={tr.ink}>
            {section.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={section.more}>
            <T variant="more" color={tr.muted}>
              {section.more}
            </T>
          </Pressable>
        </View>
        */}

        <View style={{ marginTop: SECTION_GAP, gap: CARD_GAP }}>
          {/* STEP 1.16 one card each
          {products.map((p) => (
            <ProductCard key={p.key} product={p} />
          ))}
          */}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
        {/* STEP 1.22 along the bottom
        <TabBar />
        */}
      </View>
    </View>
  );
}
