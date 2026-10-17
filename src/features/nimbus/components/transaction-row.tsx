import { Pressable, View } from 'react-native';

import { ROW_HEIGHT, ROW_TEXT_GAP } from '../layout';
import { nb } from '../theme';
import { BrandMark, type BrandName } from './brand-mark';
import { T } from './text';

/**
 * One transaction: the merchant's mark, what and when, and what it cost.
 *
 * Both text columns are vertically centred against the 33dp mark in a 64dp
 * row — the reference's own pitch, measured mark-top to mark-top across three
 * rows.
 *
 * The row takes `onPress` and decides nothing. Where a transaction goes is the
 * screen's business.
 */
export function TransactionRow({
  brand,
  title,
  when,
  amount,
  tag,
  onPress,
}: {
  brand: BrandName;
  title: string;
  when: string;
  amount: string;
  tag: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        <BrandMark name={brand} />

        <View style={{ flex: 1, marginLeft: ROW_TEXT_GAP }}>
          <T variant="rowTitle" color={nb.ink}>
            {title}
          </T>
          <T variant="rowMeta" color={nb.muted} style={{ marginTop: 1.65 }}>
            {when}
          </T>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <T variant="rowAmount" color={nb.debit}>
            {amount}
          </T>
          <T variant="rowTag" color={nb.muted} style={{ marginTop: 1.65 }}>
            {tag}
          </T>
        </View>
      </View>
    </Pressable>
  );
}
