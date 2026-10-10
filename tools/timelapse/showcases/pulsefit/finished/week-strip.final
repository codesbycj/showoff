import { Pressable, Text, View } from 'react-native';

import { Symbol } from './symbol';
import type { Day } from '../data/home';
import { LEVEL, R, TYPE, pf } from '../theme';

/** The two 28dp pagers beside the month. */
function Stepper({
  icon,
  label,
  onPress,
}: {
  icon: 'chevronLeft' | 'chevronRight';
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: R.full,
          backgroundColor: pf.surfaceLow,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name={icon} size={16} color={pf.inkVariant} />
      </View>
    </Pressable>
  );
}

/**
 * One day in the strip.
 *
 * 52dp tall at rest and 54.6 when selected, because the selected pill is
 * `scale-105` rather than a larger box — it grows about its own centre and
 * overhangs the row, which is why the lime pill in the reference is visibly
 * taller than the cells either side of it rather than just filled in.
 */
function DayCell({
  day,
  selected,
  onPress,
}: {
  day: Day;
  selected: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={{ flex: 1 }}
    >
      <View
        style={[
          {
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 4,
            borderRadius: R.chip,
          },
          selected && {
            backgroundColor: pf.lime,
            transform: [{ scale: 1.05 }],
          },
          selected && LEVEL.activeDay,
        ]}
      >
        <Text
          style={[
            selected ? TYPE.microActive : TYPE.micro,
            selected ? { color: pf.onLime } : { color: pf.muted, opacity: 0.7 },
          ]}
        >
          {day.letter}
        </Text>

        <Text style={[selected ? TYPE.dateActive : TYPE.date, { color: pf.ink, marginTop: 4 }]}>
          {day.date}
        </Text>
      </View>
    </Pressable>
  );
}

/**
 * The week strip: a month, two pagers, and seven days.
 *
 * 124dp tall — 16dp of padding, a 28dp head row whose height comes from the
 * pagers rather than the 24dp title beside them, a 12dp gap, and the 52dp row
 * of cells.
 */
export function WeekStrip({
  month,
  days,
  selected,
  onSelect,
  onPrev,
  onNext,
}: {
  month: string;
  days: readonly Day[];
  selected: string;
  onSelect?: (key: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <View
      style={[
        {
          borderRadius: R.card,
          backgroundColor: pf.surface,
          padding: 16,
          gap: 12,
        },
        LEVEL.card,
      ]}
    >
      <View
        style={{
          height: 28,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={[TYPE.section, { color: pf.ink }]}>{month}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Stepper icon="chevronLeft" label="Previous week" onPress={onPrev} />
          <Stepper icon="chevronRight" label="Next week" onPress={onNext} />
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        {days.map((day) => (
          <DayCell
            key={day.key}
            day={day}
            selected={day.key === selected}
            onPress={() => onSelect?.(day.key)}
          />
        ))}
      </View>
    </View>
  );
}
