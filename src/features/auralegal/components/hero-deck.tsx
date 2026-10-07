import { View } from 'react-native';

import { type DeckCard } from '../data/explore';
import { SP } from '../theme';

import { DeckPeekCard } from './deck-peek-card';
import { HeroCard } from './hero-card';

/** The deck's own box. The export pins it with `min-h-[385px]`. */
const DECK_HEIGHT = 385;

/**
 * The stacked profile deck — two cards peeking from behind a lavender hero.
 *
 * It is not a carousel. The export gives the two background cards fixed
 * rotations, offsets and scales and no state at all; its only script is a drag
 * on the front card that springs straight back. So this takes no index and no
 * `onSwipe` — it is one composite illustration, and the peeks exist to say the
 * feed has more in it.
 *
 * `width` is passed in rather than measured: the peeks are sized as a
 * percentage of the deck and positioned by arithmetic, so the deck has to know
 * its own width before layout rather than after it.
 */
export function HeroDeck({
  peeks,
  hero,
  width,
  onOpen,
}: {
  peeks: readonly DeckCard[];
  hero: {
    name: string;
    casesLabel: string;
    cases: string;
    place: string;
    availability: string;
    portrait: number;
  };
  width: number;
  onOpen?: () => void;
}) {
  return (
    <View
      style={{
        height: DECK_HEIGHT,
        marginTop: SP.md,
        marginBottom: SP.lg,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {peeks.map((card) => (
        <DeckPeekCard key={card.key} card={card} deckWidth={width} />
      ))}

      <HeroCard
        name={hero.name}
        casesLabel={hero.casesLabel}
        cases={hero.cases}
        place={hero.place}
        availability={hero.availability}
        portrait={hero.portrait}
        width={width}
        onOpen={onOpen}
      />
    </View>
  );
}
