import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';

// STEP 1.01 the road behind everything
// import { Hero } from '@/features/cargo/components/hero';
// STEP 1.08 what the app is for
// import { IntroCopy } from '@/features/cargo/components/intro-copy';
// STEP 1.04 how far through this is
// import { PageDots } from '@/features/cargo/components/page-dots';
// STEP 1.12 the way in
// import { StartButton } from '@/features/cargo/components/start-button';
import { INTRO, PAGES } from '@/features/cargo/data/onboarding';
import { MARGIN } from '@/features/cargo/layout';
import { cg } from '@/features/cargo/theme';
import { useInsets } from '@/features/cargo/use-insets';

/**
 * Cargo — onboarding.
 *
 * Assembly only: the photograph behind everything, then the dots, the copy and
 * the button stacked against the foot of the screen.
 */
export default function CargoOnboarding() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: cg.yellow }}>
      <StatusBar style="dark" />

      {/* STEP 1.02 lay the road down first
      <Hero />
      */}

      <View
        style={{
          flex: 1,
          paddingHorizontal: MARGIN,
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 18,
          justifyContent: 'flex-end',
        }}
      >
        {/* STEP 1.05 mark where we are | FIX 1.06 that is the last page, and this is the first
        <PageDots count={PAGES.count} active={PAGES.count - 1} />
        */}

        {/* STEP 1.07 the first page, properly
        <PageDots count={PAGES.count} active={PAGES.active} />
        */}

        {/* STEP 1.09 say what it is
        <View style={{ marginTop: 18 }}>
          <IntroCopy title={INTRO.title} body={INTRO.body} />
        </View>
        */}

        {/* STEP 1.13 and give them a way in
        <View style={{ marginTop: 26 }}>
          <StartButton label={INTRO.cta} onPress={() => router.push('/cargohome')} />
        </View>
        */}
      </View>
    </View>
  );
}
