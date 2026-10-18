import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Header } from '@/features/quizboard/components/header';
import { Podium } from '@/features/quizboard/components/podium';
import { RankList } from '@/features/quizboard/components/rank-list';
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
        <Header />
      </View>

      <View
        style={{ marginTop: PODIUM_TOP, marginBottom: PODIUM_BOTTOM, paddingHorizontal: MARGIN }}
      >
        <Podium />
      </View>

      <RankList />
    </View>
  );
}
