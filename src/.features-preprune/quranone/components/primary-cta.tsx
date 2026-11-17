import { Pressable, View } from 'react-native';
import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { ct } from '../theme';
import { T } from './text';

import { CtaProps } from './_onboard-parts-shared';

/**
 * The primary action — 56dp, so it clears R7 on its own.
 *
 * Its fill, border and shadow sit in one style object: a `Platform.select`
 * for a shadow is exactly what the web render cannot check (§4.4).
 */
export function PrimaryCta({ margin, height, radius, onPress }: CtaProps) {
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
            backgroundColor: ct.cta,
            borderWidth: 1,
            borderColor: ct.ctaEdge,
            opacity: pressed ? 0.85 : 1,
            shadowColor: '#000814',
            shadowOpacity: 0.4,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 8,
          }}
        >
          <T variant="cta">{cta.primary}</T>
        </View>
      )}
    </Pressable>
  );
}
