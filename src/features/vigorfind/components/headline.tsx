import { View } from 'react-native';

import { copy } from '../data/start';
import { DISPLAY_TOP, EYEBROW_TOP } from '../layout';
import { type, vg } from '../theme';
import { T } from './text';

/**
 * What the app is offering.
 *
 * The display line sets its own leading from the ramp rather than taking the
 * default, because at 31dp the default leading opens a three-line headline
 * out by nearly a line and a half — which is the difference between this
 * filling the top of the screen and floating in it.
 */
export function Headline() {
  return (
    <View style={{ marginTop: EYEBROW_TOP }}>
{/* STEP 1.08 the eyebrow
      <T variant="eyebrow" color={vg.onBlueDim} style={{ height: type.eyebrow.line }}>
        {copy.eyebrow}
      </T>
*/}

{/* STEP 1.09 and the sentence
      <T variant="display" color={vg.onBlue} style={{ marginTop: DISPLAY_TOP }}>
        {copy.display}
      </T>
*/}
    </View>
  );
}
