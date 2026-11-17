import { View } from 'react-native';

import { dishes, wasPrice, type Dish } from '../data/menu';
import { Card, Props } from './_dish-grid-shared';

/**
 * The menu.
 *
 * Two columns laid out as explicit rows rather than a wrap, so a reveal can
 * stage one card at a time without the rest reflowing underneath it.
 *
 * The was-price comes from `wasPrice`, which returns `null` when a dish has no
 * offer — so a reveal that has not yet staged the `offers` array renders
 * cleanly instead of printing `NaN` (I7).
 */
export function DishGrid({ margin, gutter, col, photoH, radius, add, onSelect }: Props) {
  const rows: Dish[][] = [];
  for (let i = 0; i < dishes.length; i += 2) rows.push(dishes.slice(i, i + 2));

  return (
    <View style={{ marginHorizontal: margin, gap: 16 }}>
      {/* STEP 1.21 card
      {rows.map((row) => (
        <View key={row[0].id} style={{ flexDirection: 'row', gap: gutter }}>
          {row.map((dish) => (
            <Card
              key={dish.id}
              dish={dish}
              col={col}
              photoH={photoH}
              radius={radius}
              add={add}
              onPress={onSelect}
            />
          ))}
        </View>
      ))}
      */}
    </View>
  );
}
