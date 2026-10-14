import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import { AppBar } from '@/features/botanic/components/app-bar';
import { ChefsNote } from '@/features/botanic/components/chefs-note';
import { HeroShowcase } from '@/features/botanic/components/hero-showcase';
import { IngredientChips } from '@/features/botanic/components/ingredient-chips';
import { NutritionPod } from '@/features/botanic/components/nutrition-pod';
import { PurchaseBar } from '@/features/botanic/components/purchase-bar';
import { RatingPod } from '@/features/botanic/components/rating-pod';
import { TitleBlock } from '@/features/botanic/components/title-block';
import { VerifiedRow } from '@/features/botanic/components/verified-row';
import { HEADER_HEIGHT, MARGIN, SCROLL_TAIL, SECTION_GAP } from '@/features/botanic/layout';
import { bt } from '@/features/botanic/theme';
import { useBotanicInsets } from '@/features/botanic/use-insets';

/**
 * Botanic — the product detail screen.
 *
 * Assembly only: every piece is a component, and this file just stacks them in
 * the reference's order. The bar and the purchase dock are siblings of the
 * scroller rather than children of it, because both are `fixed` in the export.
 */
export default function BotanicScreen() {
  const { top } = useBotanicInsets();

  return (
    <View style={{ flex: 1, backgroundColor: bt.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: top + HEADER_HEIGHT,
          paddingBottom: SCROLL_TAIL,
        }}
      >
        <HeroShowcase />

        {/* `px-margin pt-space-lg gap-space-lg` — one column holding every
            block below the panel, at a single margin and a single rhythm. */}
        <View style={{ paddingHorizontal: MARGIN, paddingTop: SECTION_GAP, gap: SECTION_GAP }}>
          <TitleBlock />

          {/* `grid grid-cols-2 gap-space-md` — two equal pods, so a flex row
              with both on `flex: 1` lands in the same place. */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <RatingPod />
            <NutritionPod />
          </View>

          <ChefsNote />
          <IngredientChips />
          <VerifiedRow />
        </View>
      </ScrollView>

      <AppBar />
      <PurchaseBar />
    </View>
  );
}
