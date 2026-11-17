import { View } from 'react-native';

import { addons, badge, cta, hero, item, options, plus, quantity, total, usd } from '../data/item';
import { ct } from '../theme';
import { T } from './text';

import { BlockProps } from './_item-parts-shared';

/** "Add ons for Burger" — the board writes "Bourger" (I1). */
export function AddonHead({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* STEP 1.14 title
        <T variant="sectionTitle">{addons.title}</T>
        */}
        <View style={{ flex: 1 }} />
        {/* STEP 1.15 optional
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
        */}
      </View>
      {/* STEP 1.16 note
      <T variant="sectionNote">{addons.note}</T>
      */}
    </View>
  );
}
