import { Pressable, View } from 'react-native';

import { ROW_GLYPH, ROW_HEIGHT } from '../layout';
import { fn, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * One transaction: which way the money went, to whom, when, and how much.
 *
 * The arrow and the amount's colour both come from the same `out` flag rather
 * than from two props, so a row cannot say "money in" with a down arrow and a
 * debit figure at the same time.
 */
export function TransactionRow({
  title,
  time,
  amount,
  out,
  onPress,
}: {
  title: string;
  time: string;
  amount: string;
  out: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} ${amount}`}
    >
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.25 which way it went
        <View
          style={{
            width: ROW_GLYPH,
            height: ROW_GLYPH,
            borderRadius: radius.full,
            backgroundColor: fn.canvas,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={out ? 'transfer' : 'request'} size={15} color={fn.ink} strokeWidth={2} />
        </View>
        */}

        {/* STEP 1.26 to whom, and when
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowTitle" color={fn.ink} numberOfLines={1}>
            {title}
          </T>
          <T variant="rowMeta" color={fn.muted}>
            {time}
          </T>
        </View>
        */}

        <T variant="rowAmount" color={out ? fn.debit : fn.credit}>
          {amount}
        </T>
      </View>
    </Pressable>
  );
}
