import { Pressable, ScrollView, Text, View } from 'react-native';

import { type TimeSlot } from '../data/booking';
import { R, SP, TYPE, al } from '../theme';

/**
 * The time slots under the date fan.
 *
 * The unselected chips carry the export's own per-position opacity — the two
 * outermost at 60%, the inner pair at 80% — which is what makes the row read as
 * part of the same dial as the dates above it rather than a flat list. So `dim`
 * is a property of the slot, not a function of selection.
 *
 * It scrolls horizontally: five slots at these paddings are wider than the
 * stage, and the export sets `overflow-x-auto` on the row.
 */
export function TimeDial({
  times,
  selected,
  onSelect,
}: {
  times: readonly TimeSlot[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        alignItems: 'center',
        gap: 6,
        paddingVertical: SP.xs,
        paddingHorizontal: SP.md,
      }}
    >
      {times.map((t) => {
        const on = t.key === selected;
        return (
          <Pressable key={t.key} onPress={() => onSelect?.(t.key)}>
            <View
              style={{
                paddingHorizontal: on ? SP.md : SP.md - 4,
                paddingVertical: on ? SP.sm : 6,
                borderRadius: R.full,
                backgroundColor: on ? al.primaryContainer : al.surfaceContainer,
                opacity: on ? 1 : t.dim,
                transform: [{ scale: on ? 1.05 : 1 }],
              }}
            >
              <Text
                style={{
                  ...(on ? TYPE.labelMd : TYPE.labelSm),
                  fontFamily: on ? TYPE.headlineXl.fontFamily : TYPE.labelMd.fontFamily,
                  color: on ? al.onPrimaryContainer : al.onSurfaceVariant,
                }}
              >
                {t.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
