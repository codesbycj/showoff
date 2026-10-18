import { useId } from 'react';
import { useWindowDimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { fn } from '../theme';

/**
 * The page: warm paper, lit from the top left.
 *
 * In the reference the corner behind the collage is a soft peach that cools
 * across to grey, and flattening it to one fill is what makes a build of a
 * shot like this look dead.
 *
 * Drawn in react-native-svg user space, not expo-linear-gradient: a diagonal
 * expo-linear-gradient has come out mirrored on web in this repo before, and a
 * page lit from the wrong corner is exactly what the harness renders happily
 * and a device does not.
 *
 * The gradient id comes from useId. react-native-svg inlines every Svg into
 * the one page DOM on web, so a hardcoded id would be found by every other
 * showcase asking for the same one.
 */
export function Backdrop({ height }: { height: number }) {
  const { width } = useWindowDimensions();
  const id = useId();

  return (
    <View style={{ position: 'absolute', left: 0, top: 0, width, height }} pointerEvents="none">
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient
            id={id}
            x1="0"
            y1="0"
            x2={width}
            y2={height}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor={fn.washWarm} />
            <Stop offset="0.45" stopColor={fn.washCool} />
            <Stop offset="1" stopColor={fn.canvas} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${id})`} />
      </Svg>
    </View>
  );
}
