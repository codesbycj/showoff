import { Pressable, View } from 'react-native';

import { tabs } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  height: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The tab bar.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice. The bar is
 * flush to the bottom of the app's own frame and pads its own contents clear
 * of the indicator.
 *
 * The board labels every tab "Lorem Ipsum". R5: a label is a label.
 */
export function TabBar({ height, bottomInset, value, onSelect }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottomInset,
        backgroundColor: ct.white,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      <View style={{ height, flexDirection: 'row', alignItems: 'center' }}>
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
              style={{ flex: 1 }}
            >
              {({ pressed }) => (
                <View
                  style={{
                    alignItems: 'center',
                    gap: 4,
                    paddingVertical: 8,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <Glyph
                    name={t.glyph}
                    size={21}
                    color={on ? ct.accent : ct.sub}
                    strokeWidth={1.8}
                  />
                  <T variant={on ? 'tabOn' : 'tab'}>{t.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
