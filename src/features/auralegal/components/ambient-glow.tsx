import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { alpha } from '../theme';

/**
 * One of the atmospheric blurs the design system puts behind its focal cards.
 *
 * The export draws these as solid circles under `blur-[90px]`..`blur-[120px]`:
 *
 *     <div class="absolute -top-10 left-1/4 w-72 h-72 rounded-full
 *                 bg-secondary/10 blur-[90px] -z-10"></div>
 *
 * React Native has no blur filter — `expo-blur` blurs what is *behind* a view,
 * which is the opposite of this — so each is rebuilt as an SVG radial gradient
 * running from the tint at its centre to fully transparent at its edge. That is
 * what a heavily blurred disc converges to, and unlike a stack of nested
 * translucent circles it costs one node and has no banding.
 *
 * The blur radius becomes the box: a 288dp circle under a 90px blur spreads to
 * roughly 288 + 2*90, so `size` here is the *spread*, not the disc.
 */
export function AmbientGlow({
  color,
  size,
  opacity,
  top,
  left,
  right,
  bottom,
}: {
  color: string;
  /** Diameter of the spread, which is the disc plus twice the blur radius. */
  size: number;
  opacity: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}) {
  return (
    <Svg
      width={size}
      height={size}
      style={{ position: 'absolute', top, left, right, bottom }}
      pointerEvents="none"
    >
      <Defs>
        <RadialGradient id="g" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor={color} stopOpacity={opacity} />
          <Stop offset="0.55" stopColor={color} stopOpacity={opacity * 0.45} />
          <Stop offset="1" stopColor={alpha(color, 0)} stopOpacity={0} />
        </RadialGradient>
      </Defs>
      <Rect x="0" y="0" width={size} height={size} fill="url(#g)" />
    </Svg>
  );
}
