import { Pressable, View } from 'react-native';

import { slots, spot } from '../data/spot';
import { ct } from '../theme';
import { T } from './text';

type Props = {
  margin: number;
  headH: number;
  gap: number;
  chipH: number;
  chipGap: number;
  radius: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * "Available slots for today" and the times under it.
 *
 * Six chips in a wrap, which falls 4 + 2 at 393dp exactly as the reference
 * draws it. A wrap is right here: the reference's chips stop inside the
 * margin rather than running off the edge, and R2 only calls for a horizontal
 * scroller when an item is genuinely clipped by the screen edge.
 *
 * The selected chip is the screen's state, not the component's — a component
 * reports the tap and the screen decides what it means (RULES §6.1).
 *
 * Chip height is 40dp against R7's 44. `hitSlop` carries the touch target to
 * 48 while the drawn chip stays the size the design needs. Named in the
 * handover.
 */
export function SlotPicker({ margin, headH, gap, chipH, chipGap, radius, value, onSelect }: Props) {
  return (
    <View style={{ paddingHorizontal: margin }}>
      <T variant="sectionHead" style={{ height: headH }}>
        {spot.slotsHead}
      </T>

      <View style={{ height: gap }} />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: chipGap }}>
        {slots.map((s) => {
          const on = s.id === value;
          return (
            <Pressable
              key={s.id}
              onPress={() => onSelect(s.id)}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={s.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    height: chipH,
                    paddingHorizontal: 16,
                    borderRadius: radius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: on ? ct.surface : ct.chip,
                    borderWidth: 1.4,
                    borderColor: on ? ct.accent : ct.chipBorder,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <T variant={on ? 'chipOn' : 'chip'}>{s.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
