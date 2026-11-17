import { Image, Pressable, View } from 'react-native';

import { popular } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number; onOpen: () => void };

/**
 * The popular products.
 *
 * **Each card is a photograph** (I4). The board sells a branded sack; these
 * are the product loose, because every stock frame of a pet-food sack carries
 * somebody's label.
 *
 * The heart is a **sibling** of the card's `Pressable`, not a child of it: a
 * `role="button"` inside another is torn apart by the static web build's HTML
 * parser (§7).
 */
export function ProductGrid({ margin, width, height, radius, onOpen }: Props) {
  const imageH = Math.max(90, height - 92);

  return (
    <View
      style={{
        marginHorizontal: margin,
        flexDirection: 'row',
        gap: 14,
      }}
    >
      {popular.slice(0, 2).map((product) => (
        <View key={product.id} style={{ width }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${product.name}, ${product.sub}`}
            onPress={onOpen}
          >
            <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: ct.card,
                }}
              />

              <Image source={product.image} style={{ width, height: imageH }} resizeMode="cover" />

              <View style={{ paddingHorizontal: 12, paddingTop: 10, gap: 3 }}>
                <T variant="cardName" numberOfLines={1}>
                  {product.name}
                </T>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <Glyph name="star" size={13} color={ct.accentInk} filled />
                  <T variant="rating">{product.rating}</T>
                </View>
              </View>
            </View>
          </Pressable>

          <View style={{ position: 'absolute', top: 3, right: 3 }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Save ${product.name}`}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: ct.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Glyph
                    name="heart"
                    size={15}
                    color={product.saved ? ct.accentInk : ct.muted}
                    strokeWidth={1.8}
                    filled={!!product.saved}
                  />
                </View>
              </View>
            </Pressable>
          </View>

          <View style={{ position: 'absolute', right: 12, bottom: 12 }}>
            <T variant="price">${product.price}</T>
          </View>
        </View>
      ))}
    </View>
  );
}
