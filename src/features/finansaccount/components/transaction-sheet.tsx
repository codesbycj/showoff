import { Pressable, View } from 'react-native';

import { labels, transactions } from '../data/account';
import { GRABBER_H, GRABBER_W, SHEET_HEAD_GAP, SHEET_PAD } from '../layout';
import { fn, radius, shadow } from '../theme';
import { T } from './text';
import { TransactionRow } from './transaction-row';

/**
 * The sheet at the foot of the screen: today's movements.
 *
 * It is a sheet rather than a section — rounded only at the top, with a
 * grabber — because the reference's is one, and that shape promises it can be
 * dragged up. The promise is honest here: it is the natural place for the rest
 * of the history to live.
 *
 * `flex: 1` so it fills whatever the screen leaves, which is what makes it
 * reach the bottom on a tall phone instead of floating with paper under it.
 */
export function TransactionSheet({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        backgroundColor: fn.surface,
        paddingHorizontal: SHEET_PAD,
        paddingTop: 10,
        ...shadow.sheet,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        {/* STEP 1.21 a sheet you can pull up
        <View
          style={{
            width: GRABBER_W,
            height: GRABBER_H,
            borderRadius: radius.full,
            backgroundColor: fn.grabber,
          }}
        />
        */}
      </View>

      {/* STEP 1.22 name it
      <View
        style={{
          marginTop: SHEET_HEAD_GAP,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="section" color={fn.ink}>
          {labels.section}
        </T>
        <Pressable hitSlop={10} accessibilityRole="button">
          <T variant="link" color={fn.muted}>
            {labels.viewAll}
          </T>
        </Pressable>
      </View>
      */}

      {/* STEP 1.23 and say when
      <T variant="dayLabel" color={fn.muted} style={{ marginTop: 12 }}>
        {labels.today}
      </T>
      */}

      <View style={{ marginTop: 2 }}>
        {/* STEP 1.24 then the movements
        {transactions.map((t) => (
          <TransactionRow
            key={t.key}
            title={t.title}
            time={t.time}
            amount={t.amount}
            out={t.out}
            onPress={() => onSelect?.(t.key)}
          />
        ))}
        */}
      </View>
    </View>
  );
}
