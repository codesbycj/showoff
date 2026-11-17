import { Pressable, View } from 'react-native';

import { recent, signed, txns, wallet, type Txn } from '../data/wallet';
import { Props, Row } from './_txn-list-shared';

/**
 * The transactions.
 *
 * **Whole rows, filling the space above the safe area.** `layout.ts` divides
 * that space into a whole number of rows and `count` is how many fit, so
 * nothing is clipped through its own text (R2) and no band is left at the foot
 * (I3).
 *
 * The sign of the amount drives both the colour and the minus, so a row cannot
 * show a credit in the debit colour (R9).
 */
export function TxnList({ margin, height, rowH, disc, count }: Props) {
  const shown = txns.slice(0, count);
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {shown.map((t, i) => (
        <Row key={t.id} txn={t} height={rowH} disc={disc} last={i === shown.length - 1} />
      ))}
    </View>
  );
}
