import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.17 import account foot
// import { AccountFoot } from '@/features/verdestart/components/account-foot';
// STEP 1.01 import hero panel
// import { HeroPanel } from '@/features/verdestart/components/hero-panel';
// STEP 1.10 import start actions
// import { StartActions } from '@/features/verdestart/components/start-actions';
// STEP 1.05 import welcome copy
// import { WelcomeCopy } from '@/features/verdestart/components/welcome-copy';
import { useLayout } from '@/features/verdestart/layout';
import { ct } from '@/features/verdestart/theme';

/**
 * Verdeat — welcome.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero takes the screen's slack, so the foot cannot open a band and no
 * spacer is ever needed (I3).
 */
export default function VerdestartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 hero panel
      <HeroPanel width={L.W} height={L.hero.h} radius={L.hero.radius} insetTop={L.insets.top} />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.08 a stray gap above it | FIX 1.09 take the gap back out
      <View style={{ width: 11, height: 11 }} />
      */}
      {/* STEP 1.05 welcome copy
      <WelcomeCopy margin={L.margin} titleH={L.titleH} bodyH={L.bodyH} />
      */}

      <View style={{ height: L.gapBody }} />
      {/* STEP 1.15 a stray gap above it | FIX 1.16 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.10 start actions
      <StartActions
        margin={L.margin}
        height={L.cta.h}
        gap={L.gapCta}
        onStart={() => router.push('/verdehome')}
      />
      */}

      <View style={{ height: L.gapFoot }} />
      {/* STEP 1.20 a stray gap above it | FIX 1.21 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.17 account foot
      <AccountFoot height={L.footH} onPress={() => router.push('/verdehome')} />
      */}
    </View>
  );
}
