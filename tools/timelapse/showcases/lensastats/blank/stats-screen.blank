import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.11 what today came to
// import { CaloriesCard } from '@/features/lensastats/components/calories-card';
// STEP 1.06 eight days
// import { DayChart } from '@/features/lensastats/components/day-chart';
// STEP 1.20 and what it was made of
// import { NutritionCard } from '@/features/lensastats/components/nutrition-card';
// STEP 1.01 the way back
// import { TopBar } from '@/features/lensastats/components/top-bar';
import { MARGIN } from '@/features/lensastats/layout';
import { ls } from '@/features/lensastats/theme';
import { useInsets } from '@/features/lensastats/use-insets';

/**
 * Lensa - the figures.
 *
 * Assembly only: the way back, eight days of intake, what today came to
 * against its target, and what it was made of.
 *
 * The chart takes `flex: 1`, so it grows into whatever the phone can spare
 * above the two cards and the last card sits on the bottom inset - the
 * screen has no band of empty canvas at the foot.
 */
export default function LensastatsScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ls.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 at the top
      <TopBar onBack={() => router.back()} />
*/}

{/* STEP 1.07 a chart
      <DayChart />
*/}

{/* STEP 1.12 the headline card
      <CaloriesCard onOpen={() => router.push('/lensahome')} />
*/}

{/* STEP 1.21 and the pies
      <NutritionCard onOpen={() => router.push('/lensahome')} />
*/}
    </View>
  );
}
