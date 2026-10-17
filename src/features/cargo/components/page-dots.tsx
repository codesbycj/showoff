import { View } from 'react-native';

import { radius, cg } from '../theme';

/**
 * Where you are in the onboarding.
 *
 * Left-aligned, above the headline, because everything on this screen is left
 * aligned — centring the dots under a left-set block is the single easiest way
 * to make a composition like this look unresolved.
 *
 * The current page is a stadium rather than a bigger circle: three dots with
 * one scaled up reads as a mistake, three with one stretched reads as a
 * position.
 */
export function PageDots({ count, active }: { count: number; active: number }) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
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
              width: on ? 20 : 7,
              height: 7,
              borderRadius: radius.full,
              backgroundColor: on ? cg.dotActive : cg.dotIdle,
            }}
          />
        );
      })}
    </View>
  );
}
