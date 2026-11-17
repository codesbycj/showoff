import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.06 import place stack
// import { PlaceStack } from '@/features/wiseplaces/components/place-stack';
// STEP 1.18 import onboard foot
// import { OnboardFoot } from '@/features/wiseplaces/components/onboard-foot';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/wiseplaces/components/wordmark';
import { useLayout } from '@/features/wiseplaces/layout';
import { ct } from '@/features/wiseplaces/theme';

/**
 * WanderWise — onboarding, three of three.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The stack is the remainder, so the action always sits on the foot with no
 * band under it (I3).
 */
export default function WisefriendsScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.04 a stray gap above it | FIX 1.05 take the gap back out
      <View style={{ width: 11, height: 11 }} />
      */}
      {/* STEP 1.01 wordmark
      <Wordmark height={L.markH} />
      */}

      <View style={{ height: L.gapMark }} />
      {/* STEP 1.16 a stray gap above it | FIX 1.17 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.06 place stack
      <View style={{ marginHorizontal: L.margin }}>
        <PlaceStack width={L.W - L.margin * 2} height={L.collage.h} />
      </View>
      */}

      {/* STEP 1.23 a stray gap above it | FIX 1.24 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.18 onboard foot
      <OnboardFoot
        margin={L.margin}
        displayH={L.displayH}
        gapDisplay={L.gapDisplay}
        bodyH={L.bodyH}
        gapBody={L.gapBody}
        dotsH={L.dotsH}
        gapDots={L.gapDots}
        ctaH={L.cta.h}
        onNext={() => router.push('/wisetrip')}
      />
      */}
    </View>
  );
}
