import { Pressable, View } from 'react-native';
import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { T } from './text';

import { BlockProps } from './_onboard-parts-shared';

/** The body. One run, 66 characters — R5's ceiling is 110, and the board's own
 *  line runs the same list together with no commas at all. */
export function Body({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="body" style={{ textAlign: 'center' }}>
        {body}
      </T>
    </View>
  );
}
