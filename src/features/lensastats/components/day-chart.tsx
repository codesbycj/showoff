import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { days, gridlines, goal, todayIndex } from '../data/start';
import { AXIS_W, BAR_W, CHART_MIN, CHART_TOP } from '../layout';
import { ls, radius, type } from '../theme';
import { T } from './text';

/**
 * Eight days of intake.
 *
 * **The axis brackets the data.** The top gridline is the target, which is
 * above every bar, so nothing stands taller than the scale that is supposed
 * to measure it — a nice-tick loop that stops at the maximum produces exactly
 * that defect.
 *
 * The plot height is measured with `onLayout` rather than assumed: the chart
 * takes whatever the phone has above the two cards, and a fixed number would
 * leave a band of empty canvas on a tall one and clip the bars on a short.
 *
 * Bars are Views, not an Svg. There is nothing here an Svg would draw better
 * than a rounded rectangle, and a View answers a press.
 */
export function DayChart({ onPick }: { onPick?: (i: number) => void }) {
  const [box, setBox] = useState(0);
  const plot = Math.max(90, box - type.axis.line - 8);

  return (
    <View style={{ flex: 1, minHeight: CHART_MIN, marginTop: CHART_TOP, flexDirection: 'row' }}>
      <View style={{ flex: 1 }} onLayout={(e) => setBox(e.nativeEvent.layout.height)}>
        <View style={{ height: plot, flexDirection: 'row', alignItems: 'flex-end' }}>
{/* STEP 1.08 the rules it is read off
          {gridlines.map((g) => (
            <View
              key={g}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: (g / goal) * plot - 1,
                height: 1,
                backgroundColor: ls.hairline,
              }}
            />
          ))}
*/}

{/* STEP 1.09 the days
          {days.map((d, i) => (
            <Pressable
              key={d.label + d.kcal}
              onPress={() => onPick?.(i)}
              style={{ flex: 1, alignItems: 'center' }}
              accessibilityRole="button"
              accessibilityLabel={`${d.label}: ${d.kcal} kcal`}
            >
              <View style={{ flex: 1 }} />
              <View
                style={{
                  width: BAR_W,
                  height: Math.max(8, (d.kcal / goal) * plot),
                  borderRadius: radius.bar,
                  backgroundColor: i === todayIndex ? ls.limeDeep : ls.bar,
                }}
              />
            </Pressable>
          ))}
*/}
        </View>

{/* STEP 1.10 and which day each one is
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {days.map((d, i) => (
            <T
              key={d.label + d.kcal}
              variant={i === todayIndex ? 'axisOn' : 'axis'}
              color={i === todayIndex ? ls.ink : ls.faint}
              style={{ flex: 1, textAlign: 'center', height: type.axis.line }}
            >
              {d.label}
            </T>
          ))}
        </View>
*/}
      </View>

      <View style={{ width: AXIS_W, height: plot }}>
        {gridlines.map((g) => (
          <View
            key={g}
            style={{
              position: 'absolute',
              right: 0,
              bottom: (g / goal) * plot - type.axis.line / 2,
            }}
          >
            <T variant="axis" color={ls.faint} style={{ height: type.axis.line }}>
              {String(g)}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}
