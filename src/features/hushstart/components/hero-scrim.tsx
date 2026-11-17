import { useId } from 'react';
import { Image, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { onboarding } from '../data/onboarding';
import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The portrait, and the grade the board puts over it.
 *
 * **A face is a photograph** (I4), and the scrim is what makes the copy over
 * it readable at the top and the bottom of the frame (R4). It is drawn in
 * `react-native-svg` user space rather than with `expo-linear-gradient`, which
 * flips a diagonal on web, and its id comes from `useId` because gradient ids
 * are document-global there (I8).
 *
 * The `Image` carries a numeric size: absolute insets alone make it paint
 * nothing, silently (RULES Part 7).
 */
export function HeroScrim({ width, height }: Props) {
  const gid = useId();

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width, height }} pointerEvents="none">
      <Image
        source={onboarding.image}
        style={{ width, height }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.scrim} stopOpacity="0.55" />
            <Stop offset="0.32" stopColor={ct.wash} stopOpacity="0.12" />
            <Stop offset="0.62" stopColor={ct.scrim} stopOpacity="0.68" />
            <Stop offset="1" stopColor={ct.scrim} stopOpacity="0.97" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${gid})`} />
      </Svg>
    </View>
  );
}
