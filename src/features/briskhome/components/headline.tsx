import { View } from 'react-native';

import { copy } from '../data/start';
import { DISPLAY_TOP } from '../layout';
import { br, type } from '../theme';
import { T } from './text';

/**
 * What the screen is, set in two weights.
 *
 * The runs are data, not markup: each line is a list of `{ text, weight }`,
 * so the weight change is a property of the copy rather than something a
 * component hard-codes. React Native resolves a face by family name and not
 * by numeric weight, so the two runs are two families — `Inter_700Bold` and
 * `Inter_400Regular` — and never a `font-bold` utility.
 *
 * A nested `<Text>` would set both runs on one baseline, but it also makes
 * the line's height depend on the tallest run; these are the same size, so a
 * row of two `T`s is simpler and measures exactly.
 */
export function Headline() {
  return (
    <View style={{ marginTop: DISPLAY_TOP }}>
      {copy.displayLines.map((line, i) => (
        <View key={i} style={{ flexDirection: 'row' }}>
          {line.map((run) => (
            <T
              key={run.text}
              variant={run.weight === 'bold' ? 'displayBold' : 'displayLight'}
              color={br.ink}
              style={{ height: type.displayBold.line }}
            >
              {run.text}
            </T>
          ))}
        </View>
      ))}
    </View>
  );
}
