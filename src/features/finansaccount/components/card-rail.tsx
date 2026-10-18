import { ScrollView, useWindowDimensions, View } from 'react-native';

import { cards } from '../data/account';
import { CARD_GAP, CARD_WIDTH, MARGIN } from '../layout';
import { AccountCard } from './account-card';

/**
 * The accounts, in a row that scrolls.
 *
 * A card takes 76% of the page, which is the whole trick: the next one is
 * visible at the right-hand edge, so the row says "there is more" without a
 * control saying it. A full-width card would need a page indicator to carry
 * the same information.
 *
 * The padding is on the content container, not the view, so the first card
 * lines up with the page margin while the row still scrolls edge to edge.
 */
export function CardRail() {
  const { width } = useWindowDimensions();
  const cardWidth = width * CARD_WIDTH;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: CARD_GAP }}
    >
      {cards.map((c) => (
        <View key={c.key}>
          <AccountCard
            width={cardWidth}
            flag={c.flag}
            kind={c.kind}
            scheme={c.scheme}
            balance={c.balance}
            number={c.number}
            valid={c.valid}
          />
        </View>
      ))}
    </ScrollView>
  );
}
