import { Pressable, View } from 'react-native';

import { company, screen } from '../data/stock';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { IdProps } from './_stock-head-shared';

/**
 * The company.
 *
 * The mark is drawn for a **fictional** company — the board poses McDonald's
 * arches here, and shipping a real company's logo in a rebuild is
 * impersonation.
 *
 * The board's own line reads "12 shares available ▲90.99%", which puts a rate
 * beside a count and means nothing. Here the count is a count (R9).
 */
export function StockId({ margin, height, mark }: IdProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, flexDirection: 'row', alignItems: 'center', gap: 12 }}
    >
      <View
        style={{
          width: mark,
          height: mark,
          borderRadius: mark / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.tile,
        }}
      >
        <Glyph name="brand" size={mark * 0.62} />
      </View>

      <View style={{ flex: 1 }}>
        <T variant="company" numberOfLines={1}>
          {company.name}
        </T>
        <T variant="shares">{`${company.ticker} · ${company.shares} ${company.sharesLabel}`}</T>
      </View>
    </View>
  );
}
