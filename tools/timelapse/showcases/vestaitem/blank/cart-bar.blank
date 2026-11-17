import { Pressable, View } from 'react-native';

import { cart } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; share: number };

/**
 * Share, and the primary action.
 *
 * Both are 56dp, so each clears R7 on its own without hit slop. The fill and
 * its shadow sit in one style object: a `Platform.select` for a shadow is
 * exactly what the web render cannot check (§4.4).
 *
 * "Add To Cart" — the board writes "Add to card", which is a typo, not a
 * design. Fixed silently and named in the handover (I1).
 */
export function CartBar({ margin, height, radius, share }: Props) {
  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {/* STEP 1.32 "Share this item"
      <Pressable accessibilityRole="button" accessibilityLabel="Share this item">
        {({ pressed }) => (
          <View
            style={{
              width: share,
              height: share,
              borderRadius: share / 2,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: ct.fieldEdge,
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="share" size={20} color={ct.ink} />
          </View>
        )}
      </Pressable>
      */}

      {/* STEP 1.33 label
      <Pressable accessibilityRole="button" accessibilityLabel={cart.label} style={{ flex: 1 }}>
        {({ pressed }) => (
          <View
            style={{
              height,
              borderRadius: radius,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.accent,
              opacity: pressed ? 0.85 : 1,
              shadowColor: '#5E8B16',
              shadowOpacity: 0.3,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 8 },
              elevation: 6,
            }}
          >
            <T variant="cta">{cart.label}</T>
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
