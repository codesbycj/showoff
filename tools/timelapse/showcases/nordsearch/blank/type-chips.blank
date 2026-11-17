import { Pressable, ScrollView, View } from 'react-native';

import { types } from '../data/search';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The stay-type filter.
 *
 * A horizontal scroller rather than a wrap: the board crops its third chip at
 * the frame, and a wrap layout physically cannot reproduce that (R2). Each
 * chip is 44dp tall, which is the floor a control has to clear (R7).
 */
export function TypeChips({ margin, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10 }}
      >
        {types.map((type) => (
          <Pressable
            key={type.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!type.on }}
            accessibilityLabel={type.label}
          >
            <View
              style={{
                height,
                paddingHorizontal: 24,
                borderRadius: radius,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: type.on ? ct.dark : 'transparent',
                borderWidth: type.on ? 0 : 1,
                borderColor: ct.ink,
              }}
            >
              <T variant={type.on ? 'chipOn' : 'chipOff'}>{type.label}</T>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
