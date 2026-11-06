import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import brand mark
// import { BrandMark } from '@/features/clovestart/components/brand-mark';
// STEP 1.02 import headline
// import { Headline } from '@/features/clovestart/components/headline';
// STEP 1.03 import hero cards
// import { HeroCards } from '@/features/clovestart/components/hero-cards';
// STEP 1.04 import login line
// import { LoginLine } from '@/features/clovestart/components/login-line';
// STEP 1.05 import primary button
// import { PrimaryButton } from '@/features/clovestart/components/primary-button';
import { copy } from '@/features/clovestart/data/start';
import {
  GAP_BODY_BUTTON,
  GAP_BUTTON_FOOT,
  GAP_HERO_HEAD,
  MARGIN,
  PAD_BOTTOM,
  PAD_TOP,
} from '@/features/clovestart/layout';
import { ct } from '@/features/clovestart/theme';
import { useInsets } from '@/features/clovestart/use-insets';

/**
 * Clove — the opening screen.
 *
 * Assembly only: the mark, the card it is all about, the promise, the way in.
 *
 * The hero sits in a `flex: 1` band between the mark and the text block, so
 * the screen is full at any height without a single spacer: the slack goes
 * into the one place that can absorb it by being *centred* rather than into a
 * hole above the foot.
 *
 * "Get Started" pushes to the home screen, which is its own showcase — a
 * route push, not a staging dependency.
 */
export default function ClovestartScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ct.lime,
        paddingTop: insets.top + PAD_TOP,
        paddingBottom: insets.bottom + PAD_BOTTOM,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

      {/* STEP 1.06 brand mark
      <BrandMark />
      */}

      {/* STEP 1.07 hero cards
      <HeroCards insets={insets} />
      */}

      {/* STEP 1.08 headline
      <View style={{ marginTop: GAP_HERO_HEAD }}>
        <Headline />
      </View>
      */}

      {/* STEP 1.09 primary button
      <View style={{ marginTop: GAP_BODY_BUTTON }}>
        <PrimaryButton label={copy.cta} onPress={() => router.push('/clovehome')} />
      </View>
      */}

      {/* STEP 1.10 login line
      <View style={{ marginTop: GAP_BUTTON_FOOT }}>
        <LoginLine />
      </View>
      */}
      {/* STEP 1.11 a stray gap under it | FIX 1.12 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
