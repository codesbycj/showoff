import { useId } from 'react';
import { Image, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { pins } from '../data/trip';
import { ct } from '../theme';
import { T } from './text';

type Props = { width: number; height: number };

/**
 * Where everyone is.
 *
 * **The board draws a dotted world map; this is the map *idea* instead** (I4).
 * A map is a picture of a place, so tracing one is copying an arrangement path
 * by path — a dot field with friends pinned on it says the same thing without
 * depicting anywhere, and no country here is identifiable.
 *
 * Each pin's position comes from the data as a fraction of the field, so the
 * picture holds at any width (I2).
 */
export function FriendField({ width, height }: Props) {
  const key = useId();

  const cols = 13;
  const rows = 9;
  const dots: { x: number; y: number; big: boolean }[] = [];
  for (let c = 0; c < cols; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const x = ((c + 0.5) / cols) * width;
      const y = ((r + 0.5) / rows) * height;
      /** A soft lens of larger dots through the middle, as the board draws. */
      const big = Math.abs(r - rows / 2) < 2.2 && c % 2 === 0;
      dots.push({ x, y, big });
    }
  }

  return (
    <View style={{ width, height }}>
      {/* STEP 1.07 circle
      <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        {dots.map((dot, i) => (
          <Circle
            key={`${key}-${i}`}
            cx={dot.x}
            cy={dot.y}
            r={dot.big ? 3 : 2}
            fill={dot.big ? ct.dotWarm : ct.dot}
          />
        ))}
      </Svg>
      */}

      {/* STEP 1.08 note
      {pins.map((pin) => (
        <View
          key={pin.id}
          style={{
            position: 'absolute',
            left: pin.x * width - 27,
            top: pin.y * height - 27,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              borderWidth: 3,
              borderColor: ct.white,
              backgroundColor: ct.white,
              shadowColor: '#15171C',
              shadowOpacity: 0.16,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 5,
            }}
          >
            <Image
              source={pin.image}
              style={{ width: 48, height: 48, borderRadius: 24 }}
              resizeMode="cover"
              accessibilityLabel={pin.name}
            />
          </View>

          {pin.note ? (
            <View
              style={{
                marginTop: 8,
                height: 28,
                paddingHorizontal: 12,
                borderRadius: 14,
                backgroundColor: ct.ink,
                justifyContent: 'center',
              }}
            >
              <T variant="budget">{pin.note}</T>
            </View>
          ) : null}
        </View>
      ))}
      */}
    </View>
  );
}
