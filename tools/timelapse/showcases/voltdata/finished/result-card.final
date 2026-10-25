import { View } from 'react-native';

import { CARD_HEIGHT, CARD_PAD } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One line of the calculation: the figure, what it counts, and its mark.
 *
 * `tone` swaps the fill and every ink on the card together rather than taking
 * them separately — three cards in three materials, and letting the ink be
 * set independently is how one of them ends up unreadable.
 */
export function ResultCard({
  figure,
  caption,
  tone,
  mark,
}: {
  figure: string;
  caption: string;
  tone: 'acid' | 'card' | 'slab';
  mark: 'clock' | 'wallet';
}) {
  const fill = tone === 'acid' ? vt.acid : tone === 'card' ? vt.card : vt.slab;
  const ink = tone === 'slab' ? vt.ink : vt.onCard;
  const sub = tone === 'slab' ? vt.body : tone === 'card' ? vt.cardBody : 'rgba(11,11,11,0.62)';
  const discFill = tone === 'card' ? vt.canvas : vt.card;
  const discInk = tone === 'card' ? vt.card : vt.onCard;

  return (
    <View
      style={{
        height: CARD_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: fill,
        padding: CARD_PAD,
        flexDirection: 'row',
      }}
    >
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <T variant="figure" color={ink} style={{ height: type.figure.line }}>
          {figure}
        </T>
        <T variant="caption" color={sub} style={{ maxWidth: 190 }}>
          {caption}
        </T>
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: radius.control,
          backgroundColor: discFill,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name={mark} size={19} tint={discInk} />
      </View>
    </View>
  );
}
