import { View } from 'react-native';

import { CARD_HEIGHT, CARD_LIP } from '../layout';
import { nb, radius, shadow } from '../theme';
import { BankCard } from './bank-card';

/**
 * Three cards, one in front of the other, with 11.8dp of each back card
 * showing above the one in front of it.
 *
 * The two behind are lips, not cards: they are the same width as the front one
 * and carry nothing, because nothing of them is visible except that strip. The
 * reference shows the strips narrowing slightly towards the top, which is the
 * corner radius closing in rather than a narrower card — at 26dp of radius,
 * 11.8dp down from a card's own top edge the outline has still only opened to
 * within 4dp of full width, which is exactly what the reference measures.
 *
 * The stack is as tall as the front card plus both lips, so whatever follows
 * it on the page starts below the whole thing.
 */
export function CardStack({
  hidden,
  onToggleHidden,
}: {
  hidden?: boolean;
  onToggleHidden?: () => void;
}) {
  return (
    <View style={{ height: CARD_HEIGHT + CARD_LIP * 2 }}>
      {/* STEP 1.09 the card at the back of the deck
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: CARD_HEIGHT,
          borderRadius: radius.card,
          // MISTAKE 1.11 the deck came out fanned sideways
          marginLeft: 18,
          backgroundColor: nb.cardBack,
        }}
      />
      */}
      {/* STEP 1.10 the one in front of it
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: CARD_LIP,
          height: CARD_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: nb.cardMid,
        }}
      />
      */}
      {/* STEP 1.12 and the card itself
      <View style={{ position: 'absolute', left: 0, right: 0, top: CARD_LIP * 2, ...shadow.card }}>
        <BankCard hidden={hidden} onToggleHidden={onToggleHidden} />
      </View>
      */}
    </View>
  );
}
