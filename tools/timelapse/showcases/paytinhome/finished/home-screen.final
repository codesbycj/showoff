import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import { ActionRow } from '@/features/paytinhome/components/action-row';
import { ActivityList } from '@/features/paytinhome/components/activity-list';
import { BalanceCard } from '@/features/paytinhome/components/balance-card';
import { BudgetPill } from '@/features/paytinhome/components/budget-pill';
import { FloatingDock } from '@/features/paytinhome/components/floating-dock';
import { QuickSend } from '@/features/paytinhome/components/quick-send';
import { SectionHead } from '@/features/paytinhome/components/section-head';
import { TopBar } from '@/features/paytinhome/components/top-bar';
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
          <TopBar name={account.name} greeting={account.greeting} />
        </View>

        <View style={{ marginTop: CARD_TOP, paddingHorizontal: MARGIN }}>
          <BalanceCard
            brand={account.brand}
            balanceLabel={account.balanceLabel}
            balance={account.balance}
            number={account.number}
            name={account.name}
            expiryLabel={account.expiryLabel}
            expiry={account.expiry}
          />
        </View>

        <View
          style={{
            position: 'absolute',
            right: MARGIN,
            top: insets.top + HEADER_TOP + 40 + CARD_TOP - BUDGET_RISE,
          }}
        >
          <BudgetPill label={account.budget} />
        </View>

        <View style={{ marginTop: TILES_TOP, paddingHorizontal: MARGIN }}>
          <ActionRow />
        </View>

        <View style={{ marginTop: BLOCK_TOP, paddingHorizontal: MARGIN }}>
          <SectionHead title="Quick Send" action="See all" />
        </View>

        <View style={{ marginTop: HEAD_GAP }}>
          <QuickSend />
        </View>

        <View style={{ marginTop: BLOCK_TOP, paddingHorizontal: MARGIN }}>
          <SectionHead title="Recent Activity" action="See all" />
          <ActivityList />
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
        <FloatingDock active="scan" />
      </View>
    </View>
  );
}
