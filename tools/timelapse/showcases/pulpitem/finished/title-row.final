import { Pressable, View } from 'react-native';

import { drink } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The drink's name, and the save control the board sets beside it.
 *
 * The heart is a **sibling** of the title, not a floating disc over it: the
 * board's own layout puts it on the page, and a control that straddles the
 * edge of the text it covers is a FAIL (R3).
 */
export function TitleRow({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="title">{drink.name}</T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel={`Save ${drink.name}`}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="heart" size={18} color={ct.onDark} strokeWidth={1.6} />
        </View>
      </Pressable>
    </View>
  );
}
