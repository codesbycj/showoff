import { Image, View } from 'react-native';

import { addons, badge, cta, hero, item, options, plus, quantity, total, usd } from '../data/item';
import { HeroProps, Round } from './_item-parts-shared';

/**
 * The dish.
 *
 * **A photograph, because a burger is a picture *of* something** (I4), and it
 * is the page's ground for its region (§5.5), so it may paint before the
 * controls over it are staged.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7).
 */
export function ItemHero({ width, height, topInset, control, onBack }: HeroProps) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.02 image
      <Image source={hero} style={{ width, height }} resizeMode="cover" />
      */}

      <View
        style={{
          position: 'absolute',
          left: 16,
          right: 16,
          top: topInset + 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.03 round
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        */}
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {/* STEP 1.04 round
          <Round glyph="arrowUpRight" label="Share" size={control} />
          */}
          {/* STEP 1.05 round
          <Round glyph="search" label="Help" size={control} />
          */}
        </View>
      </View>
    </View>
  );
}
