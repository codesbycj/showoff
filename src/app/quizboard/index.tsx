import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 what the screen is
// import { Header } from '@/features/quizboard/components/header';
// STEP 1.05 the top three
// import { Podium } from '@/features/quizboard/components/podium';
// STEP 1.13 and everyone behind them
// import { RankList } from '@/features/quizboard/components/rank-list';
import { HEADER_TOP, MARGIN, PODIUM_BOTTOM, PODIUM_TOP } from '@/features/quizboard/layout';
import { qz } from '@/features/quizboard/theme';
import { useInsets } from '@/features/quizboard/use-insets';

/**
 * Quiz — the leaderboard.
 *
 * Assembly only: what the screen is, the top three, and everyone behind them.
 *
 * The list takes `flex: 1` rather than a height, so the sheet reaches the
 * bottom edge on any phone and the ranking runs off it the way the reference
 * shows — a fixed height leaves a band of page under the last row on a tall
 * screen, which is the one thing a design shot never has.
 */
export default function QuizBoard() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: qz.canvas }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.02 across the top
        <Header />
        */}
      </View>

      <View
        style={{ marginTop: PODIUM_TOP, marginBottom: PODIUM_BOTTOM, paddingHorizontal: MARGIN }}
      >
        {/* STEP 1.06 under the title
        <Podium />
        */}
      </View>

      {/* STEP 1.14 on a sheet to the bottom edge
      <RankList />
      */}
    </View>
  );
}
