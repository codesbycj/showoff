import { Pressable, ScrollView, View } from 'react-native';

import {
  PRICE,
  about,
  amenities,
  facts,
  pricing,
  usd,
  venue,
  yearSaving,
  yearly,
} from '../data/gym';
import { ct } from '../theme';
import { T } from './text';

import { BlockProps } from './_gym-body-shared';

/**
 * What it costs.
 *
 * **Both figures derive from one price table** (R9): the yearly price is the
 * monthly one times twelve, less the discount, and the saving is the
 * difference. The board prints "253,000" beside "Second Payment: 200,00/mo",
 * which is two currencies, two separators and no relationship between them.
 */
export function PriceRow({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
        <T variant="price">{usd(PRICE.month)}</T>
        <T variant="priceUnit">{pricing.unit}</T>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 12,
          height: 30,
          borderRadius: 15,
          backgroundColor: ct.accentSoft,
        }}
      >
        <T variant="priceAlt">
          {`${pricing.yearLabel} ${usd(yearly)}${pricing.yearUnit} · save ${usd(yearSaving)}`}
        </T>
      </View>
    </View>
  );
}
