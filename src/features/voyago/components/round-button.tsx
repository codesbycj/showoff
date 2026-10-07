import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import { R, alpha, vy } from '../theme';

/**
 * The hairline-outlined circle that carries every bare control on the mint
 * canvas — the `//` menu on home and hotels, and the back arrow on hotels and
 * the ticket.
 *
 * Home draws it at 40dp with a `/30` border; the other two draw it at 44dp with
 * `/10` and `/15`. All three are the same control, so size and border weight
 * are props rather than three components.
 *
 * The visual box is an inner `View`, not the `Pressable` itself: a `Pressable`
 * whose style is a function is dropped in static render, which silently loses
 * the height and the border.
 */
export function RoundButton({
  size = 44,
  borderOpacity = 0.1,
  onPress,
  children,
  accessibilityLabel,
}: {
  size?: number;
  borderOpacity?: number;
  onPress?: () => void;
  children: ReactNode;
  accessibilityLabel?: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel}>
      <View
        style={{
          width: size,
          height: size,
          borderRadius: R.full,
          borderWidth: 1,
          borderColor: alpha(vy.ink, borderOpacity),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
