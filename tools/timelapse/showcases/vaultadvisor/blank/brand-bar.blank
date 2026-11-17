import { Pressable, View } from 'react-native';

import { brand } from '../data/advisor';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The wordmark and the menu.
 *
 * The wordmark is set in the app's own serif rather than traced as a logo - it
 * is a name in a typeface, which is an idea, not a picture (I4).
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
      <T variant="wordmark">{brand.wordmark}</T>

      <Pressable accessibilityRole="button" accessibilityLabel="Menu">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="menu" size={20} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
    </View>
  );
}
