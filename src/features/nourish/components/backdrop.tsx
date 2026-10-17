import { useId } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { nr } from '../theme';

/**
 * The page: warm paper, with the hero's own colours washed across the top.
 *
 * In the reference the area behind the calorie arc is not the same cream as
 * the rest of the screen — it carries a peach on the left that cools to lilac
 * on the right, and both have faded back to paper by the time the Today
 * section starts. Flatten that to one fill and the screen loses the thing
 * that makes it feel lit.
 *
 * It is **two rects, not one**, and that is forced rather than stylistic. The
 * tint runs left to right and the fade runs top to bottom, and no single
 * linear gradient does both: one diagonal ramp leaves the bottom-left corner
 * still tinted while the bottom-right has already gone to paper, which reads
 * as a hard diagonal seam across the page. So the tint is laid down first and
 * a vertical ramp to the page colour is painted over it.
 *
 * Drawn in **react-native-svg user space**, not `expo-linear-gradient`: a
 * diagonal `expo-linear-gradient` has come out mirrored on web in this repo
 * before, and a wash lit from the wrong side is exactly what the harness
 * renders happily and a device does not.
 *
 * `useId` for the gradient ids: react-native-svg inlines every `Svg` into the
 * one page DOM on web, so hardcoded ids here would be found by every other
 * showcase's `url(#...)` as well.
 */
export function Backdrop({ height }: { height: number }) {
  const { width } = useWindowDimensions();
  const base = useId();
  const tint = `${base}-tint`;
  const fade = `${base}-fade`;

  return (
    <View style={{ position: 'absolute', left: 0, top: 0, width, height }} pointerEvents="none">
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={tint} x1="0" y1="0" x2={width} y2="0" gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={nr.washWarm} />
            <Stop offset="1" stopColor={nr.washCool} />
          </LinearGradient>
          <LinearGradient id={fade} x1="0" y1="0" x2="0" y2={height} gradientUnits="userSpaceOnUse">
            <Stop offset="0" stopColor={nr.washFoot} stopOpacity="0.34" />
            <Stop offset="0.62" stopColor={nr.washFoot} stopOpacity="0.62" />
            <Stop offset="1" stopColor={nr.washFoot} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        <Rect x="0" y="0" width={width} height={height} fill={`url(#${tint})`} />
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${fade})`} />
      </Svg>
    </View>
  );
}
