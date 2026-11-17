import { Pressable, View } from 'react-native';

import { address } from '../data/cart';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/** Where the order is going. */
export function AddressRow({ margin, height, radius }: Props) {
  return (
    <View style={{ marginHorizontal: margin }}>
      <Pressable accessibilityRole="button" accessibilityLabel={`Deliver to ${address.value}`}>
        <View
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 14,
            gap: 10,
          }}
        >
          {/* STEP 1.05 glyph
          <Glyph name="pin" size={18} color={ct.ink} strokeWidth={1.7} />
          */}
          {/* STEP 1.06 value
          <T variant="address" style={{ flex: 1 }} numberOfLines={1}>
            {address.value}
          </T>
          */}
          {/* STEP 1.07 glyph
          <Glyph name="chevron" size={16} color={ct.muted} strokeWidth={2} />
          */}
        </View>
      </Pressable>
    </View>
  );
}
