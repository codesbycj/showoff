import { Pressable, View } from 'react-native';

import { cta } from '../data/start';
import { T } from './text';

import { AsideProps } from './_start-cta-shared';

/**
 * "Already have an account? Login".
 *
 * **The link's tap target is its line height**, which is 18dp and under R7's
 * 44 — so the anchor carries `hitSlop` that takes the real target past it,
 * rather than the row being inflated to 44dp of empty space.
 */
export function StartAside({ margin, height, onPress }: AsideProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
      }}
    >
      <T variant="aside">{cta.aside}</T>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 10, right: 10 }}
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={cta.link}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="link">{cta.link}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
