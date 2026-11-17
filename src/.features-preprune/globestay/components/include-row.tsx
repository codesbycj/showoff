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

import { ChipProps } from './_stay-parts-shared';

/** What the price includes. */
export function IncludeRow({ margin, height }: ChipProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 10 }}>
      {includes.map((i) => (
        <View
          key={i.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 7,
            height,
            paddingHorizontal: 14,
            borderRadius: height / 2,
            borderWidth: 1,
            borderColor: ct.cardEdge,
            backgroundColor: ct.white,
          }}
        >
          <Glyph name={i.glyph} size={15} color={ct.ink} strokeWidth={1.7} />
          <T variant="chip">{i.label}</T>
        </View>
      ))}
    </View>
  );
}
