import { View } from 'react-native';

import { body } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-copy-shared';

/** The body. One run, 77 characters — R5's ceiling is 110 and the board's own
 *  run is 127. */
export function Body({ height, margin }: BlockProps) {
  return (
    <View style={{ height, marginHorizontal: margin }}>
      <T variant="body">{body}</T>
    </View>
  );
}
