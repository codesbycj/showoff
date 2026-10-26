import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.15 and where else it goes
// import { Dock } from '@/features/volleyrank/components/dock';
// STEP 1.05 the top three
// import { Podium } from '@/features/volleyrank/components/podium';
// STEP 1.01 what the screen is
// import { RankHead } from '@/features/volleyrank/components/rank-head';
// STEP 1.09 everyone below them
// import { RankSheet } from '@/features/volleyrank/components/rank-sheet';
import { MARGIN } from '@/features/volleyrank/layout';
import { vl } from '@/features/volleyrank/theme';
import { useInsets } from '@/features/volleyrank/use-insets';

/**
 * Volley - the leaderboard.
 *
 * Assembly only: what the screen is, which board, the top three, everyone
 * below them, and where else the app goes.
 *
 * The green block holds the podium and the white sheet takes the rest, so
 * the rows scroll inside the sheet and the "your rank" card stays pinned
 * above the dock. The picked board is real state held here.
 */
export default function VolleyrankScreen() {
  const insets = useInsets();
  const [tab, setTab] = useState('global');

  return (
    <View style={{ flex: 1, backgroundColor: vl.green, paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <RankHead tab={tab} onTab={setTab} />
*/}

{/* STEP 1.06 a podium
        <Podium />
*/}
      </View>

{/* STEP 1.10 a sheet
      <RankSheet onPress={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.16 and the foot
      <View
        style={{
          backgroundColor: vl.canvas,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom,
        }}
      >
        <Dock active="rank" onSelect={(id) => id === 'home' && router.push('/volleyhome')} />
      </View>
*/}
    </View>
  );
}
