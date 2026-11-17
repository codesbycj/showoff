import { Image, Pressable, ScrollView, View } from 'react-native';

import { dishes, tabs, usd, wasPrice, type Dish } from '../data/menu';
import { ct } from '../theme';
import { T } from './text';

import { TabProps } from './_dish-grid-shared';

/**
 * The menu tabs.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its last tab cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The active tab carries a rule under it, as the board draws it.
 */
export function MenuTabs({ height, margin, value, onSelect }: TabProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 20, alignItems: 'center' }}
      >
        {tabs.map((t) => {
          const on = t === value;
          return (
            <Pressable
              key={t}
              onPress={() => onSelect(t)}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t}
            >
              {({ pressed }) => (
                <View style={{ height, justifyContent: 'center', opacity: pressed ? 0.7 : 1 }}>
                  <T variant={on ? 'tabOn' : 'tab'}>{t}</T>
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 2,
                      height: 2.5,
                      borderRadius: 2,
                      backgroundColor: on ? ct.brand : 'transparent',
                    }}
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
