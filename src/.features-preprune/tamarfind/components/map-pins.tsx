import { Pressable, View } from 'react-native';

import { pins } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { width: number; height: number };

/**
 * The venue pins over the map.
 *
 * Each pin's position is a fraction of the map's own box, so it holds at any
 * width (I2). Each is centred on its point by subtracting half its own
 * measured width through `transform`, rather than by guessing an offset.
 *
 * **The venues are invented** — the board names real clubs at a real street
 * address, and a rebuild that ships those is impersonation.
 *
 * Each label is a `Pressable` whose visual box is an inner `View`: a
 * `Pressable` function style is dropped in a static render and the pill would
 * lose its fill (Part 7).
 */
export function MapPins({ width, height }: Props) {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, width, height }}>
      {pins.map((p) => (
        <Pressable
          key={p.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!p.active }}
          accessibilityLabel={p.label}
          style={{
            position: 'absolute',
            left: width * p.x,
            top: height * p.y,
            transform: [{ translateX: -50 }],
          }}
        >
          {({ pressed }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                height: 28,
                paddingLeft: 8,
                paddingRight: 11,
                borderRadius: 14,
                backgroundColor: p.active ? ct.dark : ct.white,
                opacity: pressed ? 0.8 : 1,
                shadowColor: '#0B1A0F',
                shadowOpacity: 0.16,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
                elevation: 4,
              }}
            >
              <Glyph name="pin" size={14} color={p.active ? ct.accent : ct.ink} />
              <T variant={p.active ? 'pinOn' : 'pin'}>{p.label}</T>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
