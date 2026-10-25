import { Pressable, View } from 'react-native';

import { activeRange, ranges } from '../data/stock';
import { RANGE_HEIGHT } from '../layout';
import { radius, sk, type } from '../theme';
import { T } from './text';

/**
 * How much of the history to show.
 *
 * Six pills in a row that divides the width, so they fit a narrow screen
 * without a scroller and without any of them being a 24dp target.
 */
export function RangeRow() {
  return (
    <View style={{ flexDirection: 'row' }}>
      {ranges.map((r) => {
        const on = r === activeRange;
        return (
          <Pressable
            key={r}
            style={{ flex: 1 }}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={r}
          >
            <View
              style={{
                height: RANGE_HEIGHT,
                marginHorizontal: 3,
                borderRadius: radius.pill,
                backgroundColor: on ? sk.acid : sk.slab,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="range" color={sk.ink} style={{ height: type.range.line }}>
                {r}
              </T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
