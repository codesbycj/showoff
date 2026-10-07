import { Pressable, ScrollView, Text, View } from 'react-native';

import type { Category } from '../data/home';
import { ELEV, R, SP, TYPE, fa } from '../theme';

/**
 * The category filter.
 *
 * A horizontal scroller, not a wrap: the reference shows "Streetwear" cut off
 * by the right edge of the screen, which a wrapping row physically cannot
 * reproduce. The inset is on the scroller's content rather than on the rail, so
 * the first pill lines up with the section head above it while the last one
 * still runs off the edge.
 */
export function CategoryRail({
  items,
  selected,
  onSelect,
}: {
  items: readonly Category[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: SP.marginMobile, gap: SP.sm }}
    >
      {items.map((item) => {
        const on = item.key === selected;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect?.(item.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
          >
            <View
              style={{
                height: 36,
                paddingHorizontal: 20,
                borderRadius: R.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? fa.primaryContainer : fa.surfaceContainerLow,
                ...(on ? { ...ELEV.glow, shadowOpacity: 0.3, shadowRadius: 3 } : null),
              }}
            >
              <Text style={{ ...TYPE.labelMd, color: on ? fa.onPrimary : fa.secondary }}>
                {item.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
