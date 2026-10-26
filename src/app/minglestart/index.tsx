import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.05 the people
// import { Constellation } from '@/features/minglestart/components/constellation';
// STEP 1.17 what the app is
// import { Pitch } from '@/features/minglestart/components/pitch';
// STEP 1.20 and the way in
// import { StartButton } from '@/features/minglestart/components/start-button';
// STEP 1.01 the brand
// import { Wordmark } from '@/features/minglestart/components/wordmark';
import { MARGIN } from '@/features/minglestart/layout';
import { mg } from '@/features/minglestart/theme';
import { useInsets } from '@/features/minglestart/use-insets';

/**
 * Mingle — the welcome.
 *
 * Assembly only: the brand, the people, what the app is, and the way in.
 *
 * The constellation takes `flex: 1`, so it opens out into whatever the phone
 * can spare above the sentence and the button sits on the bottom inset — the
 * screen has no band of empty red at the foot.
 */
export default function MinglestartScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mg.red,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="light" />

{/* STEP 1.02 at the top
      <Wordmark />
*/}

{/* STEP 1.06 a constellation
      <Constellation />
*/}

{/* STEP 1.18 the sentence
      <Pitch />
*/}

{/* STEP 1.21 and the button
      <StartButton onPress={() => router.push('/mingleswipe')} />
*/}
    </View>
  );
}
