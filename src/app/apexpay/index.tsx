import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AppBar } from '@/features/apexpay/components/app-bar';
import { BalanceCard } from '@/features/apexpay/components/balance-card';
import { CardStack } from '@/features/apexpay/components/card-stack';
import { GreetingRow } from '@/features/apexpay/components/greeting-row';
import { SectionHead } from '@/features/apexpay/components/section-head';
import { SpendingLimit } from '@/features/apexpay/components/spending-limit';
import { TabDock } from '@/features/apexpay/components/tab-dock';
import { CARDS_SECTION, USER } from '@/features/apexpay/data/home';
import { MARGIN, SCROLL_BOTTOM_PAD, SECTION_GAP, TOP_INSET } from '@/features/apexpay/layout';
import { ax } from '@/features/apexpay/theme';

/**
 * ApexPay — home.
 *
 * Assembly only: every band is a component, and the screen's whole job is to
 * stack them at the page margin with the section gap between.
 *
 * The app bar is outside the ScrollView because the export fixes it to the
 * top; the dock is outside it for the same reason and floats over the scroll.
 * `SCROLL_BOTTOM_PAD` is what keeps the last card clear of the dock, since a
 * floating bar cannot reserve its own space.
 */
export default function ApexPayHome() {
  const insets = useSafeAreaInsets();
  // The design's own inset, or the device's where that is larger.
  const top = Math.max(TOP_INSET, insets.top);

  return (
    <View style={{ flex: 1, backgroundColor: ax.canvas }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: top, backgroundColor: ax.appBar }}>
        <AppBar />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingBottom: SCROLL_BOTTOM_PAD + insets.bottom,
          gap: SECTION_GAP,
        }}
      >
        <GreetingRow name={USER.name} greeting={USER.greeting} />

        <BalanceCard />

        <View style={{ gap: 14 }}>
          <SectionHead title={CARDS_SECTION.title} action={CARDS_SECTION.action} />
          <CardStack />
        </View>

        <SpendingLimit />
      </ScrollView>

      <TabDock bottomInset={insets.bottom} />
    </View>
  );
}
