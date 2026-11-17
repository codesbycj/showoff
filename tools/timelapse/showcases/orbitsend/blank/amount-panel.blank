import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { send } from '../data/send';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * What is being sent — the dominant element on the screen (R8).
 *
 * The wash is an `<svg>` gradient rather than `expo-linear-gradient`, which
 * flips a diagonal on web (§7); the id comes from `useId` because SVG ids are
 * document-global there.
 */
export function AmountPanel({ margin, width, height, radius }: Props) {
  const gid = useId();

  return (
    <View style={{ marginHorizontal: margin, height, borderRadius: radius }}>
      {/* STEP 1.15 linear gradient
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, borderRadius: radius }}
      >
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={ct.washTop} />
            <Stop offset="0.5" stopColor="#FDF3E6" />
            <Stop offset="1" stopColor={ct.washMid} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} rx={radius} fill={`url(#${gid})`} />
      </Svg>
      */}

      {/* STEP 1.16 view
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <T variant="amount">
          $
          {send.amount.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </T>
      </View>
      */}
    </View>
  );
}
