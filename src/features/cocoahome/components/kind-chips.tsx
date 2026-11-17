import { Pressable, ScrollView, View } from 'react-native';

import { kinds } from '../data/shop';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * Which kind of snack.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last chip at
 * the screen edge. `flexGrow: 0` is load-bearing - a ScrollView carries
 * `flexGrow: 1` and will eat every spare dp of the column into the rail.
 */
export function KindChips({ margin, height, radius }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {kinds.map((kind) => (
        <Pressable
          key={kind.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!kind.on }}
          accessibilityLabel={kind.label}
        >
          <View
            style={{
              height,
              paddingHorizontal: 20,
              borderRadius: radius,
              backgroundColor: kind.on ? ct.dark : ct.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant={kind.on ? 'chipOn' : 'chip'}>{kind.label}</T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
