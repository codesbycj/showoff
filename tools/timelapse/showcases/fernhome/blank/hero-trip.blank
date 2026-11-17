import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { facts, trip } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  width: number;
  height: number;
  radiusTop: number;
  radiusBottom: number;
  onPress: () => void;
};

/**
 * The trip the screen is about — the dominant element (R8).
 *
 * **A forest is a photograph** (I4): it is a picture *of* somewhere, so it is
 * free-licensed stock bundled locally rather than a drawn tree.
 *
 * The caption sits on a scrim so every string clears 4.5:1 over any frame of
 * it (R4) — the audit skips text over photography, so this one is built not to
 * need judging. The scrim is an `<svg>` gradient rather than
 * `expo-linear-gradient`, which flips a diagonal on web (§7), and its id comes
 * from `useId` because ids are document-global there.
 */
export function HeroTrip({ width, height, radiusTop, radiusBottom, onPress }: Props) {
  const gid = useId();

  return (
    <View
      style={{
        width,
        height,
        borderTopLeftRadius: radiusTop,
        borderTopRightRadius: radiusTop,
        borderBottomLeftRadius: radiusBottom,
        borderBottomRightRadius: radiusBottom,
        overflow: 'hidden',
      }}
    >
      {/* STEP 1.14 image
      <Image source={trip.image} style={{ width, height }} resizeMode="cover" />
      */}

      {/* STEP 1.15 linear gradient
      <Svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0.3" stopColor="#101A12" stopOpacity="0" />
            <Stop offset="1" stopColor="#101A12" stopOpacity="0.82" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width={width} height={height} fill={`url(#${gid})`} />
      </Svg>
      */}

      {/* STEP 1.16 title
      <View
        style={{
          position: 'absolute',
          left: 24,
          right: 24,
          bottom: 26,
          alignItems: 'center',
          gap: 10,
        }}
      >
        <T variant="tripTitle">{trip.title}</T>

        <T variant="tripBody" style={{ textAlign: 'center' }}>
          {trip.body}
        </T>

        <View style={{ flexDirection: 'row', gap: 16, paddingTop: 2 }}>
          {facts.map((fact) => (
            <View key={fact.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Glyph name={fact.glyph} size={15} color={ct.white} strokeWidth={1.6} />
              <T variant="fact">{fact.label}</T>
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${trip.cta}, ${trip.title}`}
          onPress={onPress}
          style={{ marginTop: 6 }}
        >
          <View
            style={{
              height: 48,
              paddingHorizontal: 30,
              borderRadius: 24,
              borderWidth: 1.4,
              borderColor: 'rgba(255,255,255,0.72)',
              backgroundColor: 'rgba(16,26,18,0.28)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="cta">{trip.cta}</T>
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}
