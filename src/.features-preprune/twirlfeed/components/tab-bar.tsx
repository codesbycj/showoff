import { Image, Pressable, ScrollView, View } from 'react-native';

import { brand, count, likedLine, nextPost, post, savedLine, stories, tabs } from '../data/feed';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { TabProps } from './_feed-parts-shared';

/**
 * The tab bar.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice.
 *
 * The unread badge sits **wholly inside** its glyph's box, so it cannot
 * straddle an edge (R3).
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
              accessibilityLabel={t.badge ? `${t.label}, ${t.badge} unread` : t.label}
              style={{ flex: 1 }}
            >
              {({ pressed }) => (
                <View style={{ alignItems: 'center', gap: 4, opacity: pressed ? 0.7 : 1 }}>
                  <View style={{ width: 26, height: 22, alignItems: 'center', justifyContent: 'center' }}>
                    <Glyph name={t.glyph} size={21} color={on ? ct.brand : ct.sub} strokeWidth={1.8} />
                    {t.badge ? (
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 3,
                          minWidth: 14,
                          height: 14,
                          borderRadius: 7,
                          paddingHorizontal: 3,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: ct.badge,
                        }}
                      >
                        <T variant="badge">{t.badge}</T>
                      </View>
                    ) : null}
                  </View>
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
