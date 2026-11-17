import { Image, Pressable, View } from 'react-native';
import { brand, headline, hero, slide, step, steps, subline } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** One line, 27 characters (R5). */
export function Subline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="subline">{subline}</T>
    </View>
  );
}
