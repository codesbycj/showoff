import { View } from 'react-native';

import { headline } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The headline. Two lines, as the board sets them — 36dp, so one thing is
 *  visibly the biggest thing (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      {/* STEP 1.05 text
      {headline.map((line) => (
        <T key={line.key} variant="headline">
          {line.text}
        </T>
      ))}
      */}
    </View>
  );
}
