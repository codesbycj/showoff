import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.18 import the board head
// import { BoardHead } from '@/features/volt/components/board-head';
// STEP 2.03 import the week strip
// import { DateStrip } from '@/features/volt/components/date-strip';
// STEP 2.12 import the league rail
// import { LeagueChips } from '@/features/volt/components/league-chips';
// STEP 2.20 import the fixture card
// import { ScoreCard } from '@/features/volt/components/score-card';
// STEP 2.01 import the search bar
// import { SearchBar } from '@/features/volt/components/search-bar';
// STEP 2.24 import the dock
// import { TabBar } from '@/features/volt/components/tab-bar';
import { NAV } from '@/features/volt/data/home';
import { BOARD, DATES, LEAGUES, MATCHES, SEARCH } from '@/features/volt/data/scores';
import { SP, voltTheme, vt } from '@/features/volt/theme';

/**
 * Screen 2 — live scores and schedule.
 *
 * The only screen here rebuilt from markup with no reference render to check
 * against: Stitch's own capture of this one came back empty but for the dock.
 *
 * Two selections live here — the day and the league. The odds pills on each
 * card are presentational, because the export's own script only restyles them
 * and never records a choice.
 */
export default function VoltScores() {
  const insets = useSafeAreaInsets();
  const [day, setDay] = useState<string>('15');
  const [league, setLeague] = useState<string>('ucl');

  return (
    <View style={[voltTheme, { flex: 1, backgroundColor: vt.surface }]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + SP.gutter,
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 110,
          gap: SP.xl,
        }}
      >
{/* STEP 2.02 somewhere to search
        <SearchBar placeholder={SEARCH.placeholder} />
*/}

{/* STEP 2.04 room for the week
        <DateStrip dates={DATES} selected={day} onSelect={setDay} />
*/}

{/* STEP 2.13 room for the leagues
        <LeagueChips leagues={LEAGUES} selected={league} onSelect={setLeague} />
*/}

        <View style={{ gap: SP.lg }}>
{/* STEP 2.19 name the board | FIX 2.26 the count is the pill, not the title
          <BoardHead title={BOARD.count} count={BOARD.title} />
*/}

{/* STEP 2.25 name the board, the right way round
          <BoardHead title={BOARD.title} count={BOARD.count} />
*/}

{/* STEP 2.27 room for the fixtures
          {MATCHES.map((m) => (
            <ScoreCard key={m.key} match={m} onPress={() => router.push('/volt/stream')} />
          ))}
*/}
        </View>
      </ScrollView>

{/* STEP 2.28 pin the dock
      <TabBar
        items={NAV}
        active="live"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'live') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
