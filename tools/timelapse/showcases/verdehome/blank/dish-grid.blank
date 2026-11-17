import { Image, Pressable, ScrollView, View } from 'react-native';

import { dishes } from '../data/home';
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
 * The dishes.
 *
 * **"kcal", not the board's "Kal"** (I1), and the flame beside it is drawn
 * rather than set as an emoji (I8).
 *
 * The save control is a sibling of each card's own `Pressable`, never a child:
 * a `role="button"` inside another is torn apart by the static web build's
 * HTML parser (§7).
 */
export function DishGrid({ margin, width, imageH, radius, bottomPad, onSelect }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, paddingBottom: bottomPad }}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
        {dishes.map((dish) => (
          <View key={dish.id} style={{ width }}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={dish.name}
              onPress={() => onSelect?.(dish.id)}
            >
              <View
                style={{
                  borderRadius: radius,
                  backgroundColor: ct.tray,
                  padding: 10,
                  gap: 8,
                }}
              >
                {/* The title's own box stops short of the save control: a
                    control may not straddle the content it covers, and the
                    fix is to inset the content (R3). */}
                <View style={{ marginRight: 28 }}>
                  <T variant="dish" numberOfLines={2}>
                    {dish.name}
                  </T>
                </View>

                <Image
                  source={dish.image}
                  style={{ width: width - 20, height: imageH, borderRadius: radius - 6 }}
                  resizeMode="cover"
                />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Glyph name="flame" size={14} color={ct.flame} />
                  <T variant="kcal" style={{ marginLeft: 4, flex: 1 }}>
                    {dish.kcal} kcal
                  </T>
                  <T variant="price">${dish.price.toFixed(2)}</T>
                </View>
              </View>
            </Pressable>

            <View style={{ position: 'absolute', top: 12, right: 12 }}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={dish.saved ? 'Saved' : 'Save'}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <Glyph
                  name={dish.saved ? 'heart' : 'saved'}
                  size={20}
                  color={dish.saved ? ct.heart : ct.muted}
                  strokeWidth={1.8}
                />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
