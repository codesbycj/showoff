import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.19 the sparkle between the words
// import { Comet } from '@/features/jobfinder/components/comet';
// STEP 1.01 the wall of faces
// import { HeroCollage } from '@/features/jobfinder/components/hero-collage';
// STEP 1.22 the way in
// import { PillButton } from '@/features/jobfinder/components/pill-button';
import { ONBOARDING } from '@/features/jobfinder/data/onboarding';
import { TYPE, jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 1 — onboarding.
 *
 * Three bands: the collage at a fixed 475dp, the headline block, and the CTA
 * pinned to the bottom. The middle band is the flexible one, exactly as the
 * design has it — the reference frame is 844dp tall and a device with a notch
 * has less to give, so the slack has to come out of somewhere, and the gap under
 * the paragraph is where the design itself puts it.
 *
 * The reference draws no status bar on this screen, but a real device has one,
 * so the collage starts at the safe-area top rather than bleeding under it. The
 * alternative puts a 70dp portrait behind the clock.
 */
export default function JobFinderOnboarding() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg, paddingTop: insets.top }]}>
      <StatusBar style="dark" />

{/* STEP 1.02 hang them in the top half
      <HeroCollage trim={insets.top} />
*/}

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 28,
          paddingBottom: Math.max(insets.bottom, 16),
        }}
      >
        <View style={{ alignItems: 'center', marginTop: 8, maxWidth: 285 }}>
{/* STEP 1.18 say what this is for
          <Text style={[TYPE.hero, { color: jf.ink, textAlign: 'center' }]}>
            {ONBOARDING.headlineTop}
          </Text>
*/}

{/* STEP 1.20 the second line, with the comet on it
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[TYPE.hero, { color: jf.ink }]}>{ONBOARDING.headlineLeft}</Text>
            <View style={{ transform: [{ rotate: '-12deg' }], marginTop: 2 }}>
              <Comet size={30} />
            </View>
            <Text style={[TYPE.hero, { color: jf.ink }]}>{ONBOARDING.headlineRight}</Text>
          </View>
*/}

{/* STEP 1.21 and the small print
          <Text style={[TYPE.lede, { color: jf.muted, textAlign: 'center', marginTop: 12 }]}>
            {ONBOARDING.body}
          </Text>
*/}
        </View>

{/* STEP 1.23 press here to start
        <PillButton
          label={ONBOARDING.cta}
          width={185}
          onPress={() => router.push('/jobfinder/home')}
        />
*/}
      </View>
    </View>
  );
}
