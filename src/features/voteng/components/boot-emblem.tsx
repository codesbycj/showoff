import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, Path, RadialGradient, Rect, Stop } from 'react-native-svg';

import { vt } from '../theme';

/**
 * The splash emblem: an isometric ballot box with a slip dropping into its slot,
 * over a breathing aura.
 *
 * Two things here are worked around rather than translated.
 *
 * The aura is a CSS `blur-2xl` on a tinted disc, and React Native has no blur
 * filter on a view — `expo-blur` blurs what is *behind* a view, which is a flat
 * gradient here, so it would show nothing. Stacking translucent discs gets the
 * falloff roughly right but leaves visible contour rings at this scale, so the
 * glow is an SVG radial gradient instead: one node, and a genuinely smooth ramp.
 *
 * The slip is animated as a sibling `Animated.View` laid over the box rather
 * than as an animated `<G>` inside the SVG. Reanimated can drive an SVG group,
 * but the static web render used for pixel checks drops it, and the slip is the
 * one element whose resting position has to be right in a still frame.
 *
 * It rests where the animation ends — dropped in, fully opaque — so the first
 * frame of a recording is the finished state and the motion reads as a replay.
 */
const BOX = 96;
/** How far the glow reaches past the box, as a multiple of its size. */
const AURA = 1.9;

export function BootEmblem({ size = BOX }: { size?: number }) {
  const t = useSharedValue(1);
  const aura = useSharedValue(0);

  useEffect(() => {
    t.value = withRepeat(
      withTiming(0, { duration: 1300, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
      -1,
      true,
    );
    aura.value = withRepeat(
      withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [t, aura]);

  // t: 1 = dropped in, 0 = lifted out and faded
  const slip = useAnimatedStyle(() => ({
    opacity: Math.min(1, t.value * 2),
    transform: [{ translateY: -38 * (1 - t.value) }, { scale: 0.85 + 0.15 * t.value }],
  }));

  const glow = useAnimatedStyle(() => ({
    opacity: 0.35 + 0.3 * aura.value,
    transform: [{ scale: 0.92 + 0.23 * aura.value }],
  }));

  const s = size / BOX;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Animated.View pointerEvents="none" style={[{ position: 'absolute' }, glow]}>
        <Svg width={size * AURA} height={size * AURA} viewBox="0 0 100 100">
          <Defs>
            <RadialGradient id="bootAura" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={vt.neon} stopOpacity={0.55} />
              <Stop offset="45%" stopColor={vt.neon} stopOpacity={0.22} />
              <Stop offset="100%" stopColor={vt.neon} stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={50} cy={50} r={50} fill="url(#bootAura)" />
        </Svg>
      </Animated.View>

      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <Path
          d="M32 6L56 19.5V45.5L32 59L8 45.5V19.5L32 6Z"
          fill="#045633"
          stroke={vt.neon}
          strokeWidth={1.5}
        />
        <Path d="M32 6L56 19.5L32 33L8 19.5L32 6Z" fill={vt.primary} />
        <Path d="M32 33L56 19.5V45.5L32 59V33Z" fill="#063E25" />
        <Path d="M8 19.5L32 33V59L8 45.5V19.5Z" fill="#09673D" />
        <Path d="M22 19L32 24.5L42 19" stroke="#032516" strokeWidth={3} strokeLinecap="round" />
      </Svg>

      <Animated.View
        pointerEvents="none"
        style={[
          { position: 'absolute', left: 25 * s, top: 7 * s, width: 14 * s, height: 15 * s },
          slip,
        ]}
      >
        <Svg width={14 * s} height={15 * s} viewBox="0 0 14 15" fill="none">
          <Rect
            x={0}
            y={0}
            width={14}
            height={15}
            rx={1.5}
            fill={vt.card}
            transform="rotate(-6 7 7.5)"
          />
          <Path
            d="M3 7.5L6 10.5L11 5"
            stroke={vt.flag}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Animated.View>
    </View>
  );
}
