import { Pressable, View } from 'react-native';

import { screen } from '../data/swap';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress: () => void };

/**
 * The primary action.
 *
 * White on black, as the reference draws it — 56dp tall, so it clears R7 on its
 * own without hit slop.
 *
 * The fill and its shadow are on one inner `View`, together: a
 * `Platform.select` for the shadow is exactly what the web render cannot check
 * (§4.4), so `shadow*` and `elevation` travel in the same style object and the
 * keys the running platform ignores are inert.
 */
export function ContinueCta({ margin, height, radius, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={screen.cta}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.cta,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#000000',
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <T variant="cta">{screen.cta}</T>
        </View>
      )}
    </Pressable>
  );
}
