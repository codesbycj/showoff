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
import { HeroProps, Round } from './_stay-parts-shared';

/**
 * The place.
 *
 * **A photograph, because a lake is a picture *of* somewhere** (I4), and it is
 * the page's ground for its region (§5.5), so it may paint before the controls
 * over it are staged.
 *
 * The board heads its own detail screen "Lake Como" over a photograph of
 * Venice; this one is a lake under mountains, so the picture agrees with the
 * name (R9, I1).
 */
export function StayHero({ width, height, topInset, control, onBack }: HeroProps) {
  return (
    <View style={{ width, height }}>
      <Image source={hero} style={{ width, height }} resizeMode="cover" />

      <View
        style={{
          position: 'absolute',
          left: 18,
          right: 18,
          top: topInset + 4,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Round glyph="back" label="Back" size={control} onPress={onBack} />
        <Round glyph="more" label="More" size={control} />
      </View>
    </View>
  );
}
