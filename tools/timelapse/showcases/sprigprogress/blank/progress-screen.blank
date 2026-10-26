import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.26 and where else it goes
// import { Dock } from '@/features/sprigprogress/components/dock';
// STEP 1.21 what it is for
// import { GoalRow } from '@/features/sprigprogress/components/goal-row';
// STEP 1.01 what this is
// import { Header } from '@/features/sprigprogress/components/header';
// STEP 1.05 how far through
// import { ProgressCard } from '@/features/sprigprogress/components/progress-card';
// STEP 1.12 in and out
// import { SplitTiles } from '@/features/sprigprogress/components/split-tiles';
// STEP 1.16 the run of days
// import { StreakCard } from '@/features/sprigprogress/components/streak-card';
import { MARGIN } from '@/features/sprigprogress/layout';
import { sg } from '@/features/sprigprogress/theme';
import { useInsets } from '@/features/sprigprogress/use-insets';

/**
 * Sprig — progress.
 *
 * Assembly only: what the screen is, how far through the plan, what goes in
 * against what goes out, the run of days kept, and what all of it is for.
 *
 * The streak photograph takes `flex: 1`, so it grows into whatever the phone
 * can spare and the goal row sits above the dock on the bottom inset rather
 * than leaving a band of empty canvas.
 */
export default function SprigprogressScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: sg.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 at the top
      <Header />
*/}

{/* STEP 1.06 on a lime card
      <ProgressCard />
*/}

{/* STEP 1.13 two tiles
      <SplitTiles onPress={() => router.push('/sprighome')} />
*/}

{/* STEP 1.17 a photograph
      <StreakCard />
*/}

{/* STEP 1.22 the goal
      <GoalRow onPress={() => router.push('/sprigdish')} />
*/}

{/* STEP 1.27 along the foot
      <Dock
        active="burn"
        onSelect={(id) => id === 'day' && router.push('/sprighome')}
        onAdd={() => router.push('/sprigdish')}
      />
*/}
    </View>
  );
}
