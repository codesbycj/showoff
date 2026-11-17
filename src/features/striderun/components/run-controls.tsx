import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { controls } from '../data/run';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; onStop?: () => void };

/**
 * Lap, pause, map.
 *
 * The pause control is 88dp and the two beside it are 60dp, all well over
 * R7's floor. The sweep is drawn in `react-native-svg` user space rather than
 * with `expo-linear-gradient`, which flips a diagonal on web (§7), and its id
 * comes from `useId` because SVG ids are document-global there.
 */
export function RunControls({ height, onStop }: Props) {
  const gid = useId();
  const big = 88;

  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
      }}
    >
      {controls.map((control) =>
        control.glyph === 'pause' ? (
          <Pressable
            key={control.id}
            accessibilityRole="button"
            accessibilityLabel={control.label}
            onPress={onStop}
          >
            <View
              style={{
                width: big,
                height: big,
                borderRadius: big / 2,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: ct.lime,
                shadowOpacity: 0.36,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 0 },
                elevation: 10,
              }}
            >
              <Svg width={big} height={big} style={{ position: 'absolute' }}>
                <Defs>
                  <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
                    <Stop offset="0" stopColor={ct.lime} />
                    <Stop offset="1" stopColor={ct.violet} />
                  </LinearGradient>
                </Defs>
                <Circle cx={big / 2} cy={big / 2} r={big / 2} fill={`url(#${gid})`} />
              </Svg>
              <View style={{ zIndex: 1 }}>
                <Glyph name="pause" size={30} color={ct.onLime} />
              </View>
            </View>
          </Pressable>
        ) : (
          <Pressable key={control.id} accessibilityRole="button" accessibilityLabel={control.label}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: ct.cardSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {control.glyph === 'lap' ? (
                <T variant="chipOff">{control.label}</T>
              ) : (
                <Glyph name={control.glyph} size={22} color={ct.ink} strokeWidth={1.7} />
              )}
            </View>
          </Pressable>
        ),
      )}
    </View>
  );
}
