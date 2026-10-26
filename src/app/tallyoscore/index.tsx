import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.29 and where else it goes
// import { Dock } from '@/features/tallyoscore/components/dock';
// STEP 1.23 how it is going
// import { ProgressCard } from '@/features/tallyoscore/components/progress-card';
// STEP 1.05 the sentence it is all for
// import { ScoreSentence } from '@/features/tallyoscore/components/score-sentence';
// STEP 1.17 who else sees them
// import { ShareBar } from '@/features/tallyoscore/components/share-bar';
// STEP 1.12 two figures
// import { StatChips } from '@/features/tallyoscore/components/stat-chips';
// STEP 1.01 the mark
// import { TopBar } from '@/features/tallyoscore/components/top-bar';
import { MARGIN } from '@/features/tallyoscore/layout';
import { ty } from '@/features/tallyoscore/theme';
import { useInsets } from '@/features/tallyoscore/use-insets';

/**
 * Tallyo — the score.
 *
 * Assembly only: the mark, the sentence the screen is for, the two figures
 * under it, who else is getting them, how the period is going, and where
 * else the app goes.
 *
 * The progress card takes `flex: 1`, so it grows into whatever the phone can
 * spare and the dock sits on the bottom inset — the screen has no band of
 * empty canvas at the foot.
 */
export default function TallyoscoreScreen() {
  const insets = useInsets();
  const [range, setRange] = useState('monthly');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ty.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 at the top
      <TopBar />
*/}

{/* STEP 1.06 the headline
      <ScoreSentence />
*/}

{/* STEP 1.13 two chips
      <StatChips />
*/}

{/* STEP 1.18 a yellow bar
      <ShareBar />
*/}

{/* STEP 1.24 a cyan card
      <ProgressCard range={range} onRange={setRange} />
*/}

{/* STEP 1.30 and a dark one
      <Dock active="stats" />
*/}
    </View>
  );
}
