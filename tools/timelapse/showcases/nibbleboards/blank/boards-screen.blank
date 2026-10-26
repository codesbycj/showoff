import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.11 the two boards
// import { BoardTiles } from '@/features/nibbleboards/components/board-tiles';
// STEP 1.34 and where else it goes
// import { Dock } from '@/features/nibbleboards/components/dock';
// STEP 1.21 the five gauges
// import { GaugeRow } from '@/features/nibbleboards/components/gauge-row';
// STEP 1.07 what this is about
// import { Headline } from '@/features/nibbleboards/components/headline';
// STEP 1.28 who else sees it
// import { ShareRow } from '@/features/nibbleboards/components/share-row';
// STEP 1.01 who is here
// import { TopBar } from '@/features/nibbleboards/components/top-bar';
import { MARGIN } from '@/features/nibbleboards/layout';
import { nb } from '@/features/nibbleboards/theme';
import { useInsets } from '@/features/nibbleboards/use-insets';

/**
 * Nibble — the boards.
 *
 * Assembly only: who is here, what the screen is about, the two boards, the
 * five gauges under them, who else can see it, and where else the app goes.
 *
 * The gauge row takes `flex: 1`, so it grows into whatever the phone can
 * spare and the dock sits on the bottom inset — the screen has no band of
 * empty canvas at the foot.
 */
export default function NibbleboardsScreen() {
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

{/* STEP 1.08 a sentence
      <Headline onAdd={() => router.push('/nibbleweek')} />
*/}

{/* STEP 1.12 two tiles
      <BoardTiles />
*/}

{/* STEP 1.22 five gauges
      <GaugeRow />
*/}

{/* STEP 1.29 a share row
      <ShareRow />
*/}

{/* STEP 1.35 along the foot
      <Dock
        active="scan"
        onSelect={(id) => {
          if (id === 'you') router.push('/nibblehome');
          if (id === 'week') router.push('/nibbleweek');
        }}
      />
*/}
    </View>
  );
}
