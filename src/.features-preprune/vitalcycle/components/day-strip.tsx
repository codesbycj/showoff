import { Pressable, View } from 'react-native';

import { chips, dayUnit, days, headline, logTitle, notes, promo, ranges } from '../data/cycle';
import { ct } from '../theme';
import { T } from './text';

import { StripProps } from './_cycle-parts-shared';

/**
 * The week.
 *
 * **This is the block that absorbs the screen's slack** (see `layout.ts`): the
 * columns' height comes from the layout as the remainder, which is the kind of
 * block I3 says to grow — unlike padding, which it forbids.
 *
 * The selected day's figure carries its unit. The board prints "2.5" with no
 * unit anywhere on the screen (R5: a unit, a count, a state).
 */
export function DayStrip({ margin, height, disc, gap }: StripProps) {
  const colH = height - 22;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {days.map((d) => (
        <Pressable
          key={d.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!d.today }}
          accessibilityLabel={d.litres ? `${d.label}, ${d.litres} ${dayUnit}` : d.label}
          style={{ flex: 1 }}
        >
          {({ pressed }) => (
            <View style={{ flex: 1, alignItems: 'center', opacity: pressed ? 0.75 : 1 }}>
              <T variant="dayLabel">{d.label}</T>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginTop: 4,
                  borderRadius: disc / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: d.today ? 'transparent' : 'rgba(255,255,255,0.55)',
                }}
              >
                {d.today ? (
                  <View
                    style={{
                      width: disc,
                      height: Math.max(disc, colH * 0.6),
                      borderRadius: disc / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: ct.accentDeep,
                    }}
                  >
                    <T variant="dayOn">{d.label}</T>
                  </View>
                ) : null}
              </View>
              <View style={{ height: 16, justifyContent: 'center' }}>
                {d.litres ? (
                  <T variant="dayValue">{`${d.litres}${dayUnit}`}</T>
                ) : null}
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}
