import { Pressable, View } from 'react-native';

import { week } from '../data/start';
import { DAY_WIDTH, STRIP_HEIGHT, STRIP_TOP } from '../layout';
import { on, radius, type } from '../theme';
import { T } from './text';

/**
 * The week, with today raised out of it.
 *
 * Every column comes from the same `Date` the heading does, so a number and
 * its weekday always belong together. The lit day is a tall pill that breaks
 * the strip's line — the reference's idea, and the clearest way to say "you
 * are here" without a second colour.
 *
 * The pill carries `shadow*` and `elevation` in one object; a
 * `Platform.select` is exactly what the web harness cannot check.
 */
export function WeekStrip({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View
      style={{
        height: STRIP_HEIGHT,
        marginTop: STRIP_TOP,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {week.map((d) => (
        <Pressable
          key={d.key}
          onPress={() => onSelect?.(d.key)}
          style={{ flex: 1, alignItems: 'center' }}
          accessibilityRole="button"
          accessibilityState={{ selected: d.on }}
          accessibilityLabel={d.name + ' ' + d.num}
        >
          <View
            style={{
              width: DAY_WIDTH,
              height: d.on ? STRIP_HEIGHT : 54,
              borderRadius: radius.pill,
              backgroundColor: d.on ? on.panel : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#0B0B0D',
              shadowOpacity: d.on ? 0.22 : 0,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 8 },
              elevation: d.on ? 6 : 0,
            }}
          >
            <T
              variant="dayNum"
              color={d.on ? on.onPanel : on.muted}
              style={{ height: type.dayNum.line }}
            >
              {String(d.num)}
            </T>
            <T
              variant="dayName"
              color={d.on ? on.onPanelDim : on.faint}
              style={{ height: type.dayName.line }}
            >
              {d.name}
            </T>
            {d.on ? (
              <View
                style={{
                  width: 5,
                  height: 5,
                  marginTop: 5,
                  borderRadius: radius.pill,
                  backgroundColor: on.onPanel,
                }}
              />
            ) : null}
          </View>
        </Pressable>
      ))}
    </View>
  );
}
