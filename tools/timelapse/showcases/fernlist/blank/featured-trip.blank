import { Image, Pressable, View } from 'react-native';

import { featured } from '../data/list';
import { ct } from '../theme';
import { FlagDisc } from './flag-disc';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  radius: number;
  tile: { w: number; h: number; radius: number };
  onPress: () => void;
};

/**
 * The trip the list is leading on.
 *
 * The forest fill lives on an absolutely-filled child so an emptied card
 * paints nothing during a reveal (§5.5) — left on the container it would open
 * the take on a green slab with a shadow under it. The shadow travels with the
 * fill for the same reason, and `shadow*` and `elevation` ride together in one
 * style object rather than a `Platform.select` the web render could never
 * check (I8).
 *
 * **The faces are photographs** (I4): initials on a disc is a fallback state,
 * not a substitute for the party the board shows.
 */
export function FeaturedTrip({ margin, height, radius, tile, onPress }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {/* STEP 1.06 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.forest,
          shadowColor: '#0D1A10',
          shadowOpacity: 0.18,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 10 },
          elevation: 7,
        }}
      />
      */}

      {/* STEP 1.07 glyph
      <View
        style={{
          position: 'absolute',
          right: 64,
          bottom: -10,
          opacity: 0.07,
        }}
        pointerEvents="none"
      >
        <Glyph name="tree" size={132} color={ct.white} />
      </View>
      */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 13,
          gap: 12,
        }}
      >
        {/* STEP 1.08 glyph
        <View
          style={{
            width: tile.w,
            height: tile.h,
            borderRadius: tile.radius,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="tree" size={42} color={ct.ink} />
        </View>
        */}

        <View style={{ flex: 1, gap: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            {/* STEP 1.09 flag disc
            <FlagDisc name={featured.flag} size={13} />
            */}
            {/* STEP 1.10 t
            <T variant="featCountry">{featured.country.toUpperCase()}</T>
            */}
          </View>

          {/* STEP 1.11 title
          <T variant="featTitle" numberOfLines={1}>
            {featured.title}
          </T>
          */}

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
            {/* STEP 1.12 glyph
            <Glyph name="days" size={15} color={ct.white} strokeWidth={1.6} />
            */}
            {/* STEP 1.13 dates
            <T variant="featDate">{featured.dates}</T>
            */}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* STEP 1.14 image
            {featured.avatars.map((avatar, i) => (
              <Image
                key={i}
                source={avatar}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  borderWidth: 2,
                  borderColor: ct.forest,
                  marginLeft: i === 0 ? 0 : -10,
                }}
                resizeMode="cover"
              />
            ))}
            */}

            {/* STEP 1.15 more
            <View
              style={{
                height: 30,
                paddingHorizontal: 9,
                borderRadius: 15,
                backgroundColor: ct.lime,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: -10,
              }}
            >
              <T variant="badge">{featured.more}</T>
            </View>
            */}
          </View>
        </View>

        {/* STEP 1.16 glyph
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${featured.title}`}
          onPress={onPress}
          style={{ alignSelf: 'flex-end', marginBottom: 12 }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'rgba(255,255,255,0.14)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="arrow" size={22} color={ct.white} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}
      </View>

      {/* STEP 1.17 glyph
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Save ${featured.title}`}
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        style={{ position: 'absolute', top: 14, right: 18 }}
      >
        <Glyph name="bookmark" size={21} color={ct.white} strokeWidth={1.8} />
      </Pressable>
      */}
    </View>
  );
}
