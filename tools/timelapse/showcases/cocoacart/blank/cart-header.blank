import { View } from 'react-native';

import { header, lines } from '../data/cart';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The screen's name, and how many lines are in the cart.
 *
 * **The count is read off the lines** (R9), so it cannot claim a number the
 * list does not hold - and it survives the array being empty while the reveal
 * fills it (I7).
 *
 * Extracted out of the screen rather than written inline: a screen file is a
 * list of imports and the blocks they mount, and a header written as markup
 * reveals in one beat instead of two (rule 2 / I5).
 */
export function CartHeader({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="itemName">{header.title}</T>

      {/* STEP 1.02 view
      <View
        style={{
          minWidth: 30,
          height: 30,
          paddingHorizontal: 9,
          borderRadius: 15,
          backgroundColor: ct.yellow,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="badge">{String(lines.length)}</T>
      </View>
      */}
    </View>
  );
}
