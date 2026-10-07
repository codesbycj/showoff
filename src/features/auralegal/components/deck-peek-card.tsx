import { Text, View } from 'react-native';

import { type DeckCard } from '../data/explore';
import { R, SP, TYPE, al, alpha } from '../theme';

/** Geometry of the two cards that peek out from behind the hero. */
const SHAPE = {
  ghost: { widthPct: 0.86, height: 350, rotate: '-6deg', shiftX: -28, scale: 0.95, opacity: 0.6 },
  mint: { widthPct: 0.91, height: 360, rotate: '-3deg', shiftX: -14, scale: 0.98, opacity: 1 },
} as const;

/**
 * One of the two cards stacked behind the lavender hero.
 *
 * They are absolutely positioned and centred by arithmetic rather than by
 * `alignItems`. In CSS the export centres them with the flex parent, but React
 * Native lays an absolute child out from the top-left and ignores the parent's
 * `justifyContent`, so the offsets are computed from the deck's own box here.
 * Getting that wrong is invisible on the front card and pins both peeks to the
 * corner.
 *
 * Both carry only a cases pill and a name: the export fills them no further,
 * because everything below the first 90dp is covered by the card in front.
 */
export function DeckPeekCard({ card, deckWidth }: { card: DeckCard; deckWidth: number }) {
  const s = SHAPE[card.tone];
  const width = deckWidth * s.widthPct;
  const mint = card.tone === 'mint';

  return (
    <View
      style={{
        position: 'absolute',
        width,
        height: s.height,
        left: (deckWidth - width) / 2,
        top: (385 - s.height) / 2,
        borderRadius: 28,
        backgroundColor: mint ? al.secondaryFixed : al.surfaceBright,
        opacity: s.opacity,
        transform: [{ translateX: s.shiftX }, { rotate: s.rotate }, { scale: s.scale }],
        shadowColor: '#000000',
        shadowOpacity: mint ? 0.45 : 0.35,
        shadowRadius: mint ? 20 : 16,
        shadowOffset: { width: 0, height: mint ? 20 : 12 },
        elevation: mint ? 8 : 6,
        padding: SP.md,
      }}
    >
      <View
        style={{
          alignSelf: 'flex-start',
          paddingHorizontal: SP.md - 4,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: mint ? alpha(al.surfaceContainerLowest, 0.8) : al.surface,
        }}
      >
        <Text style={{ ...TYPE.labelSm, color: mint ? al.secondary : al.onSurface }}>
          {card.casesLabel} {card.cases}
        </Text>
      </View>

      <View style={{ marginTop: mint ? SP.sm : SP.sm }}>
        <Text
          style={{
            ...TYPE.headlineMd,
            fontFamily: TYPE.headlineMd.fontFamily,
            letterSpacing: -0.36,
            color: mint ? al.onSecondary : al.surfaceContainerLowest,
            opacity: mint ? 1 : 0.3,
          }}
        >
          {card.name}
        </Text>
        {card.place ? (
          <Text style={{ ...TYPE.labelSm, color: alpha(al.onSecondary, 0.7) }}>{card.place}</Text>
        ) : null}
      </View>
    </View>
  );
}
