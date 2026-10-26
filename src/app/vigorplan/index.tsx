import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.10 and which one is picked
// import { DayRail } from '@/features/vigorplan/components/day-rail';
// STEP 1.16 the programmes
// import { PlanCard } from '@/features/vigorplan/components/plan-card';
// STEP 1.06 what day it is
// import { PlanHead } from '@/features/vigorplan/components/plan-head';
// STEP 1.01 who is here
// import { TopBar } from '@/features/vigorplan/components/top-bar';
import { todayNum } from '@/features/vigorplan/data/start';
import { LIST_TOP, MARGIN } from '@/features/vigorplan/layout';
import { vg } from '@/features/vigorplan/theme';
import { useInsets } from '@/features/vigorplan/use-insets';

/**
 * Vigor — the plan.
 *
 * Assembly only: who is here, which day, and the programmes for it.
 *
 * The cards scroll with the last one running under the bottom edge, which is
 * what the reference crops — so the screen has no band of empty orange at the
 * foot however tall the phone is. The picked day is real state held here.
 */
export default function VigorplanScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState(todayNum);

  return (
    <View style={{ flex: 1, backgroundColor: vg.orange, paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <TopBar />
*/}

{/* STEP 1.07 the date and the title
        <PlanHead />
*/}

{/* STEP 1.11 a rail of days
        <DayRail picked={picked} onPick={setPicked} />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: LIST_TOP }}
      >
{/* STEP 1.17 the first
        <PlanCard i={0} onStart={() => router.push('/vigorfind')} />
*/}
{/* STEP 1.23 and the two behind it
        <PlanCard i={1} onStart={() => router.push('/vigorfind')} />
        <PlanCard i={2} onStart={() => router.push('/vigorfind')} />
*/}
      </ScrollView>
    </View>
  );
}
