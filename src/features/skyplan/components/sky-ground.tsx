import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { ct } from '../theme';

type Props = { width: number; height: number };

/**
 * The sky behind the header.
 *
 * **This is the page's own ground**, so it is allowed to paint in frame one
 * (§5.5): a full-bleed gradient is the surface everything else is revealed
 * onto, not an element that appears.
 *
 * It is an `<svg>` gradient rather than `expo-linear-gradient`, which flips a
 * diagonal on web (§7), and its id comes from `useId` because SVG ids are
 * document-global on web.
 */
export function SkyGround({ width, height }: Props) {
  const gid = useId();

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.skyTop} stopOpacity="1" />
            <Stop offset="0.55" stopColor={ct.skyMid} stopOpacity="1" />
            <Stop offset="1" stopColor={ct.page} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${gid})`} />
      </Svg>
    </View>
  );
}
