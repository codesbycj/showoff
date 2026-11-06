import { Pressable, View } from 'react-native';

import { ct, type } from '../theme';
import { categories, money } from '../data/stats';
import { T } from './text';

/**
 * Where the month went, biggest first.
 *
 * Five rows, not the reference's four: the list runs from the chart to the
 * dock, and four rows at a readable height leave a band of white under the
 * last one. The fifth is the row the reference crops.
 *
 * Each row's height comes from the screen — see `layout.ts` — so the list
 * ends where the dock begins at any phone height.
 */
export function CategoryList({ rowH }: { rowH: number }) {
  return (
    <View>
      {categories.map((c) => (
        <Pressable
          key={c.id}
          accessibilityRole="button"
          accessibilityLabel={`${c.name}, ${money(c.amount)}`}
        >
          <View style={{ height: rowH, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 9, height: 9, borderRadius: 5, backgroundColor: ct.forest }} />
            <T
              variant="rowName"
              color={ct.ink}
              style={{ flex: 1, height: type.rowName.line, marginLeft: 12 }}
            >
              {c.name}
            </T>
            <T variant="rowAmount" color={ct.ink} style={{ height: type.rowAmount.line }}>
              {money(c.amount)}
            </T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
