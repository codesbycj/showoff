import { Pressable, View } from 'react-native';

import { dish, money, selectedTotal } from '../data/dish';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onPress: () => void };

/**
 * What is selected, and the way on.
 *
 * **The total is computed from the unit price and the count** (R9), never
 * typed beside them - which is how the board's cart ends up claiming $30.00
 * over two lines that add to $13.67.
 *
 * The bar is a floating pill, so its slack is even: a 62dp pill around a 40dp
 * disc is 11dp above and 11dp below, and it does not reserve the indicator's
 * strip (I11).
 */
export function SelectBar({ margin, height, onPress }: Props) {
  const count = dish.qty;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${count} items selected, ${money(selectedTotal())}`}
      onPress={onPress}
    >
      <View
        style={{
          marginHorizontal: margin,
          height,
          borderRadius: height / 2,
          backgroundColor: ct.dark,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 22,
          paddingRight: 11,
        }}
      >
        {/* STEP 1.25 t
        <T variant="selected">{`${count} items selected`}</T>
        */}

        {/* STEP 1.26 glyph
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <T variant="total">{money(selectedTotal())}</T>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: ct.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="bag" size={17} color={ct.onAccent} strokeWidth={1.7} />
          </View>
        </View>
        */}
      </View>
    </Pressable>
  );
}
