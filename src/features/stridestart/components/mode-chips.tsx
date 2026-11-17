import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { modes } from '../data/start';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { height: number; width: number; radius: number };

/**
 * What kind of session this is.
 *
 * The chosen mode is a filled tile, not a colour change alone, so it survives
 * a greyscale render — and its label is ink on lime, because white on lime is
 * 1.4:1 and fails R4 at any size.
 */
export function ModeChips({ height, width, radius }: Props) {
  const gid = useId();

  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {modes.map((mode) => (
        <Pressable
          key={mode.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!mode.on }}
          accessibilityLabel={mode.label}
          style={{ flex: 1 }}
        >
          <View style={{ height, borderRadius: radius, overflow: 'hidden' }}>
            {mode.on ? (
              <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
                <Defs>
                  <LinearGradient id={gid} x1="0" y1="1" x2="1" y2="0">
                    <Stop offset="0" stopColor={ct.lime} />
                    <Stop offset="1" stopColor={ct.violet} />
                  </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width={width} height={height} rx={radius} fill={`url(#${gid})`} />
              </Svg>
            ) : (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: radius,
                  backgroundColor: ct.cardSoft,
                }}
              />
            )}

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 7 }}>
              <Glyph
                name={mode.glyph}
                size={23}
                color={mode.on ? ct.onLime : ct.ink}
                strokeWidth={1.8}
              />
              <T variant={mode.on ? 'chipOn' : 'chipOff'}>{mode.label}</T>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
