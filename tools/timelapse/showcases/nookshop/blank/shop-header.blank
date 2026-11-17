import { Pressable, View } from 'react-native';

import { header } from '../data/shop';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; onCart: () => void };

/**
 * Search and the cart.
 *
 * The badge is a sibling of the cart's `Pressable`, not a child of it: a
 * `role="button"` inside another is torn apart by the static web build's HTML
 * parser (SS7).
 */
export function ShopHeader({ margin, height, onCart }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 14,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Search the catalog"
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Glyph name="search" size={21} color={ct.ink} strokeWidth={1.8} />
        </View>
      </Pressable>

      <View>
        <Pressable accessibilityRole="button" accessibilityLabel="Your cart" onPress={onCart}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.sand,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="cart" size={19} color={ct.ink} strokeWidth={1.8} />
          </View>
        </Pressable>

        {/* STEP 1.02 view
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: -2,
            minWidth: 18,
            height: 18,
            borderRadius: 9,
            paddingHorizontal: 5,
            backgroundColor: ct.ink,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="badge">{String(header.cart)}</T>
        </View>
        */}
      </View>
    </View>
  );
}
