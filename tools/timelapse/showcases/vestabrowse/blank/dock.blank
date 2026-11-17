import { Pressable, View } from 'react-native';

import { tabs } from '../data/browse';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  height: number;
  lift: number;
  radius: number;
  item: number;
  margin: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The floating dock. The active tab is a lime pill carrying its label; the rest
 * are glyphs alone, which is how the board draws it.
 *
 * **`bottomInset` is a lift, not a second strip.** R1b, the rule that put an
 * empty band under four screens of a deleted batch: when the app is not
 * edge-to-edge the system already reserves its navigation strip, so adding
 * `insets.bottom` to a dock that already stops above it counts the strip twice.
 * The inset here comes from `use-insets.ts`, which uses the design's value as a
 * **fallback** rather than a `Math.max`.
 *
 * The bar's fill and its shadow sit in one style object — a `Platform.select`
 * for a shadow is exactly what the web render cannot check (§4.4).
 */
export function Dock({ height, lift, radius, item, margin, bottomInset, value, onSelect }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        bottom: bottomInset + lift,
      }}
    >
      {/* STEP 1.24 label
      <View
        style={{
          height,
          borderRadius: radius,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 10,
          backgroundColor: ct.dock,
          borderWidth: 1,
          borderColor: ct.dockEdge,
          shadowColor: '#000000',
          shadowOpacity: 0.12,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 8 },
          elevation: 8,
        }}
      >
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    height: item,
                    paddingHorizontal: on ? 14 : 10,
                    borderRadius: item / 2,
                    backgroundColor: on ? ct.accent : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <Glyph
                    name={t.glyph}
                    size={20}
                    color={on ? ct.accentInk : ct.sub}
                    strokeWidth={1.9}
                  />
                  {on ? <T variant="tab">{t.label}</T> : null}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
      */}
    </View>
  );
}
