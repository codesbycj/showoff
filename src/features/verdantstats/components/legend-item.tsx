import { View } from 'react-native';

import { LEGEND_DOT, LEGEND_GAP, LEGEND_ROW } from '../layout';
import { radius, vs } from '../theme';
import { T } from './text';

/**
 * One line of the key: a dot, what it is, and what share of the month it took.
 *
 * The percentage is pushed to the right of the column by a `flex: 1` spacer
 * rather than by a fixed label width, so "Bills & Utilities" and "Transport"
 * both leave their figures in the same place without either being truncated.
 */
export function LegendItem({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <View style={{ height: LEGEND_ROW, flexDirection: 'row', alignItems: 'center' }}>
      {/* STEP 1.23 the colour it is drawn in
      <View
        style={{
          width: LEGEND_DOT,
          height: LEGEND_DOT,
          borderRadius: radius.full,
          backgroundColor: color,
        }}
      />
      */}
      {/* STEP 1.24 what it is
      <T variant="legend" color={vs.inkSoft} numberOfLines={1} style={{ marginLeft: LEGEND_GAP }}>
        {label}
      </T>
      */}
      <View style={{ flex: 1, minWidth: 8 }} />
      {/* STEP 1.25 and what share it took
      <T variant="legendValue" color={vs.inkSoft}>
        {`${pct}%`}
      </T>
      */}
    </View>
  );
}
