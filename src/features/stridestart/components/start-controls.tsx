import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { cta } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; onStart?: () => void };

/**
 * Music, start, screen brightness.
 *
 * The start control is 96dp of real box; the two beside it are 52dp, both over
 * R7's floor. Its sweep is drawn in `react-native-svg` user space rather than
 * with `expo-linear-gradient`, which flips a diagonal on web (§7).
 */
export function StartControls({ height, onStart }: Props) {
  const gid = useId();
  const size = 96;

  const round = {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: ct.cardSoft,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
      }}
    >
      {/* STEP 1.25 "Music"
      <Pressable accessibilityRole="button" accessibilityLabel="Music">
        <View style={round}>
          <Glyph name="music" size={20} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}

      {/* STEP 1.26 label
      <Pressable accessibilityRole="button" accessibilityLabel={cta.label} onPress={onStart}>
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: ct.lime,
            shadowOpacity: 0.4,
            shadowRadius: 22,
            shadowOffset: { width: 0, height: 0 },
            elevation: 12,
          }}
        >
          <Svg width={size} height={size} style={{ position: 'absolute' }}>
            <Defs>
              <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
                <Stop offset="0" stopColor={ct.lime} />
                <Stop offset="1" stopColor={ct.violet} />
              </LinearGradient>
            </Defs>
            <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={`url(#${gid})`} />
          </Svg>
          <T variant="cta" style={{ fontSize: 16 }}>
            {cta.label}
          </T>
        </View>
      </Pressable>
      */}

      {/* STEP 1.27 "Screen brightness"
      <Pressable accessibilityRole="button" accessibilityLabel="Screen brightness">
        <View style={round}>
          <Glyph name="sun" size={20} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
