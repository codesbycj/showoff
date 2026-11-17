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
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { TitleProps } from './_stay-parts-shared';

/** The name, the rating and the rate. */
export function StayTitle({ margin, height }: TitleProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="place" numberOfLines={1}>
          {stay.name}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Glyph name="star" size={12} color={ct.star} />
          <T variant="rating">{stay.rating.toFixed(1)}</T>
          <T variant="meta">{`(${stay.reviews}) · ${stay.country}`}</T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <T variant="price">{usd(stay.rate)}</T>
        <T variant="priceUnit">{unit}</T>
      </View>
    </View>
  );
}
