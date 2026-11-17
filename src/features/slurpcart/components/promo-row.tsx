import { View } from 'react-native';

import { header } from '../data/cart';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number };

/**
 * The promo code, and the state it is in.
 *
 * **The confirmation carries ink, not white.** The board sets white on its
 * orange, which lands at 2.6:1 and is unreadable; ink on the same orange reads
 * 6.2:1, so the colour is kept exactly and the contrast is fixed (R4 / I1).
 */
export function PromoRow({ margin, height, radius }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        borderRadius: radius,
        backgroundColor: ct.card,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 6,
      }}
    >
      {/* STEP 1.07 code
      <T variant="code">{header.code}</T>
      */}

      {/* STEP 1.08 code state
      <View
        style={{
          height: height - 12,
          borderRadius: (height - 12) / 2,
          backgroundColor: ct.accent,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 14,
        }}
      >
        <Glyph name="check" size={13} color={ct.onAccent} strokeWidth={2.1} />
        <T variant="codeState">{header.codeState}</T>
      </View>
      */}
    </View>
  );
}
