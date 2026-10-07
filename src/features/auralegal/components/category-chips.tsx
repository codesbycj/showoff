import { Pressable, ScrollView, Text, View } from 'react-native';

import { type Category } from '../data/explore';
import { R, SP, TYPE, al } from '../theme';

/**
 * The practice-area filter rail.
 *
 * `overflow-x-auto` with a `w-max` inner row in the export, so this is a real
 * horizontal `ScrollView` rather than a wrap: five chips are far wider than
 * 393dp and the design means them to run off the edge.
 *
 * It bleeds past the 20dp gutter on both sides — the export does the same with
 * `-mx-margin px-margin` — so the first chip still lines up with the headline
 * above it while the last can scroll out under the screen edge.
 *
 * The selected chip inverts to the ink colour rather than taking the brand
 * lavender, which is the design system's rule for an active filter: "solid fill
 * with deep dark charcoal text, immediate visual priority".
 */
export function CategoryChips({
  categories,
  selected,
  onSelect,
}: {
  categories: readonly Category[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -SP.margin }}
      contentContainerStyle={{
        paddingHorizontal: SP.margin,
        gap: 10,
        alignItems: 'center',
        paddingVertical: SP.xs,
      }}
    >
      {categories.map((c) => {
        const active = c.key === selected;
        return (
          <Pressable key={c.key} onPress={() => onSelect?.(c.key)}>
            <View
              style={{
                paddingHorizontal: SP.md + 4,
                paddingVertical: 10,
                borderRadius: R.full,
                backgroundColor: active ? al.onSurface : al.surfaceContainer,
              }}
            >
              <Text style={{ ...TYPE.labelLg, color: active ? al.surface : al.onSurfaceVariant }}>
                {c.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
