import { Image, Pressable, ScrollView, View } from 'react-native';

import { dishes, tabs, usd, wasPrice, type Dish } from '../data/menu';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type TabProps = { height: number; margin: number; value: string; onSelect: (id: string) => void };

/**
 * The menu tabs.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its last tab cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The active tab carries a rule under it, as the board draws it.
 */
export function MenuTabs({ height, margin, value, onSelect }: TabProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 20, alignItems: 'center' }}
      >
        {tabs.map((t) => {
          const on = t === value;
          return (
            <Pressable
              key={t}
              onPress={() => onSelect(t)}
              hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t}
            >
              {({ pressed }) => (
                <View style={{ height, justifyContent: 'center', opacity: pressed ? 0.7 : 1 }}>
                  <T variant={on ? 'tabOn' : 'tab'}>{t}</T>
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 2,
                      height: 2.5,
                      borderRadius: 2,
                      backgroundColor: on ? ct.brand : 'transparent',
                    }}
                  />
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

function Card({
  dish,
  col,
  photoH,
  radius,
  add,
  onPress,
}: {
  dish: Dish;
  col: number;
  photoH: number;
  radius: number;
  add: number;
  onPress: () => void;
}) {
  const was = wasPrice(dish);
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={dish.name}>
      {({ pressed }) => (
        <View style={{ width: col, opacity: pressed ? 0.88 : 1 }}>
          <View
            style={{
              width: col,
              height: photoH,
              borderRadius: radius,
              overflow: 'hidden',
              backgroundColor: ct.tile,
            }}
          >
            <Image source={dish.photo} style={{ width: col, height: photoH }} resizeMode="cover" />
          </View>

          {/* Wholly inside the photograph, so it cannot straddle its edge (R3). */}
          <View
            style={{
              position: 'absolute',
              right: 8,
              top: photoH - add - 8,
              width: add,
              height: add,
              borderRadius: add / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.brand,
            }}
          >
            <Glyph name="plus" size={14} color={ct.brandInk} strokeWidth={2.4} />
          </View>

          <View style={{ marginTop: 8 }}>
            <T variant="dish" numberOfLines={1}>
              {dish.name}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <T variant="price">{usd(dish.price)}</T>
              {was !== null ? <T variant="was">{usd(was)}</T> : null}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  gutter: number;
  col: number;
  photoH: number;
  radius: number;
  add: number;
  onSelect: () => void;
};

/**
 * The menu.
 *
 * Two columns laid out as explicit rows rather than a wrap, so a reveal can
 * stage one card at a time without the rest reflowing underneath it.
 *
 * The was-price comes from `wasPrice`, which returns `null` when a dish has no
 * offer — so a reveal that has not yet staged the `offers` array renders
 * cleanly instead of printing `NaN` (I7).
 */
export function DishGrid({ margin, gutter, col, photoH, radius, add, onSelect }: Props) {
  const rows: Dish[][] = [];
  for (let i = 0; i < dishes.length; i += 2) rows.push(dishes.slice(i, i + 2));

  return (
    <View style={{ marginHorizontal: margin, gap: 16 }}>
      {rows.map((row) => (
        <View key={row[0].id} style={{ flexDirection: 'row', gap: gutter }}>
          {row.map((dish) => (
            <Card
              key={dish.id}
              dish={dish}
              col={col}
              photoH={photoH}
              radius={radius}
              add={add}
              onPress={onSelect}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
