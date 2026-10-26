import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.07 what has moved
// import { ActionList, ColumnHead } from '@/features/nestactions/components/action-list';
// STEP 1.20 and where else it goes
// import { Dock } from '@/features/nestactions/components/dock';
// STEP 1.01 who is here
// import { TopBar } from '@/features/nestactions/components/top-bar';
import { T } from '@/features/nestactions/components/text';
import { copy } from '@/features/nestactions/data/start';
import { MARGIN, TITLE_TOP } from '@/features/nestactions/layout';
import { ne, type } from '@/features/nestactions/theme';
import { useInsets } from '@/features/nestactions/use-insets';

/**
 * Nest — the ledger.
 *
 * Assembly only: who is here, what the columns are, everything that has
 * moved, and where else the app goes.
 *
 * The dock is welded to the foot and takes the bottom inset itself, so the
 * list scrolls under it and its last row runs off the edge — which is what
 * the reference crops.
 */
export default function NestactionsScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ne.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <TopBar />
*/}

{/* STEP 1.06 what the screen is
        <T variant="title" color={ne.ink} style={{ marginTop: TITLE_TOP, height: type.title.line }}>
          {copy.title}
        </T>
*/}

{/* STEP 1.08 the columns
        <ColumnHead />
*/}

{/* STEP 1.09 the rows
        <ActionList onPress={() => router.push('/nesthome')} />
*/}
      </View>

{/* STEP 1.21 and a dark bar
      <Dock
        active="actions"
        bottom={insets.bottom}
        onSelect={(id) => {
          if (id === 'home') router.push('/nesthome');
          if (id === 'perf') router.push('/nestperf');
        }}
      />
*/}
    </View>
  );
}
