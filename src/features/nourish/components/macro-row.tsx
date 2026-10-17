import { View } from 'react-native';

import { macros } from '../data/home';
import { MacroRing } from './macro-ring';

/**
 * The three macro rings, spread across the page.
 *
 * `space-around` rather than fixed gaps or `space-between`: the rings are a
 * fixed size and the page is not, so the air between them is what should give
 * on a narrower phone — but `space-between` pins the outer two hard against
 * the page margin, well outside the arc above them, and the row stops reading
 * as part of the hero. `space-around` keeps them under it.
 *
 * The data decides how many there are, in the same order as the gauge's
 * gradient above — protein, carbs, fat.
 */
export function MacroRow() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {macros.map((m) => (
        <MacroRing
          key={m.key}
          value={String(m.left)}
          unit="g"
          label={m.label}
          fraction={m.eaten / (m.eaten + m.left)}
          color={m.color}
        />
      ))}
    </View>
  );
}
