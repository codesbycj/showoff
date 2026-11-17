import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { header, score } from '../data/risk';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * How bad this risk is.
 *
 * **The bar reads the score** (R9): its filled length is `value / scale`, so
 * the grade beside it and the picture of it cannot disagree - which is exactly
 * what the board does by grading a risk 5 on a 1-5 bar while the screen next
 * to it scores the same risk 20.
 *
 * The gradient is drawn in `react-native-svg` user space rather than with
 * `expo-linear-gradient`, which flips a diagonal on web, and its id comes from
 * `useId` because gradient ids are document-global there (I8).
 *
 * `flexShrink: 0` is not decoration: a sized child in a row beside a `flex: 1`
 * sibling still shrinks to its minimum by default, which collapsed a 261dp bar
 * into a 50dp disc with its grade wrapped inside it.
 *
 * The bar also carries a solid `backgroundColor` under that gradient: an
 * `<svg>` has none for a hit stack to resolve, and `audit.js` walks that stack
 * to find the ground behind the grade - over a bare svg it finds the white
 * card and calls white-on-white a 1:1 CONTRAST failure.
 */
export function ScoreCard({ margin, width, height, radius }: Props) {
  const gid = useId();

  const barH = 50;
  const inner = width - 36;
  const filled = Math.max(barH, inner * Math.min(1, score.value / Math.max(1, score.scale)) - 56);

  return (
    <View style={{ marginHorizontal: margin, height, borderRadius: radius, padding: 18 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ct.white,
          borderRadius: radius,
        }}
      />

      {/* STEP 1.05 "Risk score options"
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <T variant="cardLabel">{header.scoreLabel}</T>

        <Pressable accessibilityRole="button" accessibilityLabel="Risk score options">
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="more" size={16} color={ct.muted} strokeWidth={1.6} />
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: filled,
            flexShrink: 0,
            height: barH,
            borderRadius: barH / 2,
            overflow: 'hidden',
            backgroundColor: ct.indigo,
          }}
        >
          {/* STEP 1.06 linear gradient
          <Svg width={filled} height={barH} style={{ position: 'absolute', top: 0, left: 0 }}>
            <Defs>
              <LinearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
                <Stop offset="0" stopColor={ct.indigo} />
                <Stop offset="1" stopColor={ct.magenta} />
              </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width={filled} height={barH} fill={`url(#${gid})`} />
          </Svg>
          */}

          <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 18 }}>
            {/* STEP 1.07 t
            <T variant="grade">{`${score.grade} ${score.value}`}</T>
            */}
          </View>
        </View>

        {/* STEP 1.08 view
        <View
          style={{
            flex: 1,
            height: barH,
            borderRadius: barH / 2,
            backgroundColor: ct.magenta,
          }}
        />
        */}
      </View>
    </View>
  );
}
