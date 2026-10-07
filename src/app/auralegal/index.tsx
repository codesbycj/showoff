import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { AmbientGlow } from '@/features/auralegal/components/ambient-glow';
import { AuraMark } from '@/features/auralegal/components/aura-mark';
import { AutoAdvance } from '@/features/auralegal/components/auto-advance';
import { SPLASH } from '@/features/auralegal/data/brand';
import { FONT, SP, al, auralegalTheme } from '@/features/auralegal/theme';

/**
 * Screen 1 — the splash.
 *
 * The only screen here with no `code.html` behind it. The export ships the mark
 * as a 1024px plate on its own, and the feed's eyebrow line supplies the
 * tagline, so this is assembled from the design system rather than rebuilt from
 * a reference: the mark on the flat canvas, under the same two ambient glows
 * every other screen carries.
 *
 * It advances itself, so the recording never needs a faked tap to leave it.
 */
export default function AuralegalSplash() {
  return (
    <View
      style={[
        auralegalTheme,
        { flex: 1, backgroundColor: al.surface, alignItems: 'center', justifyContent: 'center' },
      ]}
    >
      <StatusBar style="light" />

      <AmbientGlow color={al.secondary} size={420} opacity={0.1} top={-120} left={-120} />
      <AmbientGlow
        color={al.primaryContainer}
        size={460}
        opacity={0.1}
        bottom={-140}
        right={-140}
      />

      <AuraMark size={104} />

      <Text
        style={{
          marginTop: SP.lg,
          fontFamily: FONT.bold,
          fontSize: 28,
          lineHeight: 34,
          letterSpacing: -0.56,
          color: al.onSurface,
        }}
      >
        {SPLASH.wordmark}
      </Text>

      <Text
        style={{
          marginTop: SP.xs,
          fontFamily: FONT.medium,
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 0.3,
          color: al.onSurfaceVariant,
        }}
      >
        {SPLASH.tagline}
      </Text>

      <AutoAdvance to="/auralegal/explore" afterMs={1600} />
    </View>
  );
}
