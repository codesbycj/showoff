import { View } from 'react-native';

import { welcome } from '../data/start';
import { T } from './text';

type Props = { margin: number; titleH: number; bodyH: number };

/**
 * The greeting.
 *
 * **R5: one line of body copy, not two sentences.** The board's reads "Good to
 * see you again Continue your journey with a smooth, connected experience",
 * which is 92 characters of filler with a missing full stop in the middle of
 * it.
 */
export function WelcomeCopy({ margin, titleH, bodyH }: Props) {
  return (
    <View style={{ marginHorizontal: margin, alignItems: 'center' }}>
      {/* STEP 1.06 title
      <View style={{ height: titleH, justifyContent: 'center' }}>
        <T variant="title">{welcome.title}</T>
      </View>
      */}

      {/* STEP 1.07 body
      <View style={{ height: bodyH, justifyContent: 'center' }}>
        <T variant="body">{welcome.body}</T>
      </View>
      */}
    </View>
  );
}
