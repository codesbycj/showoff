import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { destinations } from '../data/pick';
import { ct } from '../theme';
import { FlagDisc } from './flag-disc';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * Where the trip could go.
 *
 * **Each card is a photograph with a drawn flag disc on it** (I4, I8): a
 * valley is a picture of somewhere, and the board's flags are emoji that
 * Windows does not ship.
 *
 * The caption sits on a scrim so it clears 4.5:1 over any frame (R4) — the
 * audit skips text over photography, so this one is built not to need
 * judging. The scrim is an `<svg>` gradient rather than
 * `expo-linear-gradient`, which flips a diagonal on web (§7).
 */
export function DestinationGrid({ margin, width, height, radius }: Props) {
  const gid = useId();

  return (
    <View
      style={{
        marginHorizontal: margin,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      {destinations.map((place) => (
        <Pressable
          key={place.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!place.on }}
          accessibilityLabel={`${place.name}, ${place.country}`}
        >
          <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
            <Image source={place.image} style={{ width, height }} resizeMode="cover" />

            <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
              <Defs>
                <LinearGradient id={`${gid}-${place.id}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0.45" stopColor="#141712" stopOpacity="0" />
                  <Stop offset="1" stopColor="#141712" stopOpacity="0.82" />
                </LinearGradient>
              </Defs>
              <Rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill={`url(#${gid}-${place.id})`}
              />
            </Svg>

            <View style={{ position: 'absolute', left: 12, right: 12, bottom: 12, gap: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <FlagDisc name={place.flag} size={14} />
                <T variant="cardCountry">{place.country.toUpperCase()}</T>
              </View>
              <T variant="cardName" numberOfLines={1}>
                {place.name}
              </T>
            </View>

            {place.on ? (
              <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: ct.lime,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph name="tick" size={15} color={ct.onLime} strokeWidth={2.4} />
                </View>
              </View>
            ) : null}
          </View>
        </Pressable>
      ))}
    </View>
  );
}
