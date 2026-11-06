import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

// STEP 1.01 import card fan
// import { CardFan } from '@/features/bytestart/components/card-fan';
// STEP 1.02 import text
// import { T } from '@/features/bytestart/components/text';
import { copy } from '@/features/bytestart/data/start';
import {
  CTA_H,
  GAP_BODY_CTA,
  GAP_CTA_FOOT,
  GAP_FAN_HEAD,
  GAP_HEAD_BODY,
  MARGIN,
  PAD_TOP,
  useStartLayout,
} from '@/features/bytestart/layout';
import { ct, radius, type } from '@/features/bytestart/theme';
import { useInsets } from '@/features/bytestart/use-insets';

/** The three chevrons on the register control, drawn as one path. */
function Chevrons() {
  return (
    <Svg width={34} height={16} viewBox="0 0 34 16">
      <Path
        d="M2 2l5 6-5 6M13 2l5 6-5 6M24 2l5 6-5 6"
        stroke={ct.ink}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * Byte — the opening screen.
 *
 * Assembly only: the cards, the promise, the way in.
 *
 * The ground is a drawn gradient in SVG user space rather than
 * `expo-linear-gradient`, which mirrors a diagonal on the web render. The
 * fan is sized from what is left after the text block, so there is no band
 * of empty ground anywhere on the screen at any phone height.
 */
export default function BytestartScreen() {
  const insets = useInsets();
  const { width, fanH } = useStartLayout(insets);
  const bg = `byteBg-${useId()}`;

  return (
    <View style={{ flex: 1, backgroundColor: ct.deep }}>
      <StatusBar style="light" />

      {/* STEP 1.03 linear gradient
      <Svg width="100%" height="100%" style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={bg} x1="0.1" y1="0" x2="0.9" y2="1">
            <Stop offset="0" stopColor="#0A3B3E" />
            <Stop offset="0.55" stopColor={ct.deep} />
            <Stop offset="1" stopColor={ct.deeper} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${bg})`} />
      </Svg>
      */}

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + PAD_TOP,
          paddingBottom: insets.bottom + 10,
          paddingHorizontal: MARGIN,
          zIndex: 1,
        }}
      >
        {/* STEP 1.04 card fan
        <CardFan width={width} height={fanH} />
        */}

        {/* STEP 1.05 headline
        <T
          variant="display"
          color={ct.onDeep}
          style={{ marginTop: GAP_FAN_HEAD, textAlign: 'center' }}
        >
          {copy.headline}
        </T>
        */}

        {/* STEP 1.06 body
        <T variant="body" color={ct.dim} style={{ marginTop: GAP_HEAD_BODY, textAlign: 'center' }}>
          {copy.body}
        </T>
        */}

        {/* STEP 1.07 cta
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.cta}
          onPress={() => router.push('/bytehome')}
          style={{ marginTop: GAP_BODY_CTA }}
        >
          {({ pressed }) => (
            <View
              style={{
                height: CTA_H,
                borderRadius: radius.cta,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 6,
                paddingRight: 24,
                opacity: pressed ? 0.9 : 1,
              }}
            >
              <View
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: radius.disc,
                  backgroundColor: ct.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Chevrons />
              </View>
              <T
                variant="cta"
                color={ct.onDeep}
                style={{ flex: 1, textAlign: 'center', height: type.cta.line }}
              >
                {copy.cta}
              </T>
            </View>
          )}
        </Pressable>
        */}

        {/* STEP 1.08 have account
        <View
          style={{
            marginTop: GAP_CTA_FOOT,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <T variant="foot" color={ct.dim} style={{ height: type.foot.line }}>
            {copy.haveAccount}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.signIn}
            style={{ paddingVertical: 13, paddingHorizontal: 6 }}
          >
            <T variant="footStrong" color={ct.onDeep} style={{ height: type.footStrong.line }}>
              {copy.signIn}
            </T>
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
