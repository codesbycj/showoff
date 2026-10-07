import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { alpha } from '../theme';

/**
 * A soft radial wash, standing in for the design's blurred discs.
 *
 * The export puts `blur-2xl`/`blur-3xl` on solid circles to make the stadium
 * spotlight behind the hero card and the atmospheric fields behind the panels.
 * React Native has no blur filter — `expo-blur` blurs what is *behind* a view,
 * which is the opposite — so each becomes an SVG radial gradient running from
 * the tint at the centre to fully transparent at the edge, which is what a
 * heavily blurred disc converges to and costs one node with no banding.
 */
export function Glow({
  color,
  size,
  opacity,
  top,
  left,
  right,
  bottom,
}: {
  color: string;
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
