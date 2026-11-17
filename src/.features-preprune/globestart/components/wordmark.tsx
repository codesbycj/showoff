import { Image, Pressable, View } from 'react-native';
import { brand, headline, hero, slide, step, steps, subline } from '../data/start';
import { T } from './text';

import { BlockProps } from './_start-parts-shared';

/** The wordmark. */
export function Wordmark({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="wordmark">{brand.name}</T>
    </View>
  );
}
