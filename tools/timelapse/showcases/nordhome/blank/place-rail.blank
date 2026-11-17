import { ScrollView, View } from 'react-native';

import { places } from '../data/home';
import { PlaceTile } from './place-tile';

type Props = { margin: number; width: number; height: number; radius: number; gap: number };

/**
 * The discover rail.
 *
 * It runs under the floating dock on purpose (I3): the board crops it the same
 * way, and content passing under the dock is what keeps the foot from opening
 * a band.
 */
export function PlaceRail({ margin, width, height, radius, gap }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap }}
      >
        {places.map((place) => (
          <PlaceTile key={place.id} place={place} width={width} height={height} radius={radius} />
        ))}
      </ScrollView>
    </View>
  );
}
