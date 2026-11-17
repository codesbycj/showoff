import { Pressable, ScrollView, View } from 'react-native';

import { sorts } from '../data/results';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * How the results are ordered.
 *
 * A horizontal scroller, not a wrap: the board crops its third chip at the
 * frame and a wrap cannot reproduce that (R2). The active chip is filled, so
 * it survives a greyscale render rather than relying on blue alone.
 */
export function SortChips({ margin, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {sorts.map((sort) => (
          <Pressable
            key={sort.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!sort.on }}
            accessibilityLabel={sort.label}
          >
            <View
              style={{
                height,
                paddingHorizontal: 20,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: sort.on ? ct.accentFill : ct.surface,
              }}
            >
              <T variant={sort.on ? 'chipOn' : 'chipOff'}>{sort.label}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
