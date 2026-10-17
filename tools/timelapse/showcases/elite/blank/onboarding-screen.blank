import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// STEP 1.01 the photograph at the top
// import { Hero } from '@/features/elite/components/hero';
// STEP 1.10 what the app is
// import { IntroCopy } from '@/features/elite/components/intro-copy';
// STEP 1.14 how far through this is
// import { PageDots } from '@/features/elite/components/page-dots';
// STEP 1.18 the way in
// import { PrimaryButton } from '@/features/elite/components/primary-button';
// STEP 1.04 three services under it
// import { ServiceCluster } from '@/features/elite/components/service-cluster';
import { INTRO, PAGES } from '@/features/elite/data/onboarding';
import { CLUSTER_RISE, MARGIN } from '@/features/elite/layout';
import { el } from '@/features/elite/theme';
import { useInsets } from '@/features/elite/use-insets';

/**
 * EliteBeauty — onboarding.
 *
 * Assembly only: the hero, the cluster that straddles its lower edge, the
 * copy, the dots, and the button.
 */
export default function EliteOnboarding() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: el.canvas }}>
      <StatusBar style="light" />

      {/* STEP 1.02 lay it across the top
      <Hero />
      */}

      {/* STEP 1.05 hang the cluster off its bottom edge
      <View style={{ marginTop: -CLUSTER_RISE, alignItems: 'center' }}>
        <ServiceCluster />
      </View>
      */}

      <View
        style={{
          flex: 1,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom + 16,
          justifyContent: 'flex-end',
          gap: 26,
        }}
      >
        {/* STEP 1.11 say what this is
        <IntroCopy title={INTRO.title} body={INTRO.body} />
        */}

        {/* STEP 1.15 mark where we are | FIX 1.16 that is page two, and this is page one
        <PageDots count={PAGES.count} active={1} />
        */}

        {/* STEP 1.17 the first page, properly
        <PageDots count={PAGES.count} active={PAGES.active} />
        */}

        {/* STEP 1.19 and the way in
        <PrimaryButton label={INTRO.cta} />
        */}
      </View>
    </View>
  );
}
