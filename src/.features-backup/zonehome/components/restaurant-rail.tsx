import { Image, Pressable, ScrollView, View } from 'react-native';

import { restaurants, reviews, section, type Restaurant } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type HeadProps = { margin: number; height: number };

/** "Popular Restaurants" and the way to the rest. */
export function SectionHead({ margin, height }: HeadProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sectionTitle">{section.title}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        accessibilityRole="button"
        accessibilityLabel={`See all ${section.title}`}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <Glyph name="arrowUpRight" size={18} color={ct.brand} strokeWidth={2.1} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

function Card({
  item,
  width,
  photoH,
  radius,
  onPress,
}: {
  item: Restaurant;
  width: number;
  photoH: number;
  radius: number;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={item.name}>
      {({ pressed }) => (
        <View style={{ width, opacity: pressed ? 0.88 : 1 }}>
          <View
            style={{
              width,
              height: photoH,
              borderRadius: radius,
              overflow: 'hidden',
              backgroundColor: ct.tile,
            }}
          >
            <Image source={item.photo} style={{ width, height: photoH }} resizeMode="cover" />
          </View>

          {/* Both badges sit wholly inside the photograph, so neither can
              straddle its edge (R3). */}
          {item.offer ? (
            <View
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                height: 24,
                paddingHorizontal: 9,
                borderRadius: 12,
                backgroundColor: ct.brand,
              }}
            >
              <Glyph name="tag" size={12} color={ct.brandInk} strokeWidth={1.6} />
              <T variant="offer">{item.offer}</T>
            </View>
          ) : null}

          <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 28,
              height: 28,
              borderRadius: 14,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
            }}
          >
            <Glyph
              name={item.liked ? 'heartFill' : 'heart'}
              size={15}
              color={item.liked ? ct.brand : ct.ink}
              strokeWidth={1.7}
            />
          </View>

          <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <T variant="cardName" numberOfLines={1} style={{ flex: 1 }}>
              {item.name}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
              <Glyph name="star" size={12} color={ct.star} />
              <T variant="rating">{item.rating.toFixed(1)}</T>
              <T variant="cardMeta">{`(${reviews(item.reviews)})`}</T>
            </View>
          </View>

          <T variant="cardMeta">{`${item.price} · ${item.kind}`}</T>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  width: number;
  photoH: number;
  radius: number;
  gap: number;
  onSelect: () => void;
};

/**
 * The restaurants.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its second card
 * cut by the screen edge, and a wrap layout physically cannot reproduce that
 * (R2). The rail sizes itself from its cards rather than absorbing the
 * screen's slack.
 */
export function RestaurantRail({ margin, width, photoH, radius, gap, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap }}
    >
      {restaurants.map((r) => (
        <Card
          key={r.id}
          item={r}
          width={width}
          photoH={photoH}
          radius={radius}
          onPress={onSelect}
        />
      ))}
    </ScrollView>
  );
}
