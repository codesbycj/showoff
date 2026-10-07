import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.01 import the app bar
// import { AppBar } from '@/features/fashora/components/app-bar';
// STEP 1.13 import the category rail
// import { CategoryRail } from '@/features/fashora/components/category-rail';
// STEP 1.28 import the dock
// import { Dock } from '@/features/fashora/components/dock';
// STEP 1.03 import the greeting
// import { GreetingRow } from '@/features/fashora/components/greeting-row';
// STEP 1.21 import the product card
// import { ProductCard } from '@/features/fashora/components/product-card';
// STEP 1.08 import the promo card
// import { PromoCard } from '@/features/fashora/components/promo-card';
// STEP 1.06 import the search row
// import { SearchRow } from '@/features/fashora/components/search-row';
// STEP 1.12 import the section head
// import { SectionHead } from '@/features/fashora/components/section-head';
import { NAV } from '@/features/fashora/data/chrome';
import {
  CATEGORIES,
  GREETING,
  PRODUCTS,
  PROMO,
  SEARCH,
  SECTIONS,
} from '@/features/fashora/data/home';
import { SP, fa, fashoraTheme } from '@/features/fashora/theme';

/** Screen 1 — the home feed. */
export default function FashoraHome() {
  const insets = useSafeAreaInsets();
  // The grid's column width is measured, not assumed. Hard-coding the 393dp
  // the reference was captured at gives the right number on the device and a
  // third column on anything wider.
  const { width } = useWindowDimensions();
  const [category, setCategory] = useState('all');
  const [saved, setSaved] = useState<readonly string[]>(['tee']);

  const toggle = (key: string) =>
    setSaved((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  return (
    <View style={[fashoraTheme, { flex: 1, backgroundColor: fa.surface }]}>
      <StatusBar style="dark" />

{/* STEP 1.02 the brand bar
      <AppBar
        action="notifications"
        // MISTAKE 1.05 the bar handed the detail screen's share control
        action="share"
        inset={insets.top}
      />
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 112 }}
      >
{/* STEP 1.04 say hello
        <GreetingRow hello={GREETING.hello} name={GREETING.name} avatar={GREETING.avatar} />
*/}

{/* STEP 1.07 somewhere to search
        <SearchRow placeholder={SEARCH.placeholder} />
*/}

{/* STEP 1.09 the sale banner | FIX 1.11 drop the copy that reads inside out
        <PromoCard headline={PROMO.cta} cta={PROMO.headline} model={PROMO.model} />
*/}

{/* STEP 1.10 the same banner, with its copy where it belongs
        <PromoCard headline={PROMO.headline} cta={PROMO.cta} model={PROMO.model} />
*/}

{/* STEP 1.14 room for the categories
        <View style={{ paddingVertical: SP.gutterMobile }}>
          <View style={{ paddingHorizontal: SP.marginMobile, marginBottom: 10 }}>
            <SectionHead title={SECTIONS.categories} action={SECTIONS.seeAll} />
          </View>

          <CategoryRail items={CATEGORIES} selected={category} onSelect={setCategory} />
        </View>
*/}

{/* STEP 1.22 room for the products
        <View style={{ paddingHorizontal: SP.marginMobile, paddingVertical: SP.gutterMobile }}>
          <View style={{ marginBottom: SP.gutterMobile }}>
            <SectionHead title={SECTIONS.popular} action={SECTIONS.seeAll} />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SP.gutterMobile }}>
            {PRODUCTS.map((p) => (
              <View
                key={p.key}
                style={{
                  width: (width - 2 * SP.marginMobile - SP.gutterMobile) / 2,
                  // MISTAKE 1.27 the column measured without its gutter, so two never fit
                  width: (width - 2 * SP.marginMobile) / 2,
                }}
              >
                <ProductCard
                  product={p}
                  saved={saved.includes(p.key)}
                  onToggleSave={() => toggle(p.key)}
                  onPress={() => router.push('/fashora/detail')}
                />
              </View>
            ))}
          </View>
        </View>
*/}
      </ScrollView>

{/* STEP 1.29 pin the dock
      <Dock
        items={NAV}
        active="home"
        // MISTAKE 1.34 the dock lit on the tab we are not on
        active="profile"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'home') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
