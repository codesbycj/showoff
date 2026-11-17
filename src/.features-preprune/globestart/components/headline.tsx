import { View } from 'react-native';

import { headline } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The headline. Two lines — the dominant element on the screen (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line.key} variant="headline">
          {line.text}
        </T>
      ))}
    </View>
  );
}
