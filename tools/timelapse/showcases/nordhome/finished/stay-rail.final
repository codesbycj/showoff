import { ScrollView, View } from 'react-native';

import { stays } from '../data/home';
import { StayCard } from './stay-card';

type Props = {
  margin: number;
  cardW: number;
  photoH: number;
  radius: number;
  gap: number;
  height: number;
  onSelect?: (id: string) => void;
};

/**
 * The relevant rail.
 *
 * **A row that runs off the screen edge is a horizontal scroller, not a wrap**
 * (R2): the board crops its second card at the frame, which a wrap layout
 * physically cannot reproduce.
 *
 * The rail is pinned to its own height — a `ScrollView` carries `flexGrow: 1`
 * and would otherwise eat the slack around it.
 */
export function StayRail({ margin, cardW, photoH, radius, gap, height, onSelect }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap }}
      >
        {stays.map((stay) => (
          <StayCard
            key={stay.id}
            stay={stay}
            width={cardW}
            photoH={photoH}
            radius={radius}
            onPress={() => onSelect?.(stay.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
