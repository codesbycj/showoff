import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.17 import benefit chips
// import { BenefitChips } from '@/features/pawstart/components/benefit-chips';
// STEP 1.02 import brand mark
// import { BrandMark } from '@/features/pawstart/components/brand-mark';
// STEP 1.01 import hero photo
// import { HeroPhoto } from '@/features/pawstart/components/hero-photo';
// STEP 1.05 import page dots
// import { PageDots } from '@/features/pawstart/components/page-dots';
// STEP 1.24 import signin link
// import { SigninLink } from '@/features/pawstart/components/signin-link';
// STEP 1.22 import start button
// import { StartButton } from '@/features/pawstart/components/start-button';
// STEP 1.14 import welcome body
// import { WelcomeBody } from '@/features/pawstart/components/welcome-body';
// STEP 1.10 import welcome headline
// import { WelcomeHeadline } from '@/features/pawstart/components/welcome-headline';
import { useLayout } from '@/features/pawstart/layout';
import { ct } from '@/features/pawstart/theme';

/**
 * Paws — welcome.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder and the panel under it is sized, so the
 * screen always ends on its button with no band under it (I3).
 */
export default function PawstartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 hero photo
      <HeroPhoto width={L.W} height={L.hero.h} radius={L.hero.radius} />
      */}

      {/* STEP 1.02 brand mark
      <BrandMark margin={L.margin} insetTop={L.insets.top} />
      */}

      <View style={{ height: L.gapDots }} />
      {/* STEP 1.05 page dots
      <PageDots height={L.dotsH} />
      */}

      <View style={{ height: L.gapDots }} />
      {/* STEP 1.10 welcome headline
      <WelcomeHeadline margin={L.margin} height={L.displayH} />
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.14 welcome body
      <WelcomeBody margin={L.margin} height={L.bodyH} />
      */}

      <View style={{ height: L.gapBody }} />
      {/* STEP 1.17 benefit chips
      <BenefitChips margin={L.margin} height={L.benefitH} />
      */}

      <View style={{ height: L.gapBenefits }} />
      {/* STEP 1.22 start button
      <StartButton margin={L.margin} height={L.cta.h} onPress={() => router.push('/pawshome')} />
      */}

      {/* STEP 1.24 signin link
      <SigninLink height={L.signinH} />
      */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.12 a stray rule | FIX 1.13 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
