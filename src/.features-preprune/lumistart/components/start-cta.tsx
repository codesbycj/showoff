import { Pressable, View } from 'react-native';

import { cta } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

import { Props } from './_start-cta-shared';

/**
 * The primary action — 56dp, so it clears R7 on its own.
 *
 * The fill and its shadow sit in one style object: a `Platform.select` for a
 * shadow is exactly what the web render cannot check (§4.4).
 */
export function StartCta({ margin, height, radius, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={cta.primary}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.deep,
            opacity: pressed ? 0.88 : 1,
            shadowColor: '#0D2409',
            shadowOpacity: 0.2,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 6,
          }}
        >
          <T variant="cta">{cta.primary}</T>
        </View>
      )}
    </Pressable>
  );
}
