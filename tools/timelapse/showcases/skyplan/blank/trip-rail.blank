import { ScrollView, View } from 'react-native';

import { trips } from '../data/plan';
import { TripCard } from './trip-card';

type Props = { margin: number; width: number; height: number; radius: number; gap: number };

/**
 * The saved trips.
 *
 * A horizontal scroller, not a wrap: the board crops its second ticket at the
 * frame, and a wrap layout physically cannot reproduce that (R2). The rail is
 * pinned to its own height, because a `ScrollView` carries `flexGrow: 1` and
 * would otherwise eat the slack around it.
 */
export function TripRail({ margin, width, height, radius, gap }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap }}
      >
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} width={width} height={height} radius={radius} />
        ))}
      </ScrollView>
    </View>
  );
}
