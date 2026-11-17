import { Pressable, View } from 'react-native';

import { recent, signed, txns, wallet, type Txn } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';


export type HeadProps = { margin: number; height: number };

export function Row({ txn, height, disc, last }: { txn: Txn; height: number; disc: number; last: boolean }) {
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

export type Props = { margin: number; height: number; rowH: number; disc: number; count: number };
