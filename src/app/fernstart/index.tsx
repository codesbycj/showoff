import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

// STEP 1.01 import hero card
// import { HeroCard } from '@/features/fernstart/components/hero-card';
// STEP 1.02 import text
// import { T } from '@/features/fernstart/components/text';
import { copy, page, pages } from '@/features/fernstart/data/start';
import {
  CTA_H,
  DOTS_H,
  GAP_BODY_DOTS,
  GAP_CARD_HEAD,
  GAP_DOTS_CTA,
  GAP_HEAD_BODY,
  MARGIN,
  PAD_TOP,
  useFernStartLayout,
} from '@/features/fernstart/layout';
import { ct, radius, type } from '@/features/fernstart/theme';
import { useInsets } from '@/features/fernstart/use-insets';

/**
 * Fern — the opening screen.
 *
 * Assembly only: the card, the promise, where you are in the sequence, and
 * the two ways on.
 *
 * The glow behind the card is a radial gradient drawn in SVG user space, so
 * it lands in the same corner on every platform. The card takes the space
 * above the text block, which is what keeps the top of the screen full.
 */
export default function FernstartScreen() {
  const insets = useInsets();
  const { width, heroH } = useFernStartLayout(insets);
  const glow = `fernGlow-${useId()}`;

  return (
    <View style={{ flex: 1, backgroundColor: ct.groundDeep }}>
      <StatusBar style="light" />

      {/* STEP 1.03 radial gradient
      <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <RadialGradient id={glow} cx="0.5" cy="0.28" r="0.75">
            <Stop offset="0" stopColor="#2E5A33" />
            <Stop offset="0.6" stopColor={ct.ground} />
            <Stop offset="1" stopColor={ct.groundDeep} />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${glow})`} />
      </Svg>
      */}

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + PAD_TOP,
          paddingBottom: insets.bottom + 14,
          paddingHorizontal: MARGIN,
          zIndex: 1,
        }}
      >
        {/* STEP 1.04 hero card
        <HeroCard width={width} height={heroH} />
        */}

        {/* STEP 1.05 headline
        <T variant="display" color={ct.onGround} style={{ marginTop: GAP_CARD_HEAD }}>
          {copy.headline}
        </T>
        */}

        {/* STEP 1.06 body
        <T variant="body" color={ct.dim} style={{ marginTop: GAP_HEAD_BODY }}>
          {copy.body}
        </T>
        */}

        {/* STEP 1.07 view
        <View
          style={{
            height: DOTS_H,
            marginTop: GAP_BODY_DOTS,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: pages }).map((_, i) => (
            <View
              key={i}
              style={{
                width: i === page ? 20 : 7,
                height: 7,
                borderRadius: 4,
                marginRight: 6,
                backgroundColor: i === page ? ct.leaf : 'rgba(255,255,255,0.28)',
              }}
            />
          ))}
        </View>
        */}

        {/* STEP 1.08 skip
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: GAP_DOTS_CTA }}>
          <Pressable accessibilityRole="button" accessibilityLabel={copy.skip}>
            <View
              style={{
                height: CTA_H,
                paddingHorizontal: 30,
                borderRadius: radius.cta,
                backgroundColor: ct.sheet,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="skip" color={ct.ink} style={{ height: type.skip.line }}>
                {copy.skip}
              </T>
            </View>
          </Pressable>

          <View style={{ width: 12 }} />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.cta}
            onPress={() => router.push('/fernhome')}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View
                style={{
                  height: CTA_H,
                  borderRadius: radius.cta,
                  backgroundColor: ct.leaf,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.9 : 1,
                }}
              >
                <T variant="cta" color={ct.onLeaf} style={{ height: type.cta.line }}>
                  {copy.cta}
                </T>
                <View style={{ marginLeft: 10 }}>
                  <Svg width={20} height={20} viewBox="0 0 24 24">
                    <Path
                      d="M4.6 12h14M13 6.4 18.6 12 13 17.6"
                      stroke={ct.onLeaf}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </Svg>
                </View>
              </View>
            )}
          </Pressable>
        </View>
        */}
        {/* STEP 1.09 a stray gap under it | FIX 1.10 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
