import { Image, Pressable, View } from 'react-native';

import { product, variants } from '../data/item';
import { ct } from '../theme';
import { T } from './text';

type Props = { width: number; height: number; variant: number; margin: number };

/**
 * The pack, and the claim the board prints over it.
 *
 * **The snack is a photograph** (I4). The claim chip carries its own white
 * ground because it sits on photography, where the frame behind it cannot be
 * relied on for 4.5:1 (R4).
 */
export function ItemHero({ width, height, variant, margin }: Props) {
  const imageW = width - margin * 2;

  return (
    <View style={{ height, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={product.image}
        style={{ width: imageW, height: height - 16, borderRadius: 26 }}
        resizeMode="cover"
      />

      {/* STEP 1.11 claim
      <View
        style={{
          position: 'absolute',
          left: margin + 14,
          bottom: 26,
          paddingHorizontal: 12,
          paddingVertical: 7,
          borderRadius: 14,
          backgroundColor: ct.white,
        }}
      >
        <T variant="claim">{product.claim}</T>
      </View>
      */}

      <View style={{ position: 'absolute', right: margin + 14, top: 18, gap: 10 }}>
        {/* STEP 1.12 image
        {variants.map((v) => (
          <Pressable
            key={v.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!v.on }}
            accessibilityLabel={v.label}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Image
              source={v.image}
              style={{
                width: variant,
                height: variant,
                borderRadius: 14,
                borderWidth: v.on ? 2 : 1,
                borderColor: v.on ? ct.ink : ct.white,
              }}
              resizeMode="cover"
            />
          </Pressable>
        ))}
        */}
      </View>
    </View>
  );
}
