import { Pressable, View } from 'react-native';

import { recent, signed, txns, wallet, type Txn } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type HeadProps = { margin: number; height: number };

/** "Recent Transactions" and the way to the rest. */
export function RecentHead({ margin, height }: HeadProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sectionTitle">{recent.title}</T>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${recent.more}, ${recent.title}`}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{recent.more}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}

function Row({ txn, height, disc, last }: { txn: Txn; height: number; disc: number; last: boolean }) {
  const out = txn.amount < 0;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={`${txn.name}, ${signed(txn.amount)}`}>
      {({ pressed }) => (
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderBottomWidth: last ? 0 : 1,
            borderBottomColor: ct.hairline,
            opacity: pressed ? 0.6 : 1,
          }}
        >
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: disc / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: txn.tint,
            }}
          >
            <Glyph name={txn.mark} size={18} color={ct.white} strokeWidth={2} />
          </View>

          <View style={{ flex: 1 }}>
            <T variant="txnName">{txn.name}</T>
            <T variant="txnDate">{txn.date}</T>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <T variant={out ? 'txnOut' : 'txnIn'}>{signed(txn.amount)}</T>
            <T variant="txnUnit">{wallet.currency}</T>
          </View>
        </View>
      )}
    </Pressable>
  );
}

type Props = { margin: number; height: number; rowH: number; disc: number; count: number };

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
