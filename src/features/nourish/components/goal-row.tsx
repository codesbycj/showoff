import { ScrollView } from 'react-native';

import { goals } from '../data/home';
import { CARD_GAP, MARGIN } from '../layout';
import { GoalCard } from './goal-card';

/**
 * The Today row: cards that run off the right-hand edge.
 *
 * A horizontal `ScrollView`, not a wrap, and the reference says so directly —
 * its third card is cut by the edge of the screen, which a wrap layout
 * physically cannot reproduce.
 *
 * The padding is on the content container rather than the view, so the first
 * card lines up with the page margin while the row itself still scrolls edge
 * to edge. Padding the view would leave a dead strip the cards disappear under.
 */
export function GoalRow({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CARD_GAP }}
    >
      {goals.map((g) => (
        <GoalCard
          key={g.key}
          title={g.title}
          meta={g.meta}
          glyph={g.glyph}
          onPress={() => onSelect?.(g.key)}
        />
      ))}
    </ScrollView>
  );
}
