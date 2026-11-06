import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import category list
// import { CategoryList } from '@/features/clovestats/components/category-list';
// STEP 1.02 import dock
// import { Dock } from '@/features/clovestats/components/dock';
// STEP 1.03 import expense chart
// import { ExpenseChart } from '@/features/clovestats/components/expense-chart';
// STEP 1.04 import expense head
// import { ExpenseHead } from '@/features/clovestats/components/expense-head';
// STEP 1.05 import spend card
// import { SpendCard } from '@/features/clovestats/components/spend-card';
// STEP 1.06 import text
// import { T } from '@/features/clovestats/components/text';
import { categories, copy } from '@/features/clovestats/data/stats';
import {
  GAP_CARD_EXPENSE,
  GAP_CHART_RULE,
  GAP_EXPENSE_CHART,
  GAP_TITLE_CARD,
  MARGIN,
  PAD_TOP,
  TITLE_H,
  useCloveStatsLayout,
} from '@/features/clovestats/layout';
import { ct, type } from '@/features/clovestats/theme';
import { useInsets } from '@/features/clovestats/use-insets';

/**
 * Clove — analytics.
 *
 * Assembly only: the title, this week at a glance, the month's outgoings as a
 * curve, and where they went.
 *
 * Nothing here is centred in a flexible band and nothing is in a scroller.
 * The category rows take their height from what is left between the chart and
 * the dock, which is what keeps the last row on the dock rather than halfway
 * up to it.
 */
export default function ClovestatsScreen() {
  const insets = useInsets();
  const { rowH, chartW, chartH } = useCloveStatsLayout(insets, categories.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.07 title
        <T variant="title" color={ct.ink} style={{ height: TITLE_H, textAlign: 'center' }}>
          {copy.title}
        </T>
        */}

        {/* STEP 1.08 spend card
        <View style={{ marginTop: GAP_TITLE_CARD }}>
          <SpendCard />
        </View>
        */}

        {/* STEP 1.09 expense head
        <View style={{ marginTop: GAP_CARD_EXPENSE }}>
          <ExpenseHead />
        </View>
        */}

        {/* STEP 1.10 expense chart
        <View style={{ marginTop: GAP_EXPENSE_CHART }}>
          <ExpenseChart width={chartW} height={chartH} />
        </View>
        */}

        {/* STEP 1.11 view
        <View style={{ marginTop: GAP_CHART_RULE, height: 1, backgroundColor: ct.hairline }} />
        */}

        {/* STEP 1.12 category list
        <CategoryList rowH={rowH} />
        */}
      </View>

      <View style={{ flex: 1 }} />

      {/* STEP 1.13 dock
      <Dock active={1} bottom={insets.bottom} />
      */}
      {/* STEP 1.14 a stray gap under it | FIX 1.15 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
