import { View } from 'react-native';

import { copy } from '../data/start';
import { DISPLAY_TOP, LEDE_TOP } from '../layout';
import { mg, radius, type } from '../theme';
import { T } from './text';

/**
 * What the app is, in one sentence.
 *
 * **The brand sits in a reversed-out box inside the running line**, which is
 * the one piece of typography the reference is really about. It is a `View`
 * nested in the `Text`, so the box rides the baseline and the sentence wraps
 * around it as one paragraph — splitting the line into word chunks, as the
 * tallyo headline does, would be wrong here: this sentence is four lines
 * long and a wrap row cannot keep its leading even across them.
 */
export function Pitch() {
  return (
    <View style={{ marginTop: DISPLAY_TOP }}>
{/* STEP 1.15 the sentence
      <T variant="display" color={mg.onRed}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: radius.boxed,
            backgroundColor: mg.card,
          }}
        >
          <T variant="displayBoxed" color={mg.red} style={{ height: type.displayBoxed.line }}>
            {copy.brand}
          </T>
        </View>
        {copy.sentenceAfter}
      </T>
*/}

{/* STEP 1.16 and what is behind it
      <T variant="lede" color={mg.onRedDim} style={{ marginTop: LEDE_TOP }}>
        {copy.lede}
      </T>
*/}
    </View>
  );
}
