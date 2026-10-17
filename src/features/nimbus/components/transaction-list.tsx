import { View } from 'react-native';

import { TRANSACTIONS } from '../data/transactions';
import { ROW_AVATAR, ROW_TEXT_GAP } from '../layout';
import { nb } from '../theme';
import { TransactionRow } from './transaction-row';

/**
 * The rows, with a hairline between them.
 *
 * The rule starts where the text does rather than at the margin — 47.2dp in,
 * which is the mark plus its gap — so it reads as a divider between entries
 * rather than as a line across the page. There is none after the last row.
 */
export function TransactionList({ onSelect }: { onSelect?: (id: string) => void }) {
  return (
    <View>
      {TRANSACTIONS.map((t, i) => (
        <View key={t.id}>
          <TransactionRow
            brand={t.brand}
            title={t.title}
            when={t.when}
            amount={t.amount}
            tag={t.tag}
            onPress={() => onSelect?.(t.id)}
          />
          {i < TRANSACTIONS.length - 1 ? (
            <View
              style={{
                height: 1,
                // The reference's rule sits 1.8dp above where a 64dp row would
                // put it, and the row after it still starts on the 64dp pitch.
                marginTop: -1.8,
                marginBottom: 0.8,
                marginLeft: ROW_AVATAR + ROW_TEXT_GAP,
                backgroundColor: nb.rule,
              }}
            />
          ) : null}
        </View>
      ))}
    </View>
  );
}
