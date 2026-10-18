import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/paytinstats/components/app-bar';
// STEP 1.10 what came in
// import { EarningCard } from '@/features/paytinstats/components/earning-card';
// STEP 1.26 six months of it
// import { OverviewCard } from '@/features/paytinstats/components/overview-card';
// STEP 1.06 how far back to look
// import { PeriodPills } from '@/features/paytinstats/components/period-pills';
// STEP 1.24 name the rest
// import { SectionHead } from '@/features/paytinstats/components/section-head';
// STEP 1.18 and what went out
// import { SpendingCard } from '@/features/paytinstats/components/spending-card';
import { periods } from '@/features/paytinstats/data/stats';
import {
  BLOCK_TOP,
  CARD_GAP,
  CARD_RATIO,
  CARDS_TOP,
  HEAD_GAP,
  HEADER_TOP,
  MARGIN,
  PILLS_TOP,
} from '@/features/paytinstats/layout';
import { ps } from '@/features/paytinstats/theme';
import { useInsets } from '@/features/paytinstats/use-insets';

/**
 * Paytin — statistics.
 *
 * Assembly only: a header, the four periods, the month in two cards, and the
 * six-month chart under them.
 *
 * The pair of stat cards is given its height *here* rather than by either
 * card, because neither can know the other's content and a pair that is not
 * the same height reads as a mistake. The ratio is of the pair's own width, so
 * the two stay square-ish on any phone.
 *
 * The one piece of state is which period is selected, and it lives here rather
 * than in the pills: the pills are what change it, but what it changes is the
 * whole screen's business.
 */
export default function PaytinStats() {
  const insets = useInsets();
  const { width } = useWindowDimensions();
  const [period, setPeriod] = useState<string>(periods[2]);

  /** Both cards are this tall, which is a ratio of the pair's own width. */
  const cardHeight = ((width - MARGIN * 2 - CARD_GAP) / 2) * CARD_RATIO * 1.28;

  return (
    <View style={{ flex: 1, backgroundColor: ps.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + 20,
        }}
      >
        {/* STEP 1.02 across the top
        <AppBar title="Statistics" onBack={() => router.back()} />
        */}

        {/* STEP 1.07 under the header
        <View style={{ marginTop: PILLS_TOP }}>
          <PeriodPills items={periods} active={period} onSelect={setPeriod} />
        </View>
        */}

        <View style={{ marginTop: CARDS_TOP, flexDirection: 'row', gap: CARD_GAP }}>
          {/* STEP 1.11 on the left
          <EarningCard height={cardHeight} />
          */}
          {/* STEP 1.19 beside it
          <SpendingCard height={cardHeight} />
          */}
        </View>

        <View style={{ marginTop: BLOCK_TOP }}>
          {/* STEP 1.25 Overview
          <SectionHead title="Overview" />
          */}
        </View>

        <View style={{ marginTop: HEAD_GAP }}>
          {/* STEP 1.27 under the heading
          <OverviewCard />
          */}
        </View>
      </ScrollView>
    </View>
  );
}
