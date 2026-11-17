import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  about,
  actions,
  gallery,
  hero,
  includes,
  overview,
  stay,
  total,
  unit,
  usd,
} from '../data/stay';
import { T } from './text';

import { BlockProps } from './_stay-parts-shared';

/** One run, 100 characters — R5's ceiling is 110, and the board's own
 *  paragraph is cut off mid-word by the bottom of its artboard. */
export function AboutBlock({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="about">{about}</T>
    </View>
  );
}
