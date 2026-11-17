import { View } from 'react-native';

import { dish } from '../data/dish';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Calories, time, rating.
 *
 * **"kcal", not the board's "kalories", and "rating", not "Reating"** (I1).
 * The flame and the star are drawn, because the board sets both as emoji and
 * those differ across Windows / Android / iOS (I8).
 */
export function DishFacts({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {/* STEP 1.13 glyph
        <Glyph name="flame" size={15} color={ct.flame} />
        */}
        {/* STEP 1.14 t
        <T variant="fact">{dish.kcal} kcal</T>
        */}
      </View>

      {/* STEP 1.15 minutes
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <Glyph name="clock" size={15} color={ct.muted} strokeWidth={1.7} />
        <T variant="fact">{dish.minutes}</T>
      </View>
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        {/* STEP 1.16 glyph
        <Glyph name="star" size={15} color={ct.flame} />
        */}
        {/* STEP 1.17 t
        <T variant="fact">
          {dish.rating} rating · {dish.reviews}
        </T>
        */}
      </View>
    </View>
  );
}
