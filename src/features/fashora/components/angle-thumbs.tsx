import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';

import type { Angle } from '../data/detail';
import { ELEV, R, SP, fa } from '../theme';

/**
 * The three angle thumbnails under the turntable.
 *
 * Each tile is a 56dp rounded square with 4dp of padding, and the photo inside
 * carries `rounded-xl` — which this design system defines as 48dp, so on a 48dp
 * image it is a circle. That is not a misreading of the spec: the reference
 * renders them as circles inside rounded squares.
 *
 * The selected tile's ring is `outline-2`, which CSS draws *outside* the box.
 * React Native has no outline, and a border would eat 2dp of the tile, so the
 * ring is its own View inset by -2 — the tile keeps its 56dp and the ring sits
 * where the export puts it.
 */
export function AngleThumbs({
  items,
  selected,
  onSelect,
}: {
  items: readonly Angle[];
  selected: string;
  onSelect?: (key: string) => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: SP.sm,
        marginTop: 20,
      }}
    >
      {items.map((item) => {
        const on = item.key === selected;
        return (
          <Pressable
            key={item.key}
            onPress={() => onSelect?.(item.key)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: on }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: R.xl2,
                backgroundColor: fa.surfaceContainer,
                padding: SP.xs,
                opacity: on ? 1 : 0.7,
                transform: on ? [{ scale: 1.05 }] : undefined,
                ...ELEV.card,
              }}
            >
              <Image
                source={item.image}
                style={{ width: 48, height: 48, borderRadius: R.xl }}
                contentFit="cover"
              />

              {on ? (
                <View
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    borderRadius: R.xl2 + 2,
                    borderWidth: 2,
                    borderColor: fa.primaryContainer,
                  }}
                />
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
