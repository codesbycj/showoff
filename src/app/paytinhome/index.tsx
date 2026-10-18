import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.19 four things to do
// import { ActionRow } from '@/features/paytinhome/components/action-row';
// STEP 1.29 where it went
// import { ActivityList } from '@/features/paytinhome/components/activity-list';
// STEP 1.10 what they have
// import { BalanceCard } from '@/features/paytinhome/components/balance-card';
// STEP 1.17 and a plan for it
// import { BudgetPill } from '@/features/paytinhome/components/budget-pill';
// STEP 1.35 somewhere to go next
// import { FloatingDock } from '@/features/paytinhome/components/floating-dock';
// STEP 1.26 the people you send to
// import { QuickSend } from '@/features/paytinhome/components/quick-send';
// STEP 1.24 name a section
// import { SectionHead } from '@/features/paytinhome/components/section-head';
// STEP 1.01 who is looking
// import { TopBar } from '@/features/paytinhome/components/top-bar';
import { account } from '@/features/paytinhome/data/home';
import {
  BLOCK_TOP,
  BUDGET_RISE,
  CARD_TOP,
  DOCK_BOTTOM,
  DOCK_HEIGHT,
  HEAD_GAP,
  HEADER_TOP,
  MARGIN,
  TILES_TOP,
} from '@/features/paytinhome/layout';
import { ph } from '@/features/paytinhome/theme';
import { useInsets } from '@/features/paytinhome/use-insets';

/**
 * Paytin — home.
 *
 * Assembly only: who you are, what you have, what you can do with it, who you
 * send it to, where it went, and a dock over the lot.
 *
 * The budget pill is positioned by this screen rather than by the card,
 * because it belongs to neither on its own — it sits half over the card's top
 * edge, and a child hanging over a rounded parent is exactly what Android
 * clips.
 *
 * The quick-send row is the one block that escapes the page margin: it has to
 * reach the right-hand edge to read as a scroll.
 *
 * Every handler is empty on purpose. The other screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made *here*.
 */
export default function PaytinHome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ph.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: DOCK_HEIGHT + DOCK_BOTTOM + insets.bottom + 12,
        }}
      >
        <View style={{ paddingHorizontal: MARGIN }}>
          {/* STEP 1.02 at the top
          <TopBar name={account.name} greeting={account.greeting} />
          */}
        </View>

        <View style={{ marginTop: CARD_TOP, paddingHorizontal: MARGIN }}>
          {/* STEP 1.11 under the header
          <BalanceCard
            brand={account.brand}
            balanceLabel={account.balanceLabel}
            balance={account.balance}
            number={account.number}
            name={account.name}
            expiryLabel={account.expiryLabel}
            expiry={account.expiry}
          />
          */}
        </View>

        <View
          style={{
            position: 'absolute',
            right: MARGIN,
            top: insets.top + HEADER_TOP + 40 + CARD_TOP - BUDGET_RISE,
          }}
        >
          {/* STEP 1.18 half over the card
          <BudgetPill label={account.budget} />
          */}
        </View>

        {/* STEP 1.20 under the card
        <View style={{ marginTop: TILES_TOP, paddingHorizontal: MARGIN }}>
          <ActionRow />
        </View>
        */}

        <View style={{ marginTop: BLOCK_TOP, paddingHorizontal: MARGIN }}>
          {/* STEP 1.25 Quick Send
          <SectionHead title="Quick Send" action="See all" />
          */}
        </View>

        <View style={{ marginTop: HEAD_GAP }}>
          {/* STEP 1.27 running off the edge
          <QuickSend />
          */}
        </View>

        <View style={{ marginTop: BLOCK_TOP, paddingHorizontal: MARGIN }}>
          {/* STEP 1.28 Recent Activity
          <SectionHead title="Recent Activity" action="See all" />
          */}
          {/* STEP 1.30 under the heading
          <ActivityList />
          */}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + DOCK_BOTTOM,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        {/* STEP 1.36 floating over the lot
        <FloatingDock active="scan" />
        */}
      </View>
    </View>
  );
}
