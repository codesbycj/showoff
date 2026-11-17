import { View } from 'react-native';
import {
  average,
  avatar,
  followingTitle,
  follows,
  headline,
  months,
  pct,
  peak,
  rings,
  today,
} from '../data/day';
import { ct } from '../theme';
import { T } from './text';

import { ChartProps } from './_day-parts-shared';

/**
 * The month bars.
 *
 * **The plot is scaled to the data and the marker is the real mean** (R9). A
 * nice-tick loop that stops at `max` leaves bars taller than its own axis, so
 * the peak is padded; and the average line is `average()`, not a figure typed
 * beside the chart as the board's is.
 *
 * **Survives an empty `months`** (I7): `peak()` returns 1 rather than
 * `-Infinity`, so no bar height becomes `NaN`.
 */
export function MonthChart({ margin, height, axisH }: ChartProps) {
  const plotH = height - axisH;
  // Bracket the data, but only just: at 1.18 the tallest bar left 70dp of
  // empty canvas above it, which `audit.js` reports as GAP and R1 warns on.
  const top = peak() * 1.06;
  const avgY = plotH - (average() / Math.max(top, 1)) * plotH;

  return (
    <View style={{ marginHorizontal: margin, height }}>
      {/* STEP 1.15 view
      <View style={{ height: plotH, flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        {months.map((m) => {
          const h = Math.max((m.value / Math.max(top, 1)) * plotH, 4);
          return (
            <View
              key={m.id}
              style={{
                flex: 1,
                height: h,
                borderRadius: 10,
                backgroundColor: m.active ? ct.accent : 'rgba(255,255,255,0.72)',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 6,
              }}
            >
              {m.active ? <T variant="barValue">{m.value.toFixed(1)}</T> : null}
            </View>
          );
        })}
      </View>
      */}

      {/* STEP 1.16 the next block

      */}
      {/* STEP 1.17 view
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: Math.max(avgY - 9, 0),
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}
        pointerEvents="none"
      >
        <View
          style={{
            paddingHorizontal: 8,
            height: 18,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.dark,
          }}
        >
          <T variant="avgPill">{`Avg ${pct(average())}`}</T>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(28,23,20,0.25)' }} />
      </View>
      */}

      {/* STEP 1.18 label
      <View style={{ height: axisH, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {months.map((m) => (
          <View key={m.id} style={{ flex: 1, alignItems: 'center' }}>
            <T variant="barLabel">{m.label}</T>
          </View>
        ))}
      </View>
      */}
    </View>
  );
}
