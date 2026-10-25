import { Image, View } from 'react-native';

import { ROW_HEIGHT } from '../layout';
import { radius, tl, type } from '../theme';
import { T } from './text';

/**
 * One payment: who, what for, and how much.
 *
 * Money out and money in are told apart by the sign and by the ink, not by
 * colour alone — a red and a green that differ only in hue are the same row to
 * anyone who cannot separate them.
 */
export function PaymentRow({
  who,
  note,
  amount,
  src,
  out,
}: {
  who: string;
  note: string;
  amount: string;
  src: number;
  out: boolean;
}) {
  return (
    <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
      <Image source={src} style={{ width: 40, height: 40, borderRadius: radius.control }} />
{/* STEP 1.21 who, and what for
      <View style={{ flex: 1, marginLeft: 12 }}>
        <T variant="rowTitle" color={tl.ink} style={{ height: type.rowTitle.line }}>
          {who}
        </T>
        <T variant="rowMeta" color={tl.body} style={{ height: type.rowMeta.line }}>
          {note}
        </T>
      </View>
*/}
{/* STEP 1.24 and how much
      <T
        variant="rowAmount"
        color={out ? tl.ink : tl.violet}
        style={{ height: type.rowAmount.line }}
      >
        {amount}
      </T>
*/}
    </View>
  );
}
