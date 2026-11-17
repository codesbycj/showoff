import { Pressable, View } from 'react-native';

import { ranges } from '../data/cycle';
import { ct } from '../theme';
import { T } from './text';

import { TabProps } from './_cycle-parts-shared';

/** Week / Month / Quarter. */
export function RangeTabs({ margin, height, value, onSelect }: TabProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {ranges.map((r) => {
        const on = r === value;
        return (
          <Pressable
            key={r}
            onPress={() => onSelect(r)}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={r}
          >
            {({ pressed }) => (
              <View
                style={{
                  height,
                  paddingHorizontal: 16,
                  borderRadius: height / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? ct.dark : 'rgba(255,255,255,0.7)',
                  opacity: pressed ? 0.78 : 1,
                }}
              >
                <T variant={on ? 'tabOn' : 'tab'}>{r}</T>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
