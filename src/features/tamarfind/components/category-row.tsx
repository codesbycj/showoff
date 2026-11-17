import { Pressable, ScrollView, View } from 'react-native';

import { categories } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  height: number;
  margin: number;
  radius: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The category chips.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third chip cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The rail is pinned to its own height so it cannot absorb the screen's slack —
 * a `ScrollView` carries `flexGrow: 1` and will happily eat every spare dp.
 */
export function CategoryRow({ height, margin, radius, value, onSelect }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 9, alignItems: 'center' }}
      >
        {categories.items.map((c) => {
          const on = c.id === value;
          return (
            <Pressable
              key={c.id}
              onPress={() => onSelect(c.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={c.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    height,
                    paddingHorizontal: 15,
                    borderRadius: radius,
                    borderWidth: on ? 0 : 1,
                    borderColor: ct.fieldEdge,
                    backgroundColor: on ? ct.dark : ct.white,
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <Glyph
                    name={c.glyph}
                    size={17}
                    color={on ? ct.accent : ct.ink}
                    strokeWidth={1.9}
                  />
                  <T variant={on ? 'chipOn' : 'chip'}>{c.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
