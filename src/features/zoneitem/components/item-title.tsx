import { View } from 'react-native';

import { addons, badge, cta, hero, item, options, plus, quantity, total, usd } from '../data/item';
import { T } from './text';

import { TitleProps } from './_item-parts-shared';

/** Name, calories and price. */
export function ItemTitle({ margin, nameH, metaH, priceH }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin }}>
      {/* STEP 1.09 name
      <View style={{ height: nameH, justifyContent: 'center' }}>
        <T variant="name" numberOfLines={1}>
          {item.name}
        </T>
      </View>
      */}
      {/* STEP 1.10 view
      <View style={{ height: metaH, justifyContent: 'center' }}>
        <T variant="meta">{`${item.place} · ${item.calories} Cal`}</T>
      </View>
      */}
      {/* STEP 1.11 view
      <View style={{ height: priceH, justifyContent: 'center' }}>
        <T variant="price">{usd(item.price)}</T>
      </View>
      */}
    </View>
  );
}
