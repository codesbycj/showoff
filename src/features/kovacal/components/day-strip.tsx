import { Pressable, View } from 'react-native';

import { days } from '../data/cal';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The week.
 *
 * **R9: the strip is generated from the first date**, so a weekday letter can
 * never sit over the wrong number - the board's does. The open day is a filled
 * disc, not a colour change alone, so it survives a greyscale render, and a
 * day with work on it carries a dot.
 */
export function DayStrip({ margin, height }: Props) {
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
      {days.map((day) => (
        <Pressable
          key={day.id}
          accessibilityRole="button"
          accessibilityState={{ selected: day.today }}
          accessibilityLabel={`${day.label} ${day.date}`}
          hitSlop={{ top: 0, bottom: 0, left: 5, right: 5 }}
          style={{ alignItems: 'center', gap: 6 }}
        >
          <T variant="dayLabel">{day.label}</T>

          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: day.today ? ct.dark : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant={day.today ? 'dayDateOn' : 'dayDate'}>{day.date}</T>
          </View>

          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 3,
              backgroundColor: day.dot ? ct.violet : 'transparent',
            }}
          />
        </Pressable>
      ))}
    </View>
  );
}
