import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.12 let it move on by itself
// import { AutoAdvance } from '@/features/voteng/components/auto-advance';
// STEP 1.07 import the capsule
// import { BootBadge } from '@/features/voteng/components/boot-badge';
// STEP 1.01 import the emblem
// import { BootEmblem } from '@/features/voteng/components/boot-emblem';
// STEP 1.10 import the loader
// import { BootLoader } from '@/features/voteng/components/boot-loader';
// STEP 1.03 import the name
// import { Wordmark } from '@/features/voteng/components/wordmark';
import { BOOT, BRAND } from '@/features/voteng/data/election';
import { EM, FONT, SP, alpha, vt, votengTheme } from '@/features/voteng/theme';

/**
 * Screen 1 — the boot splash.
 *
 * It advances itself: the loader runs, then it replaces the route with home, so
 * a recording never has to fake the first navigation and the back gesture never
 * lands back on a splash.
 */
export default function VotengBoot() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[votengTheme, { flex: 1, backgroundColor: vt.night }]}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[vt.night, vt.nightMid, vt.nightDeep]}
        locations={[0, 0.5, 1]}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 28,
          paddingTop: insets.top + SP.xl,
          paddingBottom: Math.max(insets.bottom, SP.xl) + SP.xl,
        }}
      >
{/* STEP 1.08 certify the feed
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            opacity: 0.85,
          }}
        >
          <BootBadge label={BOOT.certified} />
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 11,
              letterSpacing: 0.55,
              color: alpha(EM[300], 0.8),
            }}
          >
            {BOOT.version}
          </Text>
        </View>
*/}

        <View style={{ alignItems: 'center' }}>
{/* STEP 1.02 stand the ballot box up
          <BootEmblem />
*/}

{/* STEP 1.04 say its name
          <View style={{ marginTop: SP.xl, alignItems: 'center' }}>
            <Wordmark size={36} ink={vt.card} accent={vt.neon} />
          </View>
*/}

{/* STEP 1.05 the promise
          <Text
            style={{
              marginTop: 6,
              fontFamily: FONT.semibold,
              fontSize: 13,
              lineHeight: 18,
              letterSpacing: 13 * 0.1,
              textTransform: 'uppercase',
              color: alpha(EM[200], 0.9),
            }}
          >
            {BRAND.tagline}
          </Text>
*/}

{/* STEP 1.06 what it actually is
          <Text
            style={{
              marginTop: 8,
              maxWidth: 260,
              textAlign: 'center',
              fontFamily: FONT.regular,
              fontSize: 11,
              lineHeight: 18,
              color: alpha(EM[300], 0.6),
            }}
          >
            {BOOT.blurb}
          </Text>
*/}

{/* STEP 1.11 count the channels in
          <View style={{ marginTop: 36 }}>
            <BootLoader status={BOOT.status} />
          </View>
*/}
        </View>

        {/*
          The seal runs the full width of the phone rather than the splash's
          28dp gutter. At the export's 420px it clears the gutter; at 393dp it
          does not, and letting it wrap to two lines puts a lopsided block under
          a centred column. Reaching past the padding keeps it the one-line
          capsule the design draws.
        */}
{/* STEP 1.09 seal it
        <View style={{ marginHorizontal: -20, alignItems: 'center' }}>
          <BootBadge label={BOOT.seal} tone="seal" />
        </View>
*/}

{/* STEP 1.13 hand over to home
        <AutoAdvance to="/voteng/home" afterMs={BOOT.holdMs} />
*/}
      </LinearGradient>
    </View>
  );
}
