import { View } from 'react-native';

import { copy } from '../data/signin';
import { tb, type } from '../theme';
import { T } from './text';

/**
 * "Your journey / starts / now."
 *
 * Three lines, with the last one in the deep green so the sentence lands on a
 * colour change rather than on a full stop alone. The reference does the same
 * thing across two lines; three is what the words want at 46dp on a 393dp
 * screen, and the third line being the short one is what gives the block its
 * shape.
 *
 * The leading is shorter than the point size — 44 on 46 — which is what makes
 * a stack of display type read as one object instead of three sentences. It is
 * also why this is a `View` of `T`s rather than one `T` with newlines: a line
 * height below the font size clips the descenders of a multi-line `Text` on
 * Android, and nothing on this screen has a descender to spare.
 */
export function Headline() {
  return (
    <View>
      {copy.display.map((line) => (
        <T
          key={line.text}
          variant="display"
          color={line.tone === 'deep' ? tb.deep : tb.ink}
          style={{ height: type.display.line }}
        >
          {line.text}
        </T>
      ))}
    </View>
  );
}
