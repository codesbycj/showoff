import { Pressable, View } from 'react-native';

import type { ActivityGlyph } from '../data/home';
import { ROW_GAP, ROW_GLYPH, ROW_HEIGHT } from '../layout';
import { ph, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * One line of the activity list: what it was, when, and what it cost.
 *
 * The title and the date share a column that takes the slack, so a long
 * merchant name shortens rather than pushing the amount off the row — the
 * amount is the thing nobody will accept being truncated.
 */
export function ActivityRow({
  title,
  date,
  amount,
  glyph,
  onPress,
}: {
  title: string;
  date: string;
  amount: string;
  glyph: ActivityGlyph;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title} ${amount}`}
    >
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.31 a mark for the merchant
        <View
          style={{
            width: ROW_GLYPH,
            height: ROW_GLYPH,
            borderRadius: radius.full,
            backgroundColor: ph.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={glyph} size={17} color={ph.onInk} />
        </View>
        */}

        {/* STEP 1.32 what it was, and when
        <View style={{ flex: 1, marginLeft: ROW_GAP }}>
          <T variant="rowTitle" color={ph.text} numberOfLines={1}>
            {title}
          </T>
          <T variant="rowMeta" color={ph.muted} numberOfLines={1}>
            {date}
          </T>
        </View>
        */}

        {/* STEP 1.33 and what it cost
        <T variant="rowAmount" color={ph.text}>
          {amount}
        </T>
        */}
      </View>
    </Pressable>
  );
}
