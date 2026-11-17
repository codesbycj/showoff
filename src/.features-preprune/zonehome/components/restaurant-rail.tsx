import { Image, Pressable, ScrollView, View } from 'react-native';

import { restaurants, reviews, section, type Restaurant } from '../data/home';
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
