import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.03 the thing they came to see
// import { HeroArtwork } from '@/features/nova/components/hero-artwork';
import { Icon } from '@/features/nova/components/icon';
// STEP 1.09 a way in
// import { StartButton } from '@/features/nova/components/start-button';
import { ONBOARD } from '@/features/nova/data/onboard';
import { FONT, SP, TYPE, nv, novaTheme } from '@/features/nova/theme';

/**
 * Screen 1 — the welcome screen, and the only dark one in the set.
 *
 * Three bands under `justify-content: space-between`: the artwork, the headline
 * block that takes what is left, and the CTA. The lime badge in the top-right
 * is deliberately half off-screen — the reference hangs it at `-right-3` and
 * rotates it 12°, so it reads as a sticker stuck to the edge of the frame.
 */
export default function NovaWelcome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[novaTheme, { flex: 1, backgroundColor: nv.onboardBg }]}>
      <StatusBar style="light" />

{/* STEP 1.01 a sticker on the corner
      <View
        style={{
          position: 'absolute',
          right: -12,
          top: insets.top + 16,
          width: 56,
          height: 56,
          borderRadius: 18,
          backgroundColor: nv.lime,
          alignItems: 'center',
          justifyContent: 'center',
          transform: [{ rotate: '12deg' }],
          zIndex: 20,
        }}
      >
        <View style={{ transform: [{ rotate: '-12deg' }] }}>
          <Icon name="send" size={26} color={nv.onboardBg} strokeWidth={2.5} />
        </View>
      </View>
*/}

      <View style={{ paddingTop: insets.top + 8, alignItems: 'center' }}>
{/* STEP 1.04 a coin and a wallet
        <HeroArtwork size={300} />
*/}
      </View>

      <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: SP.xl }}>
{/* STEP 1.02 say what it does
        {ONBOARD.headline.map((line) => (
          <Text
            key={line.key}
            style={[TYPE.display, { color: line.accent ? nv.lime : '#ffffff' }]}
          >
            {line.text}
          </Text>
        ))}
*/}

{/* STEP 1.11 the small print
        <Text
          style={{
            fontFamily: FONT.regular,
            fontSize: 14,
            lineHeight: 22,
            color: nv.subtle,
            maxWidth: 270,
            marginTop: SP.md,
            // MISTAKE 1.12 the sub-caption came in almost invisible
            opacity: 0.25,
          }}
        >
          {ONBOARD.body}
        </Text>
*/}
      </View>

      <View
        style={{
          paddingHorizontal: SP.xl,
          paddingBottom: Math.max(insets.bottom, 16) + 24,
        }}
      >
{/* STEP 1.10 and a way to begin
        <StartButton label={ONBOARD.cta} onPress={() => router.push('/nova/home')} />
*/}
      </View>
    </View>
  );
}
