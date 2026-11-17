import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

import { TabProps } from './_home-parts-shared';

/**
 * The tab bar.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice.
 */
export function TabBar({ height, bottomInset, value, onSelect }: TabProps) {
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
                <View style={{ alignItems: 'center', gap: 4, opacity: pressed ? 0.7 : 1 }}>
                  <Glyph name={t.glyph} size={21} color={on ? ct.brand : ct.sub} strokeWidth={1.8} />
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
