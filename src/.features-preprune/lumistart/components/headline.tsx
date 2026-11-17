import { View } from 'react-native';

import { body, headline } from '../data/start';
import { T } from './text';

import { HeadProps } from './_pitch-shared';

/** The headline. Three lines, as the board sets them — the dominant element
 *  on the screen (R8), at 31dp against 14dp body. */
export function Headline({ margin, height }: HeadProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}
