import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.13 what to do with it
// import { Caption } from '@/features/cratescan/components/caption';
// STEP 1.16 and the controls
// import { Controls } from '@/features/cratescan/components/controls';
// STEP 1.06 the viewfinder
// import { ScanFrame } from '@/features/cratescan/components/scan-frame';
// STEP 1.01 the way back
// import { TopBar } from '@/features/cratescan/components/top-bar';
import { MARGIN } from '@/features/cratescan/layout';
import { cr } from '@/features/cratescan/theme';
import { useInsets } from '@/features/cratescan/use-insets';

/**
 * Crate — the scanner.
 *
 * Assembly only: the way back, the viewfinder, what to do with it, and the
 * three controls.
 *
 * The frame takes the slack between the header and the caption, so the
 * viewfinder grows to whatever the phone can spare and the controls sit on
 * the bottom inset at any screen height.
 */
export default function CratescanScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: cr.surface,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 and what this is
      <TopBar onBack={() => router.back()} />
*/}

{/* STEP 1.07 filling the page
      <ScanFrame />
*/}

{/* STEP 1.14 in one line
      <Caption />
*/}

{/* STEP 1.17 three of them
      <Controls onScan={() => router.push('/cratetrack')} />
*/}
    </View>
  );
}
