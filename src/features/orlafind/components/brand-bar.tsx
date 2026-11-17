import { Pressable, View } from 'react-native';

import { brand } from '../data/find';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The wordmark and the menu.
 *
 * Extracted out of the screen rather than written inline: a screen file is a
 * list of imports and the blocks they mount, and a header written as markup
 * reveals in one beat instead of three (rule 2 / I5).
 *
 * **Centred tracking** is cancelled in the type scale with `paddingRight`,
 * because trailing `letterSpacing` otherwise pushes the word off its own
 * centre (RULES SS6.2).
 */
export function BrandBar({ margin, height }: Props) {
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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Glyph name="mark" size={18} color={ct.onPage} filled />
        <T variant="wordmark" style={{ color: ct.onPage }}>
          {brand.name.toUpperCase()}
        </T>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Menu"
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="menu" size={20} color={ct.onPage} strokeWidth={1.8} />
        </View>
      </Pressable>
    </View>
  );
}
