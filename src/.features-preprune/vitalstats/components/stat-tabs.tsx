import { Image, Pressable, View } from 'react-native';

import { leaderStats, pts, ranked, screen, tabs } from '../data/stats';
import { ct } from '../theme';
import { T } from './text';

import { TabProps } from './_stats-parts-shared';

/** Rankings / Activity. The active tab carries a rule, as the board draws it. */
export function StatTabs({ margin, height, value, onSelect }: TabProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: ct.hairline,
      }}
    >
      {tabs.map((t) => {
        const on = t === value;
        return (
          <Pressable
            key={t}
            onPress={() => onSelect(t)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={t}
            style={{ flex: 1 }}
          >
            {({ pressed }) => (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: pressed ? 0.7 : 1,
                }}
              >
                <T variant={on ? 'athlete' : 'score'}>{t}</T>
                <View
                  style={{
                    position: 'absolute',
                    left: 20,
                    right: 20,
                    bottom: 0,
                    height: 2.5,
                    borderRadius: 2,
                    backgroundColor: on ? ct.dark : 'transparent',
                  }}
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
