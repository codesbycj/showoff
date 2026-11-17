import { Pressable, View } from 'react-native';

import { extras, money } from '../data/dish';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The extras the board cuts off at the bottom of its frame.
 *
 * Inventing the row a board crops is the sanctioned fix for a short screen
 * (I3) - the alternative is a band of empty canvas above the pinned bar, and
 * padding is never the fix.
 */
export function ExtrasRow({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap: 8 }}>
      {extras.map((extra) => (
        <Pressable
          key={extra.id}
          accessibilityRole="button"
          accessibilityLabel={`Add ${extra.label}, ${money(extra.price)}`}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              height,
              borderRadius: height / 2,
              borderWidth: 1,
              borderColor: ct.line,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
            }}
          >
            <Glyph name="plus" size={12} color={ct.ink} strokeWidth={2} />
            <T variant="extra" numberOfLines={1}>
              {extra.label}
            </T>
            <T variant="extraPrice">{money(extra.price)}</T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
