import { Pressable, View } from 'react-native';
import { body, brand, cta, headline, step, steps } from '../data/onboard';
import { T } from './text';

import { BarProps } from './_onboard-parts-shared';

/** The wordmark and Skip. */
export function BrandBar({ margin, height, onSkip }: BarProps & { onSkip: () => void }) {
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
      <T variant="wordmark">{brand.name}</T>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
        onPress={onSkip}
        accessibilityRole="button"
        accessibilityLabel={brand.skip}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="skip">{brand.skip}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
