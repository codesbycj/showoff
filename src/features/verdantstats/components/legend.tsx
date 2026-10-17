import { View } from 'react-native';

import { breakdown } from '../data/analytics';
import { LegendItem } from './legend-item';

/**
 * The key under the ring: two columns, filled down then across.
 *
 * Down then across, not across then down, because the ring is drawn in this
 * order and the eye follows the ramp — the first column is the three largest
 * slices, deepest green first, and the second is the rest. Filling across
 * would interleave the two halves of the ramp and the colour would stop
 * meaning anything.
 */
export function Legend() {
  const half = Math.ceil(breakdown.length / 2);
  const columns = [breakdown.slice(0, half), breakdown.slice(half)];

  return (
    <View style={{ flexDirection: 'row', gap: 22 }}>
      {columns.map((column, i) => (
        <View key={i} style={{ flex: 1 }}>
          {column.map((item) => (
            <LegendItem key={item.key} label={item.label} pct={item.pct} color={item.color} />
          ))}
        </View>
      ))}
    </View>
  );
}
