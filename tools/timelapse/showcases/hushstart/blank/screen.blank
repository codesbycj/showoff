import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.20 import continue button
// import { ContinueButton } from '@/features/hushstart/components/continue-button';
import { HeroScrim } from '@/features/hushstart/components/hero-scrim';
// STEP 1.15 import mood chips
// import { MoodChips } from '@/features/hushstart/components/mood-chips';
// STEP 1.12 import onboard body
// import { OnboardBody } from '@/features/hushstart/components/onboard-body';
// STEP 1.10 import onboard title
// import { OnboardTitle } from '@/features/hushstart/components/onboard-title';
// STEP 1.05 import page dots
// import { PageDots } from '@/features/hushstart/components/page-dots';
// STEP 1.02 import skip link
// import { SkipLink } from '@/features/hushstart/components/skip-link';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/hushstart/components/wordmark';
import { useLayout } from '@/features/hushstart/layout';
import { ct } from '@/features/hushstart/theme';

/**
 * Hush - the welcome.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The wordmark and the skip control are mounted side by side from here rather
 * than wrapped in one header: `stage.js` stages what the screen mounts, so two
 * marks in one wrapper reveal as one step (I5).
 *
 * The photograph is full bleed and the copy sits in the bottom of it, so the
 * screen ends on the pill with no band under it (I3).
 */
export default function HushstartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />
      <HeroScrim width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.topH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 wordmark
        <Wordmark height={L.topH} />
        */}
        {/* STEP 1.02 skip link
        <SkipLink onPress={() => router.push('/hushmix')} />
        */}
      </View>

      <View style={{ flex: 1 }} />

      {/* STEP 1.05 page dots
      <PageDots height={L.dotsH} margin={L.margin} />
      */}

      <View style={{ height: L.gapDots }} />
      {/* STEP 1.10 onboard title
      <OnboardTitle margin={L.margin} height={L.displayH} />
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.12 onboard body
      <OnboardBody margin={L.margin} height={L.bodyH} />
      */}

      <View style={{ height: L.gapBody }} />
      {/* STEP 1.15 mood chips
      <MoodChips margin={L.margin} height={L.moodH} />
      */}

      <View style={{ height: L.gapMoods }} />
      {/* STEP 1.20 continue button
      <ContinueButton
        margin={L.margin}
        height={L.cta.h}
        radius={L.cta.radius}
        onPress={() => router.push('/hushmix')}
      />
      */}

        {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
        <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.18 a stray rule | FIX 1.19 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
