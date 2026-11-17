import { Image, Pressable, View } from 'react-native';

import { actions, banner, burger, headline, legal } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The headline. Two lines, as the board sets them — 36dp, so one thing is
 *  visibly the biggest thing (R8). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}
