import { Image, Pressable, View } from 'react-native';

import {
  addons,
  badge,
  cta,
  hero,
  item,
  options,
  plus,
  quantity,
  total,
  usd,
} from '../data/item';
import { T } from './text';

import { BlockProps } from './_item-parts-shared';

/** What the thing is. One run, 69 characters — R5's ceiling is 110. */
export function ItemBlurb({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="blurb">{item.blurb}</T>
    </View>
  );
}
