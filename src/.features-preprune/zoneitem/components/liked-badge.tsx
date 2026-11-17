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
import { ct } from '../theme';
import { T } from './text';

import { BlockProps } from './_item-parts-shared';

/** "#1 Most liked". A label, not a sentence (R5). */
export function LikedBadge({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'flex-start' }}>
      <View
        style={{
          height,
          paddingHorizontal: 10,
          borderRadius: height / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.tile,
        }}
      >
        <T variant="badge">{badge}</T>
      </View>
    </View>
  );
}
