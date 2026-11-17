import { Pressable, View } from 'react-native';

import { header } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/** The ask, and the filter beside it. */
export function ShopHeader({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="title">{header.title}</T>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Filter snacks"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="filter" size={19} color={ct.ink} strokeWidth={1.9} />
        </View>
      </Pressable>
    </View>
  );
}
