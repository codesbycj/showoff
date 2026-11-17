import { Image, Pressable, View } from 'react-native';

import {
  addons,
  badge,
  cta,
  hero,
  item,
  options,
  plus,
  quantity,
  total,
  usd,
} from '../data/item';
import { T } from './text';

import { TitleProps } from './_item-parts-shared';

/** Name, calories and price. */
export function ItemTitle({ margin, nameH, metaH, priceH }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: nameH, justifyContent: 'center' }}>
        <T variant="name" numberOfLines={1}>
          {item.name}
        </T>
      </View>
      <View style={{ height: metaH, justifyContent: 'center' }}>
        <T variant="meta">{`${item.place} · ${item.calories} Cal`}</T>
      </View>
      <View style={{ height: priceH, justifyContent: 'center' }}>
        <T variant="price">{usd(item.price)}</T>
      </View>
    </View>
  );
}
