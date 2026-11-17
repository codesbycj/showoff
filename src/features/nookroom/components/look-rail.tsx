import { Image, Pressable, ScrollView, View } from 'react-native';

import { looks } from '../data/room';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; width: number; radius: number };

/**
 * The other rooms the piece can be placed into.
 *
 * **A horizontal scroller, not a wrap** (R2): the board crops its last
 * thumbnail at the screen edge. `flexGrow: 0` is load-bearing - a ScrollView
 * carries `flexGrow: 1` and will eat every spare dp into the rail.
 *
 * Each label sits on a scrim rather than straight on the photograph, because
 * a caption over an unknown frame cannot be relied on for 4.5:1 (R4).
 */
export function LookRail({ margin, height, width, radius }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ height, flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
    >
      {looks.map((look) => (
        <Pressable
          key={look.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!look.on }}
          accessibilityLabel={look.label}
        >
          <View
            style={{
              width,
              height: height - 16,
              borderRadius: radius,
              overflow: 'hidden',
              borderWidth: look.on ? 2 : 0,
              borderColor: ct.white,
            }}
          >
            <Image source={look.image} style={{ width, height: height - 16 }} resizeMode="cover" />

            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                paddingVertical: 5,
                paddingHorizontal: 8,
                backgroundColor: ct.scrim,
              }}
            >
              <T variant="look">{look.label}</T>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
