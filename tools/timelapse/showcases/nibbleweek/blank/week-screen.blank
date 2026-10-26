import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.32 and a way to add more
// import { CountBar } from '@/features/nibbleweek/components/count-bar';
// STEP 1.21 what was logged
// import { FoodCards } from '@/features/nibbleweek/components/food-cards';
// STEP 1.15 what is left of it
// import { LeftBlock } from '@/features/nibbleweek/components/left-block';
// STEP 1.01 the way back
// import { TopBar } from '@/features/nibbleweek/components/top-bar';
// STEP 1.05 which day
// import { WeekStrip } from '@/features/nibbleweek/components/week-strip';
import { todayNum } from '@/features/nibbleweek/data/start';
import { MARGIN } from '@/features/nibbleweek/layout';
import { nb } from '@/features/nibbleweek/theme';
import { useInsets } from '@/features/nibbleweek/use-insets';

/**
 * Nibble — the week.
 *
 * Assembly only: the way back, which day, what is left of it, what was
 * logged, and a way to add more.
 *
 * The picked day is real state held here, so the rail answers a tap. The food
 * cards take `flex: 1`, so they grow into whatever the phone can spare and
 * the count bar sits on the bottom inset — the screen has no band of empty
 * canvas at the foot.
 */
export default function NibbleweekScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState(todayNum);

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
      <TopBar onBack={() => router.back()} />
*/}

{/* STEP 1.06 a rail of days
      <WeekStrip picked={picked} onPick={setPicked} />
*/}

{/* STEP 1.16 the headline
      <LeftBlock />
*/}

{/* STEP 1.22 two cards
      <FoodCards onPress={() => router.push('/nibbleboards')} />
*/}

{/* STEP 1.33 and a bar along the foot
      <CountBar onPress={() => router.push('/nibbleboards')} />
*/}
    </View>
  );
}
