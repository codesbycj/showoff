import { Pressable, ScrollView, Text, View } from 'react-native';

import { R, SP, TYPE, tx } from '../theme';

/**
 * A horizontal filter rail of pills.
 *
 * Shared by home's regions and the saved screen's tabs, because the design
 * system specifies them identically: "active chip is solid `#111111` with
 * `#FFFFFF` text; inactive chips feature `#F4F4F6` background with `#767676`
 * text". The only difference between the two uses is what fills them.
 *
 * It bleeds past the 20dp margin on both sides so the rail can scrub
 * off-canvas, which is what the spec means by a carousel with "a peek margin to
 * indicate overflow" — the first chip still lines up with the heading above it.
 */
export function ChipRail<T extends { key: string; label: string }>({
  items,
  selected,
  onSelect,
  /** Saved's tab strip sits inside a track and does not bleed. */
  bleed = true,
}: {
  items: readonly T[];
  selected: string;
  onSelect?: (key: string) => void;
  bleed?: boolean;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={bleed ? { marginHorizontal: -SP.margin } : undefined}
      contentContainerStyle={{
        paddingHorizontal: bleed ? SP.margin : 0,
        gap: SP.sm,
        alignItems: 'center',
        paddingVertical: SP.xs,
      }}
    >
      {items.map((item) => {
        const on = item.key === selected;
        return (
          <Pressable key={item.key} onPress={() => onSelect?.(item.key)}>
            <View
              style={{
                paddingHorizontal: SP.md + 4,
                paddingVertical: 10,
                borderRadius: R.full,
                backgroundColor: on ? tx.primary : tx.surfaceContainer,
              }}
            >
              <Text style={{ ...TYPE.labelMd, color: on ? tx.onPrimary : tx.onSurfaceVariant }}>
                {item.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
