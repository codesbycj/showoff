import { Pressable, ScrollView, View } from 'react-native';

import { days, fields, type Day } from '../data/book';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** One day in the horizontal strip. */
function DayChip({
  day,
  on,
  w,
  h,
  radius,
  onPress,
}: {
  day: Day;
  on: boolean;
  w: number;
  h: number;
  radius: number;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityState={{ selected: on }}>
      {({ pressed }) => (
        <View
          style={{
            width: w,
            height: h,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 3,
            backgroundColor: on ? ct.accent : ct.chip,
            borderWidth: on ? 0 : 1,
            borderColor: ct.chipBorder,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <T variant={on ? 'dayNameOn' : 'dayName'}>{day.name}</T>
          <T variant={on ? 'dayNumOn' : 'dayNum'}>{day.num}</T>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  height: number;
  radius: number;
  day: { w: number; h: number; radius: number; gap: number };
  value: string;
  onSelect: (id: string) => void;
  onToggleCalendar?: () => void;
};

/**
 * The date field: the chosen date, a control that opens the month, and the
 * week as a horizontal strip.
 *
 * **The strip is a `ScrollView`, not a wrap.** The reference shows its fifth
 * chip clipped by the card's right edge, and R2 is explicit that a row running
 * off the edge is a scroller — a wrap physically cannot reproduce it. The chips
 * therefore bleed past the card's padding and the scroller is the thing that
 * clips them.
 */
export function DateCard({
  margin,
  height,
  radius,
  day,
  value,
  onSelect,
  onToggleCalendar,
}: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, paddingTop: 12 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.surface,
          borderWidth: 1,
          borderColor: ct.hairline,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingBottom: 12,
        }}
      >
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Glyph name="calendar" size={13} color={ct.sub} strokeWidth={1.7} />
            <T variant="fieldLabel">{fields.dateLabel}</T>
          </View>
          <T variant="fieldValue">{fields.dateValue}</T>
        </View>

        <Pressable
          onPress={onToggleCalendar}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Open calendar"
        >
          {({ pressed }) => (
            <View
              style={{
                height: 34,
                paddingHorizontal: 10,
                borderRadius: 11,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                backgroundColor: ct.chip,
                borderWidth: 1,
                borderColor: ct.chipBorder,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <Glyph name="calendar" size={16} color={ct.ink} strokeWidth={1.7} />
              <Glyph name="chevronDown" size={14} color={ct.ink} strokeWidth={2} />
            </View>
          )}
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: day.gap }}
        style={{ flexGrow: 0 }}
      >
        {days.map((d) => (
          <DayChip
            key={d.id}
            day={d}
            on={d.id === value}
            w={day.w}
            h={day.h}
            radius={day.radius}
            onPress={() => onSelect(d.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
