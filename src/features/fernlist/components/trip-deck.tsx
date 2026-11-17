import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { deck } from '../data/list';
import { ct } from '../theme';
import { FlagDisc } from './flag-disc';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  width: number;
  height: number;
  front: number;
  peek: number;
  radius: number;
  inset: number;
};

/**
 * The trips, as the deck the board poses them in.
 *
 * **Each card is a photograph** (I4): a fjord is a picture *of* somewhere.
 * The two behind the front one are clipped to the strip they actually show,
 * rather than laid full-size under it — a full card under a full card is a
 * partial overlap, which is the shape `audit.js` reports as `COVERED` and the
 * shape an accident has.
 *
 * Every number comes from the props, and the depth is read off the data rather
 * than the array index, so a card keeps its place while the reveal is still
 * filling the deck (I7). `Math.max(..., 0)` is the guard that matters: the
 * array *will* be empty on the first step.
 */
export function TripDeck({ margin, width, height, front, peek, radius, inset }: Props) {
  const gid = useId();
  const deepest = Math.max(...deck.map((trip) => trip.layer), 0);

  return (
    <View style={{ marginHorizontal: margin, height }}>
      {deck.map((trip) => {
        const side = (deepest - trip.layer) * inset;
        const w = width - side * 2;
        // A back card is exactly the strip it shows. A full card laid under a
        // full card is a partial overlap, which is what `COVERED` reports.
        const h = trip.front ? front : peek;

        return (
          <View
            key={trip.id}
            style={{
              position: 'absolute',
              top: trip.layer * peek,
              left: side,
              right: side,
              height: h,
              borderTopLeftRadius: radius,
              borderTopRightRadius: radius,
              borderBottomLeftRadius: trip.front ? radius : 0,
              borderBottomRightRadius: trip.front ? radius : 0,
              overflow: 'hidden',
            }}
          >
            <Image source={trip.image} style={{ width: w, height: h }} resizeMode="cover" />

            <Svg width={w} height={h} style={{ position: 'absolute', top: 0, left: 0 }}>
              <Defs>
                <LinearGradient id={`${gid}-${trip.id}`} x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0" stopColor="#0E1A12" stopOpacity="0.42" />
                  <Stop offset="0.42" stopColor="#0E1A12" stopOpacity="0.12" />
                  <Stop offset="1" stopColor="#0E1A12" stopOpacity={trip.front ? '0.76' : '0.3'} />
                </LinearGradient>
              </Defs>
              <Rect x="0" y="0" width={w} height={h} fill={`url(#${gid}-${trip.id})`} />
            </Svg>

            <View
              style={{
                position: 'absolute',
                top: 12,
                left: 18,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
              }}
            >
              <FlagDisc name={trip.flag} size={13} />
              <T variant="cardCountry">{trip.country.toUpperCase()}</T>
            </View>

            {trip.front ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Save ${trip.country}`}
                style={{ position: 'absolute', top: 14, right: 14 }}
              >
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                    borderWidth: 1.4,
                    borderColor: 'rgba(255,255,255,0.5)',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph name="star" size={22} color={ct.white} filled />
                </View>
              </Pressable>
            ) : null}

            {trip.front ? (
              <View style={{ position: 'absolute', left: 18, right: 18, bottom: 18, gap: 12 }}>
                <T variant="cardTitle">{trip.title}</T>

                <View style={{ flexDirection: 'row', gap: 16 }}>
                  {(trip.facts ?? []).map((fact) => (
                    <View
                      key={fact.id}
                      style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
                    >
                      <Glyph name={fact.glyph} size={15} color={ct.white} strokeWidth={1.6} />
                      <T variant="fact">{fact.label}</T>
                    </View>
                  ))}
                </View>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', gap: 7, paddingTop: 2 }}
                >
                  {deck.map((dot) => (
                    <View
                      key={dot.id}
                      style={{
                        width: dot.front ? 18 : 7,
                        height: 7,
                        borderRadius: 4,
                        backgroundColor: dot.front ? ct.white : 'rgba(255,255,255,0.45)',
                      }}
                    />
                  ))}
                </View>
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}
