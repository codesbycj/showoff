import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ListProps, PlaceCard } from './_home-parts-shared';

/**
 * The destinations.
 *
 * **Three, not the board's two-and-a-bit.** The board crops its second card at
 * the tab bar, so the list genuinely continues (R6) — and I3's lever for that
 * space is the row the board cut, never a taller block above it.
 */
export function PlaceList({ margin, cardH, gap, radius, onSelect }: ListProps) {
  return (
    <View style={{ gap }}>
      {places.map((p) => (
        <PlaceCard
          key={p.id}
          item={p}
          margin={margin}
          height={cardH}
          radius={radius}
          onPress={onSelect}
        />
      ))}
    </View>
  );
}
