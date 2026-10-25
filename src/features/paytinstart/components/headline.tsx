import { View } from 'react-native';

import { PILL_HEIGHT, PILL_WIDTH } from '../layout';
import { pt, radius } from '../theme';
import { ArrowGlyph } from './arrow-glyph';
import { T } from './text';

/**
 * The headline, with a black pill set into its second line.
 *
 * The pill is a sibling of the text on that line, not a background behind it:
 * in the reference it sits *between* two words, taking its own width in the
 * line, and anything else — an inline image, a nested `Text` — would either
 * wrap wrongly or lose its height.
 *
 * The three lines are authored rather than wrapped. At 31dp over a 26dp margin
 * the headline is a few dp from rewrapping on any phone, and this one has a
 * shape that matters.
 */
export function Headline({ one, two, three }: { one: string; two: string; three: string }) {
  return (
    <View accessibilityRole="header">
      <T variant="display" color={pt.ink}>
        {one}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="display" color={pt.ink}>
          {two}
        </T>
        <View
          style={{
            width: PILL_WIDTH,
            height: PILL_HEIGHT,
            borderRadius: radius.pill,
            backgroundColor: pt.ink,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 10,
          }}
        >
          <ArrowGlyph size={18} color={pt.onInk} />
        </View>
      </View>

      <T variant="display" color={pt.ink}>
        {three}
      </T>
    </View>
  );
}
