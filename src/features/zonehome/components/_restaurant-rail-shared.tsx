import { Image, Pressable, View } from 'react-native';

import { reviews, type Restaurant } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

export type HeadProps = { margin: number; height: number };

export function Card({
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

export type Props = {
  margin: number;
  width: number;
  photoH: number;
  radius: number;
  gap: number;
  onSelect: () => void;
};
