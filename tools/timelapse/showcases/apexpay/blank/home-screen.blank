import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

// STEP 1.01 the bar that never moves
// import { AppBar } from '@/features/apexpay/components/app-bar';
// STEP 1.14 the balance, and what you can do with it
// import { BalanceCard } from '@/features/apexpay/components/balance-card';
// STEP 1.30 three cards, one over another
// import { CardStack } from '@/features/apexpay/components/card-stack';
// STEP 1.08 who is looking at this
// import { GreetingRow } from '@/features/apexpay/components/greeting-row';
// STEP 1.26 something to call the stack
// import { SectionHead } from '@/features/apexpay/components/section-head';
// STEP 1.38 what is left this month
// import { SpendingLimit } from '@/features/apexpay/components/spending-limit';
// STEP 1.43 everywhere else the app goes
// import { TabDock } from '@/features/apexpay/components/tab-dock';
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

      {/* STEP 1.02 pin the bar to the top
      <View style={{ paddingTop: top, backgroundColor: ax.appBar }}>
        <AppBar />
      </View>
      */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingBottom: SCROLL_BOTTOM_PAD + insets.bottom,
          gap: SECTION_GAP,
        }}
      >
        {/* STEP 1.09 say good morning
        <GreetingRow name={USER.name} greeting={USER.greeting} />
        */}

        {/* STEP 1.15 drop the balance card in
        <BalanceCard />
        */}

        {/*
          The section wrapper stays uncommented and its two children are staged
          as separate blocks. One STEP block cannot be nested inside another:
          the inner block's closing marker would end the outer one early and
          the file would stop parsing. Anything that fills in over two steps
          has to sit side by side rather than one inside the other.
        */}
        <View style={{ gap: 14 }}>
          {/* STEP 1.27 the heading over the stack
          <SectionHead title={CARDS_SECTION.title} action={CARDS_SECTION.action} />
          */}

          {/* STEP 1.31 and the cards under it
          <CardStack />
          */}
        </View>

        {/* STEP 1.39 what is left to spend
        <SpendingLimit />
        */}
      </ScrollView>

      {/* STEP 1.44 float the dock over it all
      <TabDock bottomInset={insets.bottom} />
      */}
    </View>
  );
}
