import { View } from 'react-native';

import { radius, el } from '../theme';

/**
 * Where you are in the onboarding.
 *
 * The current page is a stadium rather than a bigger circle, which is what
 * keeps the row's optical weight even: three dots with one scaled up reads as
 * a mistake, three dots with one stretched reads as a position.
 */
export function PageDots({ count, active }: { count: number; active: number }) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 }}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: count, now: active + 1 }}
      accessibilityLabel={`Step ${active + 1} of ${count}`}
    >
      {Array.from({ length: count }, (_, i) => {
        const on = i === active;
        return (
          <View
            key={i}
            style={{
              width: on ? 22 : 7,
              height: 7,
              borderRadius: radius.full,
              backgroundColor: on ? el.violet : el.dotIdle,
            }}
          />
        );
      })}
    </View>
  );
}
