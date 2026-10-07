import { Pressable, Text, View } from 'react-native';

import { ELEV, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The sticky conversion bar: add-to-bag, then Buy Now.
 *
 * The export pins it with `fixed bottom-0 p-margin`, and nothing inside it
 * accounts for the gesture bar — on web there is none. Here the inset is added
 * to the bottom padding rather than replacing it, so the 20dp the design asks
 * for survives on a device with a 34dp gesture bar instead of being eaten by it.
 */
export function BuyBar({
  cta,
  inset,
  onBag,
  onBuy,
}: {
  cta: string;
  inset: number;
  onBag?: () => void;
  onBuy?: () => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: SP.margin,
        paddingBottom: SP.margin + inset,
        backgroundColor: fa.surfaceContainerLowest,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SP.gutterMobile,
        ...ELEV.sheet,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: -8 },
      }}
    >
      <Pressable onPress={onBag} accessibilityRole="button" accessibilityLabel="Add to bag">
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: R.full,
            backgroundColor: fa.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="shoppingBag" size={22} />
        </View>
      </Pressable>

      <Pressable style={{ flex: 1 }} onPress={onBuy} accessibilityRole="button">
        <View
          style={{
            height: 56,
            borderRadius: R.full,
            backgroundColor: fa.primaryContainer,
            alignItems: 'center',
            justifyContent: 'center',
            ...ELEV.glow,
          }}
        >
          <Text style={{ ...TYPE.headlineSm, letterSpacing: -0.45, color: fa.onPrimary }}>
            {cta}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
