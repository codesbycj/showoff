import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.33 and where else it goes
// import { Dock } from '@/features/nibblehome/components/dock';
// STEP 1.25 the meals
// import { MealCard } from '@/features/nibblehome/components/meal-card';
// STEP 1.07 how the day is going
// import { ProgressHero } from '@/features/nibblehome/components/progress-hero';
// STEP 1.14 the body, and the week
// import { StatTiles } from '@/features/nibblehome/components/stat-tiles';
// STEP 1.01 who is here
// import { TopBar } from '@/features/nibblehome/components/top-bar';
import { MARGIN } from '@/features/nibblehome/layout';
import { nb } from '@/features/nibblehome/theme';
import { useInsets } from '@/features/nibblehome/use-insets';

/**
 * Nibble — the day.
 *
 * Assembly only: who is here, how the day is going, what the body weighs
 * against what it has eaten, the meal itself, and where else the app goes.
 *
 * The meal card takes `flex: 1`, so it grows into whatever the phone can
 * spare and the dock sits on the bottom inset — the screen has no band of
 * empty canvas at the foot.
 */
export default function NibblehomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: nb.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 at the top
      <TopBar onSearch={() => router.push('/nibbleweek')} />
*/}

{/* STEP 1.08 on a blue card
      <ProgressHero onDate={() => router.push('/nibbleweek')} />
*/}

{/* STEP 1.15 two tiles
      <StatTiles />
*/}

{/* STEP 1.26 on mint
      <MealCard onAdd={() => router.push('/nibbleweek')} />
*/}

{/* STEP 1.34 along the foot
      <Dock
        active="you"
        onSelect={(id) => {
          if (id === 'week') router.push('/nibbleweek');
          if (id === 'scan') router.push('/nibbleboards');
        }}
      />
*/}
    </View>
  );
}
