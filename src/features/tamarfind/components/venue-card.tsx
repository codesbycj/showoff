import { Image, Pressable, View } from 'react-native';

import { PRICE, card, usd, venue } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  height: number;
  radius: number;
  photoH: number;
  reserveH: number;
  onReserve: () => void;
};

/**
 * The result.
 *
 * **The fill is on an absolutely-filled child**, carrying the shadow with it,
 * so a reveal that stages the card's contents does not open on an empty white
 * slab with a shadow under it (§5.5 / I9).
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7). It is clipped by
 * its own wrapper, which carries no `elevation` — Android is unreliable with
 * `overflow: 'hidden'` and `elevation` on the same View.
 *
 * The price comes from one table shared with the detail screen (R9).
 */
export function VenueCard({ margin, height, radius, photoH, reserveH, onReserve }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, padding: 10 }}>
      {/* STEP 1.26 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.white,
          shadowColor: '#0B1A0F',
          shadowOpacity: 0.14,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      />
      */}

      {/* STEP 1.27 image
      <View style={{ height: photoH, borderRadius: radius - 4, overflow: 'hidden' }}>
        <Image source={venue.photo} style={{ width: '100%', height: photoH }} resizeMode="cover" />
      </View>
      */}

      {/* STEP 1.28 name
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 10 }}>
        <T variant="venue" numberOfLines={1} style={{ flex: 1 }}>
          {venue.name}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
          <Glyph name="star" size={13} color={ct.star} />
          <T variant="rating">{venue.rating.toFixed(1)}</T>
          <T variant="reviews">{`(${venue.reviews})`}</T>
        </View>
      </View>
      */}

      {/* STEP 1.29 address
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 }}>
        <Glyph name="pin" size={12} color={ct.sub} />
        <T variant="meta" numberOfLines={1}>
          {venue.address}
        </T>
      </View>
      */}

      {/* STEP 1.30 hours
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Glyph name="classes" size={12} color={ct.sub} strokeWidth={1.6} />
          <T variant="meta">{`${venue.classes} classes available`}</T>
        </View>
        {venue.hours ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Glyph name="clock" size={12} color={ct.sub} strokeWidth={1.6} />
            <T variant="meta">{venue.hours}</T>
          </View>
        ) : null}
      </View>
      */}

      {/* STEP 1.31 course label
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, flex: 1 }}>
          <T variant="price">{usd(PRICE.session)}</T>
          <T variant="priceUnit">{card.courseLabel}</T>
        </View>

        <Pressable
          onPress={onReserve}
          accessibilityRole="button"
          accessibilityLabel={`${card.reserve}, ${venue.name}`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          {({ pressed }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                height: reserveH,
                paddingHorizontal: 20,
                borderRadius: reserveH / 2,
                backgroundColor: ct.dark,
                opacity: pressed ? 0.82 : 1,
              }}
            >
              <Glyph name="classes" size={14} color={ct.darkInk} strokeWidth={1.8} />
              <T variant="reserve">{card.reserve}</T>
            </View>
          )}
        </Pressable>
      </View>
      */}
    </View>
  );
}
