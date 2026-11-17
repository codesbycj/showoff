import { Pressable, View } from 'react-native';

import { markets } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  headH: number;
  tabsH: number;
  gap: number;
  value: string;
  onSelect: (tab: string) => void;
};

/**
 * "Markets", a way to see all of them, and the three filters.
 *
 * The selected tab is the screen's state, not the component's — a component
 * reports the tap and the screen decides what it means (RULES §6.1).
 *
 * Each tab is two words at most, which is R5's ceiling for a tab, and they are
 * the reference's own words.
 */
export function MarketsHead({ margin, headH, tabsH, gap, value, onSelect }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <View style={{ height: headH, flexDirection: 'row', alignItems: 'center' }}>
        <T variant="sectionTitle" style={{ flex: 1 }}>
          {markets.title}
        </T>
        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={markets.viewAll}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}
        >
          <T variant="viewAll">{markets.viewAll}</T>
          <Glyph name="chevronRight" size={12} color={ct.sub} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={{ height: gap }} />

      <View style={{ height: tabsH, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {markets.tabs.map((tab) => {
          const on = tab === value;
          return (
            <Pressable
              key={tab}
              onPress={() => onSelect(tab)}
              hitSlop={6}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
            >
              {({ pressed }) => (
                <View
                  style={{
                    height: 32,
                    paddingHorizontal: 14,
                    borderRadius: 16,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: on ? ct.disc : 'transparent',
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <T variant={on ? 'tabOn' : 'tab'}>{tab}</T>
                </View>
              )}
            </Pressable>
          );
        })}

        <View style={{ flex: 1 }} />

        <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="Filter markets">
          {({ pressed }) => (
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.disc,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <Glyph name="sliders" size={16} color={ct.ink} strokeWidth={1.8} />
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}
