import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

import { AppBar } from '@/features/sajistats/components/app-bar';
import { HistorySheet } from '@/features/sajistats/components/history-sheet';
import { LineChart } from '@/features/sajistats/components/line-chart';
import { PeriodTabs } from '@/features/sajistats/components/period-tabs';
import { T } from '@/features/sajistats/components/text';
import { periods, summary } from '@/features/sajistats/data/stats';
import {
  CHART_TOP,
  HEADER_TOP,
  MARGIN,
  SHEET_TOP,
  TABS_TOP,
  TOTAL_TOP,
} from '@/features/sajistats/layout';
import { sj } from '@/features/sajistats/theme';
import { useInsets } from '@/features/sajistats/use-insets';

/**
 * Sajibur — Statistic.
 *
 * Assembly only: a header, the four periods, what the period cost, the shape
 * of it, and everything it was made of.
 *
 * The screen does not scroll. Everything above the sheet is a fixed number of
 * dp and the sheet takes the rest with `flex: 1`, so the history scrolls
 * inside it while the chart and the total stay put — which is the whole reason
 * a screen like this uses a sheet.
 *
 * The one piece of state is which period is selected, and it lives here rather
 * than in the tabs: the tabs are what change it, but what it changes is the
 * chart and the total below them.
 */
export default function SajiStats() {
  const insets = useInsets();
  const [period, setPeriod] = useState<string>(periods[1]);

  return (
    <View style={{ flex: 1, backgroundColor: sj.canvas }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: insets.top + HEADER_TOP, paddingHorizontal: MARGIN }}>
        <AppBar title={summary.title} />

        <View style={{ marginTop: TABS_TOP }}>
          <PeriodTabs items={periods} active={period} onSelect={setPeriod} />
        </View>

        <View style={{ marginTop: TOTAL_TOP, alignItems: 'center' }}>
          <T variant="caption" color={sj.onDarkMuted}>
            {summary.caption}
          </T>
          <T variant="total" color={sj.onDark}>
            {summary.total}
          </T>
        </View>

        <View style={{ marginTop: CHART_TOP }}>
          <LineChart />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: SHEET_TOP }}>
        <HistorySheet />
      </View>
    </View>
  );
}
