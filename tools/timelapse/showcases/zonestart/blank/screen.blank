import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.09 import burger hero
// import { BurgerHero } from '@/features/zonestart/components/burger-hero';
// STEP 1.04 import headline
// import { Headline } from '@/features/zonestart/components/headline';
// STEP 1.01 import join banner
// import { JoinBanner } from '@/features/zonestart/components/join-banner';
// STEP 1.18 import legal note
// import { LegalNote } from '@/features/zonestart/components/legal-note';
// STEP 1.13 import start actions
// import { StartActions } from '@/features/zonestart/components/start-actions';
import { useLayout } from '@/features/zonestart/layout';
import { ct } from '@/features/zonestart/theme';

/**
 * Food Zone — welcome.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The burger takes the screen's slack (see `layout.ts`), so the foot cannot
 * open a band.
 */
export default function ZonestartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top, flex: 1 }}>
        {/* STEP 1.01 join banner
        <JoinBanner margin={L.margin} height={L.bannerH} />
        */}

        <View style={{ height: L.gapBanner }} />
        {/* STEP 1.07 a stray gap above it | FIX 1.08 take the gap back out
        <View style={{ height: 11 }} />
        */}
        {/* STEP 1.04 headline
        <Headline margin={L.margin} height={L.headlineH} />
        */}

        <View style={{ height: L.gapHeadline }} />
        {/* STEP 1.09 burger hero
        <BurgerHero width={L.W} height={L.hero.h} />
        */}

        <View style={{ height: L.gapHero }} />
        {/* STEP 1.16 a stray gap above it | FIX 1.17 take the gap back out
        <View style={{ height: 17 }} />
        */}
        {/* STEP 1.13 start actions
        <StartActions
          margin={L.margin}
          height={L.action.h}
          radius={L.action.radius}
          gap={L.gapActions}
          onPress={() => router.push('/zonehome')}
        />
        */}

        <View style={{ height: L.gapLegal }} />
        {/* STEP 1.19 a stray gap above it | FIX 1.20 take the gap back out
        <View style={{ height: 23 }} />
        */}
        {/* STEP 1.18 legal note
        <LegalNote margin={L.margin} height={L.legalH} />
        */}
      </View>
    </View>
  );
}
