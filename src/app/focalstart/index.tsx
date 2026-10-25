import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BrandRow } from '@/features/focalstart/components/brand-row';
import { HeroCopy } from '@/features/focalstart/components/hero-copy';
import { StartButton } from '@/features/focalstart/components/start-button';
import { StatPair } from '@/features/focalstart/components/stat-pair';
import { MARGIN } from '@/features/focalstart/layout';
import { fc } from '@/features/focalstart/theme';
import { useInsets } from '@/features/focalstart/use-insets';

/**
 * Focal — onboarding.
 *
 * Assembly only: the brand and the way past it, what the app is for, the two
 * proof cards, and the way on.
 *
 * The cards take the slack between the blurb and the button, so the foot
 * rides the bottom inset at any screen height instead of leaving a band of
 * canvas under it.
 */
export default function FocalstartScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: fc.canvas,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <BrandRow onSkip={() => router.push('/focalhome')} />

      <HeroCopy />

      <View style={{ flex: 1 }}>
        <StatPair />
      </View>

      <StartButton
        onStart={() => router.push('/focalhome')}
        onSignIn={() => router.push('/focalhome')}
      />
    </View>
  );
}
