import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.06 import friend field
// import { FriendField } from '@/features/wisefriends/components/friend-field';
// STEP 1.15 import onboard foot
// import { OnboardFoot } from '@/features/wisefriends/components/onboard-foot';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/wisefriends/components/wordmark';
import { useLayout } from '@/features/wisefriends/layout';
import { ct } from '@/features/wisefriends/theme';

/**
 * WanderWise — onboarding, two of three.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The field is the remainder, so the action always sits on the foot with no
 * band under it (I3) — and it is the map *idea*, never a traced map (I4).
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
      {/* STEP 1.13 a stray gap above it | FIX 1.14 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.06 friend field
      <View style={{ marginHorizontal: L.margin }}>
        <FriendField width={L.W - L.margin * 2} height={L.collage.h} />
      </View>
      */}

      {/* STEP 1.21 a stray gap above it | FIX 1.22 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.15 onboard foot
      <OnboardFoot
        margin={L.margin}
        displayH={L.displayH}
        gapDisplay={L.gapDisplay}
        bodyH={L.bodyH}
        gapBody={L.gapBody}
        dotsH={L.dotsH}
        gapDots={L.gapDots}
        ctaH={L.cta.h}
        onNext={() => router.push('/wiseplaces')}
      />
      */}
    </View>
  );
}
