import { Pressable, View } from 'react-native';

import { fields, month, weeks } from '../data/book';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Cal = {
  h: number;
  radius: number;
  headH: number;
  titleH: number;
  weekdayH: number;
  cellH: number;
  disc: number;
};

type Props = {
  margin: number;
  cal: Cal;
  selected: number;
  onSelect: (day: number) => void;
  onCollapse?: () => void;
};

/**
 * The date field with the month open.
 *
 * **The card's fill is an absolutely-filled child, not the container.** Staging
 * the grid row by row would otherwise leave the card's `backgroundColor` live
 * and the take would open on an empty white slab (§5.5, I9).
 *
 * A `0` in `weeks` is a blank cell, rendered as an empty box rather than
 * skipped, so each row keeps its seven columns and the grid stays aligned while
 * the reveal fills it in.
 */
export function CalendarCard({ margin, cal, selected, onSelect, onCollapse }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height: cal.h }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: cal.radius,
          backgroundColor: ct.surface,
          borderWidth: 1,
          borderColor: ct.hairline,
        }}
      />

      <View
        style={{
          height: cal.headH,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
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
          onPress={onCollapse}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Close calendar"
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
              <Glyph name="chevronUp" size={14} color={ct.ink} strokeWidth={2} />
            </View>
          )}
        </Pressable>
      </View>

      <T variant="monthTitle" style={{ height: cal.titleH, textAlign: 'center' }}>
        {month.title}
      </T>

      <View style={{ flexDirection: 'row', height: cal.weekdayH, paddingHorizontal: 10 }}>
        {month.weekdays.map((d, i) => (
          <T key={`${d}${i}`} variant="weekday" style={{ flex: 1, textAlign: 'center' }}>
            {d}
          </T>
        ))}
      </View>

      {weeks.map((week, wi) => (
        <View
          key={`w${wi}`}
          style={{ flexDirection: 'row', height: cal.cellH, paddingHorizontal: 10 }}
        >
          {week.map((n, di) => {
            if (n === 0) return <View key={`b${wi}-${di}`} style={{ flex: 1 }} />;
            const on = n === selected;
            return (
              <Pressable
                key={`d${n}`}
                onPress={() => onSelect(n)}
                accessibilityRole="button"
                accessibilityState={{ selected: on }}
                accessibilityLabel={`${n} ${month.title}`}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      width: cal.disc,
                      height: cal.disc,
                      borderRadius: cal.disc / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: on ? ct.accent : 'transparent',
                      opacity: pressed ? 0.6 : 1,
                    }}
                  >
                    <T variant={on ? 'dayCellOn' : 'dayCell'}>{String(n)}</T>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
