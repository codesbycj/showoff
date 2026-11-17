import { Image, Pressable, ScrollView, View } from 'react-native';

import { activeShot, gallery } from '../data/item';
import { ct } from '../theme';

type Props = { height: number; margin: number; thumb: number; gap: number };

/**
 * The other shots.
 *
 * **A horizontal `ScrollView`, not a wrap** (R2), pinned to its own height so
 * it cannot absorb the screen's slack — a `ScrollView` carries `flexGrow: 1`
 * and will happily eat every spare dp into one hole.
 *
 * The selected thumbnail carries a lime ring with a gap inside it, so the ring
 * never covers the photograph it marks (R3).
 */
export function ShotRail({ height, margin, thumb, gap }: Props) {
  const ring = thumb + 8;

  return (
    <View style={{ height }}>
      {/* STEP 1.12 image
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap, alignItems: 'center' }}
      >
        {gallery.map((shot, i) => {
          const on = i === activeShot;
          return (
            <Pressable
              key={shot.id}
              hitSlop={4}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={`View shot ${i + 1}`}
            >
              {({ pressed }) => (
                <View
                  style={{
                    width: ring,
                    height: ring,
                    borderRadius: ring / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 2 : 0,
                    borderColor: ct.accent,
                    opacity: pressed ? 0.7 : 1,
                  }}
                >
                  <Image
                    source={shot.photo}
                    style={{
                      width: thumb,
                      height: thumb,
                      borderRadius: thumb / 2,
                      backgroundColor: ct.card,
                    }}
                  />
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
