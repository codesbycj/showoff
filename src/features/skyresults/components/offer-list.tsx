import { ScrollView } from 'react-native';

import { offers } from '../data/results';
import { OfferCard } from './offer-card';

type Props = {
  margin: number;
  width: number;
  height: number;
  radius: number;
  gap: number;
  onSelect?: (id: string) => void;
};

/**
 * The fares.
 *
 * The scroller takes the remainder of the screen and its content is taller
 * than that, so the last card is cropped by the frame rather than leaving a
 * band under the list (I3).
 */
export function OfferList({ margin, width, height, radius, gap, onSelect }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: gap }}
    >
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          width={width}
          height={height}
          radius={radius}
          onPress={() => onSelect?.(offer.id)}
        />
      ))}
    </ScrollView>
  );
}
