import { View } from 'react-native';

import { radius, vl } from '../theme';

/**
 * The promo carousel's position.
 *
 * The active one is a stadium rather than a larger circle, which is what keeps
 * the row's optical weight even: three dots with one scaled up reads as a
 * mistake, three dots with one stretched reads as a position.
 */
export function CarouselDots({ count, active }: { count: number; active: number }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
      {Array.from({ length: count }, (_, i) => {
        const on = i === active;
        return (
          <View
            key={i}
            style={{
              width: on ? 18 : 6,
              height: 6,
              borderRadius: radius.full,
              backgroundColor: on ? vl.limeDeep : vl.rule,
            }}
          />
        );
      })}
    </View>
  );
}
