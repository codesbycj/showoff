import { Pressable, Text, View } from 'react-native';

import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * The sticky checkout button.
 *
 * The export floats it over a `bg-gradient-to-t from-surface via-surface/95 to-
 * transparent` so content can scroll under it. That is a solid canvas fill
 * here: React Native has no gradient without a second package, the fade only
 * does anything while something is passing beneath it, and in the reference the
 * summary card stops well above the bar — so the two are the same pixels.
 *
 * `tracking-wide` on the label overrides `labelLg`'s own 0.15 with 0.025em,
 * which at 15dp is 0.375.
 */
export function CheckoutBar({
  label,
  total,
  inset,
  onPress,
}: {
  label: string;
  total: string;
  inset: number;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: SP.marginMobile,
        paddingBottom: SP.marginMobile + inset,
        backgroundColor: fa.surface,
      }}
    >
      <Pressable onPress={onPress} accessibilityRole="button">
        <View
          style={{
            height: 56,
            borderRadius: R.full,
            backgroundColor: fa.primaryContainer,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: SP.lg,
            ...ELEV.glow,
          }}
        >
          <Text style={{ ...TYPE.labelLg, letterSpacing: 0.375, color: fa.surfaceContainerLowest }}>
            {label}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
            <Text
              style={{
                ...TYPE.headlineSm,
                fontFamily: FONT.bold,
                color: fa.surfaceContainerLowest,
              }}
            >
              {total}
            </Text>
            <Symbol name="arrowForward" size={20} color={fa.surfaceContainerLowest} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
