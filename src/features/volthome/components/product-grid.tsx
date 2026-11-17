import { Image, Pressable, ScrollView, View } from 'react-native';

import { flash } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = {
  margin: number;
  width: number;
  imageH: number;
  radius: number;
  bottomPad: number;
  onSelect?: (id: string) => void;
};

/**
 * The flash-sale grid.
 *
 * Two columns that run off the bottom of the frame, which is how the board
 * crops it and what keeps the foot closed (I3).
 *
 * The save control is a sibling of each card's own `Pressable`, never a child:
 * a `role="button"` inside another is torn apart by the static web build's
 * HTML parser (§7).
 */
export function ProductGrid({ margin, width, imageH, radius, bottomPad, onSelect }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, paddingBottom: bottomPad }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {flash.map((product) => (
          <View key={product.id} style={{ width }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={product.title}
              onPress={() => onSelect?.(product.id)}
            >
              <View
                style={{
                  borderRadius: radius,
                  backgroundColor: ct.surface,
                  padding: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    height: imageH,
                    borderRadius: radius - 4,
                    backgroundColor: ct.tray,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    source={product.image}
                    style={{ width: width - 20, height: imageH }}
                    resizeMode="cover"
                  />
                </View>

                <T variant="productTitle" numberOfLines={2}>
                  {product.title}
                </T>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <T variant="price">£{product.price}.00</T>
                  <T variant="was">£{product.was}.00</T>
                </View>
              </View>
            </Pressable>

            <View style={{ position: 'absolute', top: 18, right: 18 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={product.saved ? 'Saved' : 'Save'}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: ct.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph
                    name="heart"
                    size={16}
                    color={ct.ink}
                    strokeWidth={product.saved ? 2.4 : 1.8}
                  />
                </View>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
