import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.15 the pill that ends the screen
// import { PrimaryCta } from '@/features/mindful/components/bits';
// STEP 1.02 the two onboarding pills
// import { HelpPill, HintPill } from '@/features/mindful/components/onboarding-parts';
// STEP 1.05 the characters
// import { StickerCluster } from '@/features/mindful/components/sticker-cluster';
import { ONBOARDING } from '@/features/mindful/data/onboarding';
import { SP, TYPE, mindfulTheme, mp } from '@/features/mindful/theme';

/**
 * Screen 1 — onboarding.
 *
 * A single flowing column: headline, help pill, the sticker cluster, the
 * feedback pill, then the CTA against the bottom inset. The export wraps this
 * in a `justify-between` flex parent that has exactly one child, so the
 * justification does nothing and the content simply flows from the top — worth
 * saying, because building it as a spread three-way column looks plausible and
 * pushes the cluster 90dp low on a tall screen.
 *
 * Tapping a character swaps the feedback pill's copy and dot. That is the
 * screen's only state; both buttons go on to the dashboard.
 */
export default function MindfulOnboarding() {
  const insets = useSafeAreaInsets();
  // Annotated, because `ONBOARDING` is `as const` and an inferred state type
  // would be the literal 'Tap any character to reflect' — which no mood label
  // then assigns to.
  const [hint, setHint] = useState<{ text: string; dot: string }>({
    text: ONBOARDING.hint,
    dot: ONBOARDING.hintDot,
  });

  return (
    <View style={[mindfulTheme, { flex: 1, backgroundColor: mp.bg, paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingHorizontal: SP.marginSm }}>
        <View style={{ alignItems: 'center', marginTop: SP.sm, marginBottom: SP.xs }}>
{/* STEP 1.01 ask the question
          <Text
            style={[
              TYPE.headlineXlMobile,
              {
                color: mp.ink,
                textAlign: 'center',
                width: 280,
                // MISTAKE 1.03 the headline came in tracked right out
                letterSpacing: 3,
              },
            ]}
          >
            {ONBOARDING.title}
          </Text>
*/}
{/* STEP 1.04 offer a hand
          <View style={{ marginTop: SP.md }}>
            <HelpPill label={ONBOARDING.pill} onPress={() => router.push('/mindful/home')} />
          </View>
*/}
        </View>

{/* STEP 1.06 room for the characters
        <View style={{ marginVertical: SP.xs }}>
          <StickerCluster onSelect={(s) => setHint({ text: s.label, dot: s.dot })} />
        </View>
*/}

{/* STEP 1.14 say what was tapped
        <View style={{ marginVertical: SP.xs }}>
          <HintPill label={hint.text} dot={hint.dot} />
        </View>
*/}

{/* STEP 1.16 let them in
        <View
          style={{
            marginTop: SP.sm,
            paddingHorizontal: SP.marginSm,
            paddingBottom: Math.max(insets.bottom, SP.md),
            gap: SP.xs,
          }}
        >
          <PrimaryCta label={ONBOARDING.cta} onPress={() => router.push('/mindful/home')} />
          <Text
            style={[TYPE.labelSm, { color: mp.variant, textAlign: 'center', marginTop: SP.xs }]}
          >
            {ONBOARDING.footnote}
          </Text>
        </View>
*/}
      </View>
    </View>
  );
}
