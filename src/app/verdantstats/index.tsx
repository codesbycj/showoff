import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/verdantstats/components/app-bar';
// STEP 1.15 the month as a ring
// import { DonutChart } from '@/features/verdantstats/components/donut-chart';
// STEP 1.27 one sentence about all that
// import { InsightCard } from '@/features/verdantstats/components/insight-card';
// STEP 1.21 the key to it
// import { Legend } from '@/features/verdantstats/components/legend';
// STEP 1.13 and say which month
// import { PeriodPicker } from '@/features/verdantstats/components/period-picker';
// STEP 1.12 name a section
// import { SectionHead } from '@/features/verdantstats/components/section-head';
// STEP 1.08 four views of the month
// import { Segmented } from '@/features/verdantstats/components/segmented';
// STEP 1.42 somewhere to go next
// import { TabDock } from '@/features/verdantstats/components/tab-dock';
// STEP 1.34 six months of it
// import { TrendChart } from '@/features/verdantstats/components/trend-chart';
import {
  breakdown,
  insight,
  period,
  segments,
  spend,
} from '@/features/verdantstats/data/analytics';
import {
  BLOCK_TOP,
  DOCK_HEIGHT,
  HEAD_GAP,
  HEADER_TOP,
  INSIGHT_TOP,
  LEGEND_TOP,
  MARGIN,
  SEG_TOP,
  useCharts,
} from '@/features/verdantstats/layout';
import { vs } from '@/features/verdantstats/theme';
import { useInsets } from '@/features/verdantstats/use-insets';

/**
 * Verdant — Analytics.
 *
 * Assembly only: a header, the four views of the month, the spending split as
 * a ring and a key, one sentence about it, the six-month trend, and a dock
 * floating over the lot.
 *
 * The one piece of state is which view is selected, and it lives here rather
 * than in the segmented control: the control is what changes it, but what it
 * changes is the whole screen's business, and a component that owns its own
 * state cannot be driven from anywhere else.
 */
export default function VerdantAnalytics() {
  const insets = useInsets();
  const { donut } = useCharts();
  const [view, setView] = useState<string>(segments[0]);

  return (
    <View style={{ flex: 1, backgroundColor: vs.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: DOCK_HEIGHT + insets.bottom + 16,
        }}
      >
        {/* STEP 1.02 across the top
        <AppBar title="Analytics" onBack={() => router.back()} />
        */}

        {/* STEP 1.09 under the header
        <View style={{ marginTop: SEG_TOP }}>
          <Segmented items={segments} active={view} onSelect={setView} />
        </View>
        */}

        <View style={{ marginTop: BLOCK_TOP }}>
          {/* STEP 1.14 Your Spending, Aug 2026
          <SectionHead title="Your Spending">
            <PeriodPicker label={period.label} />
          </SectionHead>
          */}
        </View>

        {/* STEP 1.16 centred under the heading
        <View style={{ marginTop: HEAD_GAP, alignItems: 'center' }}>
          <DonutChart
            size={donut}
            segments={breakdown}
            value={spend.total}
            caption={spend.caption}
          />
        </View>
        */}

        {/* STEP 1.22 two columns under the ring
        <View style={{ marginTop: LEGEND_TOP }}>
          <Legend />
        </View>
        */}

        {/* STEP 1.28 under the key
        <View style={{ marginTop: INSIGHT_TOP }}>
          <InsightCard title={insight.title} body={insight.body} />
        </View>
        */}

        <View style={{ marginTop: BLOCK_TOP }}>
          {/* STEP 1.33 Spending Trend
          <SectionHead title="Spending Trend" />
          */}
        </View>

        <View style={{ marginTop: HEAD_GAP }}>
          {/* STEP 1.35 under its heading
          <TrendChart />
          */}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        {/* STEP 1.43 floating over the lot
        <TabDock active="analytics" bottomInset={insets.bottom} />
        */}
      </View>
    </View>
  );
}
