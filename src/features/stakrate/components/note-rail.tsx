import { ScrollView, View } from 'react-native';

import { notes, stock } from '../data/ratings';
import { MARGIN, NOTE_GAP, NOTE_PAD, NOTE_WIDTH } from '../layout';
import { radius, sk, type } from '../theme';
import { BrandMark } from './brand-mark';
import { T } from './text';

/**
 * What the analysts actually said, as a rail you push sideways.
 *
 * The cards run off the right edge and off the bottom of the screen on
 * purpose: a rail whose last card ends neatly inside the frame does not look
 * like a rail, and the overhang is what tells you there is another one. It is
 * also what fills the foot of the screen.
 *
 * `contentContainerStyle` carries the page margin rather than the ScrollView
 * itself, so the first card starts on the margin and the last can still
 * overhang.
 */
export function NoteRail() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -MARGIN }}
      contentContainerStyle={{ paddingHorizontal: MARGIN }}
    >
      {notes.map((n, i) => (
        <View
          key={n.id}
          style={{
            width: NOTE_WIDTH,
            marginLeft: i === 0 ? 0 : NOTE_GAP,
            borderRadius: radius.card,
            backgroundColor: sk.card,
            padding: NOTE_PAD,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BrandMark size={28} tint={sk.slab} />
            <T
              variant="noteBrand"
              color={sk.onCard}
              style={{ marginLeft: 9, height: type.noteBrand.line }}
            >
              {stock.name}
            </T>
          </View>
          <T
            variant="noteTitle"
            color={sk.onCard}
            style={{ marginTop: 14, height: type.noteTitle.line }}
          >
            {n.title}
          </T>
          <T variant="noteBody" color={sk.cardBody} style={{ marginTop: 8 }}>
            {n.body}
          </T>
        </View>
      ))}
    </ScrollView>
  );
}
