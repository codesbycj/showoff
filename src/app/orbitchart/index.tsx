import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.21 import activity sheet
// import { ActivitySheet } from '@/features/orbitchart/components/activity-sheet';
// STEP 1.06 import balance chart
// import { BalanceChart } from '@/features/orbitchart/components/balance-chart';
// STEP 1.01 import chart header
// import { ChartHeader } from '@/features/orbitchart/components/chart-header';
// STEP 1.17 import range tabs
// import { RangeTabs } from '@/features/orbitchart/components/range-tabs';
import { useLayout } from '@/features/orbitchart/layout';
import { ct } from '@/features/orbitchart/theme';

/**
 * Orbit — balance over time.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every number on the screen is computed from the series: the headline is its
 * last point, the marker reads the point it sits on, and the gridlines bracket
 * the data rather than stopping at its maximum (R9).
 */
export default function OrbitchartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 chart header
      <ChartHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.15 a stray gap above it | FIX 1.16 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.06 balance chart
      <View style={{ marginHorizontal: L.margin }}>
        <BalanceChart width={L.W - L.margin * 2} height={L.chart.h} />
      </View>
      */}

      <View style={{ height: L.gapChart }} />
      {/* STEP 1.17 range tabs
      <RangeTabs margin={L.margin} height={L.range.h} radius={L.range.radius} />
      */}

      <View style={{ height: L.gapRange }} />
      {/* STEP 1.29 a stray gap above it | FIX 1.30 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.21 activity sheet
      <ActivitySheet margin={L.margin} radius={L.sheet.radius} rowH={L.row.h} gap={L.row.gap} />
      */}
    </View>
  );
}
