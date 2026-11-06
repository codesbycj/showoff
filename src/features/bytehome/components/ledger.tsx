import { Pressable, View } from 'react-native';

import { sheet, type } from '../theme';
import { transactions, type Tx } from '../data/home';
import { AmazonMark, AppleMark, PaypalMark } from './brand';
import { Glyph } from './glyph';
import { T } from './text';

function Mark({ kind }: { kind: Tx['mark'] }) {
  if (kind === 'apple') return <AppleMark size={24} />;
  if (kind === 'amazon') return <AmazonMark size={24} />;
  if (kind === 'paypal') return <PaypalMark size={24} />;
  return <Glyph name="wordmark" size={24} tint={sheet.ink} />;
}

/**
 * What went in and out.
 *
 * The row height is handed down from the screen, which worked it out from
 * what the sheet has left — so the list ends on the dock rather than
 * stopping two thirds of the way down it.
 */
export function Ledger({ rowH }: { rowH: number }) {
  return (
    <View>
      {transactions.map((tx, i) => (
        <Pressable
          key={tx.id}
          accessibilityRole="button"
          accessibilityLabel={`${tx.name}, ${tx.amount}`}
        >
          <View
            style={{
              height: rowH,
              flexDirection: 'row',
              alignItems: 'center',
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: sheet.hairline,
            }}
          >
            <View style={{ width: 34, alignItems: 'center' }}>
              <Mark kind={tx.mark} />
            </View>

            <View style={{ flex: 1, marginLeft: 12 }}>
              <T variant="txTitle" color={sheet.ink} style={{ height: type.txTitle.line }}>
                {tx.name}
              </T>
              <T
                variant="txMeta"
                color={sheet.muted}
                style={{ height: type.txMeta.line, marginTop: 3 }}
              >
                {tx.when}
              </T>
            </View>

            <T
              variant="txAmount"
              color={tx.credit ? '#17795A' : sheet.ink}
              style={{ height: type.txAmount.line }}
            >
              {tx.amount}
            </T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
