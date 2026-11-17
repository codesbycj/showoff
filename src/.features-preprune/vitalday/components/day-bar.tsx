import { Image, Pressable, View } from 'react-native';
import {
  average,
  avatar,
  followingTitle,
  follows,
  headline,
  months,
  pct,
  peak,
  rings,
  today,
} from '../data/day';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BarProps } from './_day-parts-shared';

/** The avatar, the date, and the add control. */
export function DayBar({ margin, height, avatarSize }: BarProps & { avatarSize: number }) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Image
        source={avatar}
        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <T variant="date">{today}</T>
      </View>
      <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Add an entry">
        {({ pressed }) => (
          <View
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="plus" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
