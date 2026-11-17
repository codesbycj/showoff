import { View } from 'react-native';

import { money, rows } from '../data/cart';
import { T } from './text';

type Props = { margin: number; rowH: number };

/**
 * The charges.
 *
 * **Every figure is computed** (R9): the order amount is summed from the cart's
 * own lines and the promo, delivery and tax are the only typed numbers on the
 * screen. The board instead types a subtotal that its lines do not reach.
 *
 * `rows()` is a function rather than a constant because the subtotal has to be
 * read after the reveal has uncommented however many lines it has so far, and
 * it is guarded for the empty case (I7).
 */
export function SummaryRows({ margin, rowH }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      {rows().map((row) => (
        <View
          key={row.id}
          style={{
            height: rowH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <T variant="rowLabel">{row.label}</T>
          <T variant="rowValue">{money(row.value)}</T>
        </View>
      ))}
    </View>
  );
}
