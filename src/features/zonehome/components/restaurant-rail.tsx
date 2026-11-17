import { ScrollView } from 'react-native';

import { restaurants } from '../data/home';
import { Card, Props } from './_restaurant-rail-shared';

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
      {/* STEP 1.15 card
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
      */}
    </ScrollView>
  );
}
