import { Image, Pressable, View } from 'react-native';

import { sizes } from '../data/dish';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; disc: number };

/**
 * The three portions.
 *
 * Each is a **photograph of the dish at that size**, not a drawn icon: a bowl
 * of ramen is a picture of a bowl of ramen, and drawing one produces a cartoon
 * where the board had food (I4). The active size is the larger disc with the
 * rule under it, exactly as the board marks it.
 */
export function SizeRail({ height, disc }: Props) {
  return (
    <View
      style={{
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 34,
      }}
    >
      {sizes.map((size) => (
        <Pressable
          key={size.id}
          accessibilityRole="button"
          accessibilityLabel={`${size.label} bowl`}
          hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
        >
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Image
              source={size.image}
              style={{
                width: size.on ? disc + 12 : disc,
                height: size.on ? disc + 12 : disc,
                borderRadius: (size.on ? disc + 12 : disc) / 2,
                opacity: size.on ? 1 : 0.62,
              }}
            />
            <T variant={size.on ? 'sizeLabelOn' : 'sizeLabel'}>{size.label}</T>
            <View
              style={{
                width: 18,
                height: 2,
                borderRadius: 1,
                backgroundColor: size.on ? ct.accent : 'transparent',
              }}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
