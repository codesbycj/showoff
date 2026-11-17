import { View } from 'react-native';

import { body, headline } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-copy-shared';

/** The headline. Two lines, as the board sets them — 29dp against 14dp body,
 *  so one thing is visibly the biggest thing (R8). */
export function Headline({ height, margin }: BlockProps) {
  return (
    <View style={{ height, marginHorizontal: margin, justifyContent: 'center' }}>
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
