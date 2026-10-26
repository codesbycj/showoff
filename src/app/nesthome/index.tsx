import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.11 what it does
// import { ActionDiscs } from '@/features/nesthome/components/action-discs';
// STEP 1.06 what it holds
// import { BalanceBlock } from '@/features/nesthome/components/balance-block';
// STEP 1.17 who it knows
// import { ContactGrid } from '@/features/nesthome/components/contact-grid';
// STEP 1.24 and where else it goes
// import { Dock } from '@/features/nesthome/components/dock';
// STEP 1.01 who is here
// import { TopBar } from '@/features/nesthome/components/top-bar';
import { MARGIN } from '@/features/nesthome/layout';
import { ne } from '@/features/nesthome/theme';
import { useInsets } from '@/features/nesthome/use-insets';

/**
 * Nest — the wallet.
 *
 * Assembly only: who is here, what the wallet holds, the four things it
 * does, everyone it knows, and where else the app goes.
 *
 * The dock is welded to the foot and takes the bottom inset itself, so the
 * contact grid can scroll under it — which is why the grid takes `flex: 1`
 * and the screen has no band of empty cream at the foot.
 */
export default function NesthomeScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ne.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <TopBar />
*/}

{/* STEP 1.07 the balance
        <BalanceBlock />
*/}

{/* STEP 1.12 four discs
        <ActionDiscs onAdd={() => router.push('/nestactions')} />
*/}

{/* STEP 1.18 a grid of people
        <ContactGrid onPress={() => router.push('/nestactions')} />
*/}
      </View>

{/* STEP 1.25 and a dark bar
      <Dock
        active="home"
        bottom={insets.bottom}
        onSelect={(id) => {
          if (id === 'perf') router.push('/nestperf');
          if (id === 'actions') router.push('/nestactions');
        }}
      />
*/}
    </View>
  );
}
