import { Pressable, View } from 'react-native';

import { address } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The shop's mark, where it is delivering to, and notifications.
 *
 * The address is centred as a block of two lines, which is how the board sets
 * it — a label over a value, not a sentence (R5).
 */
export function ShopHeader({ margin, height }: Props) {
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
      {/* STEP 1.02 glyph
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: ct.acid,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Glyph name="spark" size={22} color={ct.acidInk} />
      </View>
      */}

      {/* STEP 1.03 label
      <View style={{ alignItems: 'center' }}>
        <T variant="addressLabel">{address.label}</T>
        <T variant="address">{address.value}</T>
      </View>
      */}

      {/* STEP 1.04 "Notifications"
      <Pressable accessibilityRole="button" accessibilityLabel="Notifications">
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: ct.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="bell" size={19} color={ct.ink} strokeWidth={1.7} />
        </View>
      </Pressable>
      */}
    </View>
  );
}
