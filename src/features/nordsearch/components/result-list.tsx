import { ScrollView, View } from 'react-native';

import { results } from '../data/search';
import { ResultCard } from './result-card';

type Props = {
  margin: number;
  cardW: number;
  photoH: number;
  radius: number;
  gap: number;
  onSelect?: (id: string) => void;
};

/**
 * The results.
 *
 * The scroller takes the remainder of the sheet and its content is taller than
 * that, so the last card is cropped by the frame rather than leaving a band
 * under the list (I3). The board crops its own list the same way.
 */
export function ResultList({ margin, cardW, photoH, radius, gap, onSelect }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: gap }}
    >
      {results.map((result) => (
        <ResultCard
          key={result.id}
          result={result}
          width={cardW}
          photoH={photoH}
          radius={radius}
          onPress={() => onSelect?.(result.id)}
        />
      ))}
    </ScrollView>
  );
}
