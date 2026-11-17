import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { insight, swap } from '../data/swap';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { width: number; height: number; radius: number };

/**
 * The rate, and the assistant's note about it.
 *
 * **R9: the rate line is the same price the fields swap at**, so the card
 * cannot quote a rate the amounts contradict — which is exactly what the board
 * does.
 *
 * The sweep is drawn in `react-native-svg` user space rather than with
 * `expo-linear-gradient`, which mirrors a diagonal on web (§7), and its id
 * comes from `useId` because SVG ids are document-global there.
 */
export function RateInsight({ width, height, radius }: Props) {
  const gid = useId();

  return (
    <View style={{ height, borderRadius: radius }}>
      {/* STEP 1.15 linear gradient
      <Svg
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0, left: 0, borderRadius: radius }}
      >
        <Defs>
          <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor={ct.g3} />
            <Stop offset="0.5" stopColor={ct.g2} />
            <Stop offset="1" stopColor={ct.g1} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} rx={radius} fill={`url(#${gid})`} />
      </Svg>
      */}

      {/* STEP 1.16 "Ask the assistant"
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          gap: 12,
        }}
      >
        <View style={{ flex: 1, gap: 6 }}>
          <T variant="rate">
            1 {swap.fromSymbol} ≈ {swap.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}{' '}
            {swap.toSymbol}
          </T>
          <T variant="insight">{insight.body}</T>
        </View>

        <Pressable accessibilityRole="button" accessibilityLabel="Ask the assistant">
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: ct.page,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="spark" size={21} color={ct.white} strokeWidth={1.6} />
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}
