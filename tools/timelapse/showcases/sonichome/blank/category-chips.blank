import { Pressable, ScrollView, View } from 'react-native';

import {
  categories,
  collection,
  collectionLine,
  greeting,
  playlist,
  popular,
  songs,
  tabs,
  tracks,
} from '../data/home';
import { ct } from '../theme';
import { T } from './text';

import { ChipProps } from './_home-parts-shared';

/**
 * The category chips.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its last chip cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The rail is pinned to its own height so it cannot absorb the screen's slack.
 */
export function CategoryChips({ margin, height, value, onSelect }: ChipProps) {
  return (
    <View style={{ height }}>
      {/* STEP 1.17 scroll view
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
      >
        {categories.items.map((c) => {
          const on = c === value;
          return (
            <Pressable
              key={c}
              onPress={() => onSelect(c)}
              hitSlop={{ top: 8, bottom: 8, left: 2, right: 2 }}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={c}
            >
              {({ pressed }) => (
                <View
                  style={{
                    height,
                    paddingHorizontal: 16,
                    borderRadius: height / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 0 : 1,
                    borderColor: ct.cardEdge,
                    backgroundColor: on ? ct.lime : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <T variant={on ? 'chipOn' : 'chip'}>{c}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
      */}
    </View>
  );
}
