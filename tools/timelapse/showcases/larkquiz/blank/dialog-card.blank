import { Image, View } from 'react-native';

import { faces, lines } from '../data/start';
import { BUBBLE_GAP, CARD_MIN, CARD_PAD, FACE } from '../layout';
import { lk, radius, type } from '../theme';
import { T } from './text';

/**
 * One line of the conversation.
 *
 * The speaker's photograph sits on the outside of the bubble and the bubble
 * takes at most four fifths of the card, so a long line wraps inside the card
 * instead of pushing the face off it.
 */
function Line({ who, side, text }: { who: number; side: string; text: string }) {
  const mine = side === 'right';

  return (
    <View
      style={{
        flexDirection: mine ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        marginTop: BUBBLE_GAP,
      }}
    >
      <Image
        source={faces[who]}
        style={{ width: FACE, height: FACE, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
      <View
        style={{
          maxWidth: '80%',
          marginHorizontal: 8,
          paddingHorizontal: 12,
          paddingVertical: 9,
          borderRadius: radius.bubble,
          backgroundColor: lk.bubble,
        }}
      >
        <T variant="bubble" color={lk.onBubble}>
          {text}
        </T>
      </View>
    </View>
  );
}

/**
 * The dialog, on its pink card.
 *
 * The lines are written out rather than mapped so the reveal can land them
 * one at a time — a conversation arriving line by line is the one beat this
 * screen has.
 *
 * They are spread through the card rather than centred in it. Centred, four
 * short bubbles sit in the middle of a tall pink rectangle with a band of
 * empty card above and below them, which reads as a card that failed to
 * fill.
 */
export function DialogCard() {
  return (
    <View
      style={{
        flex: 1,
        minHeight: CARD_MIN,
        borderRadius: radius.card,
        backgroundColor: lk.card,
        padding: CARD_PAD,
        // MISTAKE 1.23 the card came in over-padded
        paddingVertical: 62,
        justifyContent: 'space-evenly',
      }}
    >
{/* STEP 1.11 the question
      <Line {...lines[0]} />
*/}
{/* STEP 1.12 the reply
      <Line {...lines[1]} />
*/}
{/* STEP 1.13 the answer
      <Line {...lines[2]} />
*/}
{/* STEP 1.14 and the last word
      <Line {...lines[3]} />
*/}
    </View>
  );
}
