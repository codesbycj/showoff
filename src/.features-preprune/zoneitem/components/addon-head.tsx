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

/** "Add ons for Burger" — the board writes "Bourger" (I1). */
export function AddonHead({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T variant="sectionTitle">{addons.title}</T>
        <View style={{ flex: 1 }} />
        <View
          style={{
            height: 22,
            paddingHorizontal: 9,
            borderRadius: 11,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.tile,
          }}
        >
          <T variant="optional">{addons.optional}</T>
        </View>
      </View>
      <T variant="sectionNote">{addons.note}</T>
    </View>
  );
}
