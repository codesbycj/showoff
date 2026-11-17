import { Image, Pressable, View } from 'react-native';

import { type Meal } from '../data/meals';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { meal: Meal; margin: number; height: number; radius: number; onOpen?: () => void };

/**
 * The last meal of the day, drawn wide as the board draws it.
 *
 * The arrow is a sibling of the row's own `Pressable`, never a child (§7), and
 * the text column is inset by its width so the control cannot straddle the
 * content it covers (R3).
 */
export function WideMeal({ meal, margin, height, radius, onOpen }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <Pressable accessibilityRole="button" accessibilityLabel={meal.name} onPress={onOpen}>
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.surface,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 12,
          }}
        >
          <Image
            source={meal.image}
            style={{ width: 76, height: 76, borderRadius: radius - 6 }}
            resizeMode="cover"
          />

          <View style={{ flex: 1, paddingRight: 52, gap: 1 }}>
            <T variant="slot">{meal.slot}</T>
            <T variant="mealSmall" numberOfLines={1}>
              {meal.name}
            </T>
            <T variant="facts" numberOfLines={1}>
              {meal.kcal} kcal · {meal.tags.join(' · ')}
            </T>
          </View>
        </View>
      </Pressable>

      <View style={{ position: 'absolute', right: 16, top: height / 2 - 20 }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open ${meal.name}`}
          onPress={onOpen}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: ct.dark,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="arrow" size={18} color={ct.onDark} strokeWidth={2} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
