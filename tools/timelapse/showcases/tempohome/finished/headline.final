import { View } from 'react-native';

import { copy } from '../data/home';
import { tp, type } from '../theme';
import { PeaceHand } from './glyph';
import { T } from './text';

/**
 * "Start Your Day / & Be Productive ✌️".
 *
 * The gesture is drawn and sits on the second line's baseline rather than
 * inside the string: an emoji in a `Text` is a different mark on every
 * platform and missing on some, and it would also take the line's leading with
 * it. As a sibling it cannot move the type.
 */
export function Headline() {
  return (
    <View>
      <T variant="display" color={tp.ink} style={{ height: type.display.line }}>
        {copy.display[0]}
      </T>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="display" color={tp.ink} style={{ height: type.display.line }}>
          {copy.display[1]}
        </T>
        <View style={{ marginLeft: 8, marginTop: 2 }}>
          <PeaceHand size={27} />
        </View>
      </View>
    </View>
  );
}
