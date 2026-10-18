import { Pressable, View } from 'react-native';

import { ROW_HEIGHT } from '../layout';
import { sj } from '../theme';
import { BrandMark } from './brand-mark';
import { T } from './text';

/**
 * One line of the history: who, when, how much, and what kind of movement.
 *
 * The amount's colour comes from the same `credit` flag as its sign, so a row
 * cannot show a plus in debit ink.
 */
export function HistoryRow({
  name,
  time,
  amount,
  kind,
  mark,
  color,
  face,
  credit,
  onPress,
}: {
  name: string;
  time: string;
  amount: string;
  kind: string;
  mark: string;
  color: string;
  face?: number;
  credit: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${name} ${amount}`}
    >
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.21 who it was with
        <BrandMark label={mark} color={color} face={face} />
        */}

        {/* STEP 1.22 and when
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowTitle" color={sj.ink} numberOfLines={1}>
            {name}
          </T>
          <T variant="rowMeta" color={sj.muted}>
            {time}
          </T>
        </View>
        */}

        {/* STEP 1.23 then what it cost
        <View style={{ alignItems: 'flex-end' }}>
          <T variant="rowAmount" color={credit ? sj.credit : sj.ink}>
            {amount}
          </T>
          <T variant="rowKind" color={sj.muted}>
            {kind}
          </T>
        </View>
        */}
      </View>
    </Pressable>
  );
}
