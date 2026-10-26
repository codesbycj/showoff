import { View } from 'react-native';

import { copy } from '../data/start';
import { DISPLAY_TOP } from '../layout';
import { lk, type } from '../theme';
import { T } from './text';

/** What the exercise is asking, in two lines the reveal can set one at a time. */
export function Headline() {
  return (
    <View style={{ marginTop: DISPLAY_TOP }}>
{/* STEP 1.07 the first line
      <T variant="display" color={lk.ink} style={{ height: type.display.line }}>
        {copy.headline[0]}
      </T>
*/}
{/* STEP 1.08 and the second
      <T variant="display" color={lk.ink} style={{ height: type.display.line }}>
        {copy.headline[1]}
      </T>
*/}
    </View>
  );
}
