import { Pressable, View } from 'react-native';

import type { GoalGlyph as GlyphName } from '../data/home';
import { CARD_HEIGHT, CARD_PAD, CARD_WIDTH } from '../layout';
import { nr, radius } from '../theme';
import { GoalGlyph } from './goal-glyph';
import { T } from './text';

/**
 * One card in the Today row: a goal, what feeds it, and a mark.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style — a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the card would lose its border and its height in every harness shot.
 *
 * The title is given two lines and the meta one, pinned to the bottom, so a
 * one-line title and a two-line title produce the same card. Letting the box
 * size to its text is what makes a row of cards look broken.
 */
export function GoalCard({
  title,
  meta,
  glyph,
  onPress,
}: {
  title: string;
  meta: string;
  glyph: GlyphName;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          // MISTAKE 1.31 the cards came in tinted
          backgroundColor: nr.washCool,
          borderRadius: radius.card,
          borderWidth: 1,
          borderColor: nr.rule,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.30 the goal, and its mark
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <T variant="cardTitle" color={nr.ink} numberOfLines={2} style={{ flex: 1 }}>
            {title}
          </T>
          <View style={{ marginLeft: 8, marginTop: 1 }}>
            <GoalGlyph name={glyph} />
          </View>
        </View>
        */}

        {/* STEP 1.32 and where it comes from
        <T variant="cardMeta" color={nr.muted} numberOfLines={1}>
          {meta}
        </T>
        */}
      </View>
    </Pressable>
  );
}
