import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

import { RegionProps } from './_home-parts-shared';

/**
 * The region chips.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third chip
 * cut by the screen edge, and a wrap layout physically cannot reproduce that
 * (R2). The rail is pinned to its own height so it cannot absorb the screen's
 * slack.
 *
 * Each chip carries a **photograph**, not a drawn icon (I4).
 */
export function RegionRow({ margin, height, thumb, value, onSelect }: RegionProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
      >
        {regions.map((r) => {
          const on = r.id === value;
          return (
            <Pressable
              key={r.id}
              onPress={() => onSelect(r.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={r.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 9,
                    height,
                    paddingLeft: 5,
                    paddingRight: 16,
                    borderRadius: height / 2,
                    backgroundColor: ct.white,
                    borderWidth: 1,
                    borderColor: on ? ct.brand : ct.cardEdge,
                    opacity: pressed ? 0.78 : 1,
                  }}
                >
                  <Image
                    source={r.photo}
                    style={{
                      width: thumb,
                      height: thumb,
                      borderRadius: thumb / 2,
                      backgroundColor: ct.tile,
                    }}
                  />
                  <T variant="region">{r.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
