import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 the name
// import { BrandHead } from '@/features/lensahome/components/brand-head';
// STEP 1.05 which day
// import { DayPills } from '@/features/lensahome/components/day-pills';
// STEP 1.26 and where else it goes
// import { Dock } from '@/features/lensahome/components/dock';
// STEP 1.10 how much has gone
// import { IntakeCard } from '@/features/lensahome/components/intake-card';
// STEP 1.16 what it was made of
// import { NutritionCard } from '@/features/lensahome/components/nutrition-card';
// STEP 1.22 what the scales said
// import { WeightCard } from '@/features/lensahome/components/weight-card';
import { MARGIN } from '@/features/lensahome/layout';
import { ls } from '@/features/lensahome/theme';
import { useInsets } from '@/features/lensahome/use-insets';

/**
 * Lensa — the day.
 *
 * Assembly only: the name, which day, how much of the allowance has gone,
 * the three macros, what the scales said, and where else the app goes.
 *
 * The weight card takes `flex: 1`, so it grows into whatever the phone can
 * spare and the dock sits on the bottom inset — the screen has no band of
 * empty canvas at the foot.
 */
export default function LensahomeScreen() {
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
      <BrandHead />
*/}

{/* STEP 1.06 a row of pills
      <DayPills onDay={() => router.push('/lensastats')} />
*/}

{/* STEP 1.11 the headline
      <IntakeCard />
*/}

{/* STEP 1.17 the macros
      <NutritionCard onOpen={() => router.push('/lensastats')} />
*/}

{/* STEP 1.23 the weight
      <WeightCard onOpen={() => router.push('/lensastats')} />
*/}

{/* STEP 1.27 along the foot
      <Dock
        active="boards"
        onSelect={(id) => id === 'stats' && router.push('/lensastats')}
        onShoot={() => router.push('/lensastats')}
      />
*/}
    </View>
  );
}
