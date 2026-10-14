import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the bar that stays put
// import { AppBar } from '@/features/botanic/components/app-bar';
// STEP 1.30 what the chef wants you to know
// import { ChefsNote } from '@/features/botanic/components/chefs-note';
// STEP 1.07 the dish, and the light around it
// import { HeroShowcase } from '@/features/botanic/components/hero-showcase';
// STEP 1.34 what is actually in it
// import { IngredientChips } from '@/features/botanic/components/ingredient-chips';
// STEP 1.23 and what it does to you
// import { NutritionPod } from '@/features/botanic/components/nutrition-pod';
// STEP 1.43 the only button that matters
// import { PurchaseBar } from '@/features/botanic/components/purchase-bar';
// STEP 1.22 what everyone else made of it
// import { RatingPod } from '@/features/botanic/components/rating-pod';
// STEP 1.16 what it is called, and what it costs
// import { TitleBlock } from '@/features/botanic/components/title-block';
// STEP 1.39 and who vouches for it
// import { VerifiedRow } from '@/features/botanic/components/verified-row';
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
{/* STEP 1.08 put the dish on the page
        <HeroShowcase />
*/}

        <View style={{ paddingHorizontal: MARGIN, paddingTop: SECTION_GAP, gap: SECTION_GAP }}>
{/* STEP 1.17 name it and price it
          <TitleBlock />
*/}

          <View style={{ flexDirection: 'row', gap: 16 }}>
{/* STEP 1.24 two pods, side by side
            <RatingPod />
            <NutritionPod />
*/}
          </View>

{/* STEP 1.31 the story behind it
          <ChefsNote />
*/}
{/* STEP 1.35 the things it is made of
          <IngredientChips />
*/}
{/* STEP 1.40 the kitchen's word for it
          <VerifiedRow />
*/}
        </View>
      </ScrollView>

{/* STEP 1.02 pin the bar
      <AppBar />
*/}
{/* STEP 1.44 and the way to buy it
      <PurchaseBar />
*/}
    </View>
  );
}
