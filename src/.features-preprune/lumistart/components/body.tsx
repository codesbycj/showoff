import { View } from 'react-native';

import { body, headline } from '../data/start';
import { T } from './text';

import { HeadProps } from './_pitch-shared';

/** The body. One run, 97 characters — R5's ceiling is 110, and the board's own
 *  run is 114 and repeats a word from the headline above it. */
export function Body({ margin, height }: HeadProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="body">{body}</T>
    </View>
  );
}
