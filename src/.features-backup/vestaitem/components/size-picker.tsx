import { Pressable, ScrollView, View } from 'react-native';

import { screen, sizes } from '../data/item';
import { ct } from '../theme';
import { T } from './text';

type HeadProps = { margin: number; height: number };

/** "Select Size" and the way to the chart. */
export function SizeHead({ margin, height }: HeadProps) {
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
      <T variant="sizeLabel">{screen.sizeTitle}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={screen.sizeChart}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{screen.sizeChart}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}

type Props = {
  margin: number;
  height: number;
  min: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The size chips.
 *
 * **A horizontal `ScrollView`**, so six chips at a real 44dp tap target (R7)
 * run off the edge honestly rather than wrapping onto a second line the board
 * does not have.
 *
 * Sold-out sizes are struck and unpressable. The board draws six identical
 * chips with no reason why one is chosen; a size picker that knows its stock is
 * I1's "improve it where it is obviously better", and it is named in the
 * handover.
 */
export function SizePicker({ margin, height, min, value, onSelect }: Props) {
  return (
    <View style={{ height: Math.max(height, min) }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
      >
        {sizes.map((s) => {
          const on = s.id === value;
          const out = s.stock === 0;
          return (
            <Pressable
              key={s.id}
              disabled={out}
              onPress={() => onSelect(s.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on, disabled: out }}
              accessibilityLabel={out ? `${s.label}, sold out` : `Size ${s.label}`}
            >
              {({ pressed }) => (
                <View
                  style={{
                    minWidth: min,
                    height: min,
                    paddingHorizontal: 12,
                    borderRadius: min / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 0 : 1,
                    borderColor: ct.fieldEdge,
                    backgroundColor: on ? ct.accent : out ? ct.field : ct.white,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <T variant={on ? 'sizeOn' : out ? 'sizeOut' : 'sizeLabel'}>{s.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
