import { Pressable, View } from 'react-native';

import { cta } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; onPress: () => void };

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

type AsideProps = { margin: number; height: number; onPress: () => void };

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
