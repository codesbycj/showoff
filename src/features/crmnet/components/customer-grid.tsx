import { View } from 'react-native';

import { customers } from '../data/network';
import { GRID_GAP } from '../layout';
import { CustomerCard } from './customer-card';

/**
 * The customers, two to a row.
 *
 * Built as rows of two rather than as a wrapping grid: a wrap would let an odd
 * card stretch to the full width on its own line, and the data decides how
 * many there are. Rows keep every card the same size whatever the count.
 */
export function CustomerGrid({ onSelect }: { onSelect?: (key: string) => void }) {
  const rows: (typeof customers)[number][][] = [];
  for (let i = 0; i < customers.length; i += 2) {
    rows.push(customers.slice(i, i + 2) as unknown as (typeof customers)[number][]);
  }

  return (
    <View style={{ gap: GRID_GAP }}>
      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: GRID_GAP }}>
          {row.map((c) => (
            <CustomerCard
              key={c.key}
              name={c.name}
              company={c.company}
              amount={c.amount}
              face={c.face}
              accent={c.accent}
              dim={c.dim}
              onPress={() => onSelect?.(c.key)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
