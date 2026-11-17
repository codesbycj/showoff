import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { HeroFrame } from '@/features/tamarstart/components/hero-frame';
// STEP 1.09 import body
// import { Body } from '@/features/tamarstart/components/body';
// STEP 1.04 import headline
// import { Headline } from '@/features/tamarstart/components/headline';
// STEP 1.14 import start aside
// import { StartAside } from '@/features/tamarstart/components/start-aside';
// STEP 1.10 import start cta
// import { StartCta } from '@/features/tamarstart/components/start-cta';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/tamarstart/components/wordmark';
import { useLayout } from '@/features/tamarstart/layout';
import { ct } from '@/features/tamarstart/theme';

/**
 * Tamarran — onboarding.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `HeroFrame` is full bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. The copy is pinned to the foot, so there is no block
 * that can leave a band under it.
 */
export default function TamarstartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />
      <HeroFrame width={L.W} height={L.H} scrimH={L.scrim.h} />

      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: L.footer }}>
        {/* STEP 1.01 wordmark
        <Wordmark height={L.wordmarkH} margin={L.margin} />
        */}

        <View style={{ height: L.gapWordmark }} />
        {/* STEP 1.07 a stray gap above it | FIX 1.08 take the gap back out
        <View style={{ height: 11 }} />
        */}
        {/* STEP 1.04 headline
        <Headline height={L.headlineH} margin={L.margin} />
        */}

        <View style={{ height: L.gapHeadline }} />
        {/* STEP 1.09 body
        <Body height={L.bodyH} margin={L.margin} />
        */}

        <View style={{ height: L.gapBody }} />
        {/* STEP 1.12 a stray gap above it | FIX 1.13 take the gap back out
        <View style={{ height: 17 }} />
        */}
        {/* STEP 1.10 start cta
        <StartCta
          margin={L.margin}
          height={L.cta.h}
          radius={L.cta.radius}
          onPress={() => router.push('/tamarfind')}
        />
        */}

        <View style={{ height: L.gapCta }} />
        {/* STEP 1.17 a stray gap above it | FIX 1.18 take the gap back out
        <View style={{ height: 23 }} />
        */}
        {/* STEP 1.14 start aside
        <StartAside margin={L.margin} height={L.asideH} onPress={() => router.push('/tamarfind')} />
        */}
      </View>
    </View>
  );
}
