import { Pressable, View } from 'react-native';

import { screen, stats } from '../data/stock';
import { ct } from '../theme';
import { T } from './text';

import { Props } from './_stat-list-shared';

/**
 * Open, day range, 52-week range, market cap.
 *
 * **Every value is computed from the same series the chart plots** (R9). The
 * board's own rows include an eight-figure daily range on a $168 share and a
 * twelve-digit market cap written out in full; these are derived and formatted
 * as magnitudes.
 */
export function StatList({ margin, height, rowH }: Props) {
  const rows = stats();
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {rows.map((row, i) => (
        <View
          key={row.id}
          style={{
            height: rowH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            borderBottomWidth: i === rows.length - 1 ? 0 : 1,
            borderBottomColor: ct.hairline,
          }}
        >
          <T variant="statLabel">{row.label}</T>
          <T variant="statValue" numberOfLines={1}>
            {row.value}
          </T>
        </View>
      ))}
    </View>
  );
}
