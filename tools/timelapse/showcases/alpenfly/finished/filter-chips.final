import { Pressable, ScrollView, View } from 'react-native';

import { filters } from '../data/fly';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * When, which month, how many seats.
 *
 * A horizontal scroller, not a wrap: the board crops its third chip at the
 * frame, which a wrap cannot reproduce (R2). Each chip is 46dp tall, over
 * R7's floor.
 */
export function FilterChips({ margin, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {filters.map((filter) => (
          <Pressable
            key={filter.id}
            accessibilityRole="button"
            accessibilityLabel={filter.label}
            hitSlop={{ top: 5, bottom: 5, left: 0, right: 0 }}
          >
            <View
              style={{
                height,
                paddingHorizontal: 16,
                borderRadius: radius,
                backgroundColor: ct.white,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Glyph name={filter.glyph} size={16} color={ct.ink} strokeWidth={1.7} />
              <T variant="chip">{filter.label}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
