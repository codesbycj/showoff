import { Image, Pressable, View } from 'react-native';

import { usd, wasPrice, type Dish } from '../data/menu';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

export type TabProps = {
  height: number;
  margin: number;
  value: string;
  onSelect: (id: string) => void;
};

export function Card({
  dish,
  col,
  photoH,
  radius,
  add,
  onPress,
}: {
  dish: Dish;
  col: number;
  photoH: number;
  radius: number;
  add: number;
  onPress: () => void;
}) {
  const was = wasPrice(dish);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={dish.name}>
      {({ pressed }) => (
        <View style={{ width: col, opacity: pressed ? 0.88 : 1 }}>
          <View
            style={{
              width: col,
              height: photoH,
              borderRadius: radius,
              overflow: 'hidden',
              backgroundColor: ct.tile,
            }}
          >
            <Image source={dish.photo} style={{ width: col, height: photoH }} resizeMode="cover" />
          </View>

          {/* Wholly inside the photograph, so it cannot straddle its edge (R3). */}
          <View
            style={{
              position: 'absolute',
              right: 8,
              top: photoH - add - 8,
              width: add,
              height: add,
              borderRadius: add / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.brand,
            }}
          >
            <Glyph name="plus" size={14} color={ct.brandInk} strokeWidth={2.4} />
          </View>

          <View style={{ marginTop: 8 }}>
            <T variant="dish" numberOfLines={1}>
              {dish.name}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <T variant="price">{usd(dish.price)}</T>
              {was !== null ? <T variant="was">{usd(was)}</T> : null}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export type Props = {
  margin: number;
  gutter: number;
  col: number;
  photoH: number;
  radius: number;
  add: number;
  onSelect: () => void;
};
