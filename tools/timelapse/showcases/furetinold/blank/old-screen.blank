import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.06 what is in the wallet
// import { BalanceCard } from '@/features/furetinold/components/balance-card';
// STEP 1.01 who is signed in
// import { Header } from '@/features/furetinold/components/header';
// STEP 1.11 what it can do
// import { ServicePanel } from '@/features/furetinold/components/service-panel';
// STEP 1.21 the way around
// import { TabBar } from '@/features/furetinold/components/tab-bar';
import { T } from '@/features/furetinold/components/text';
// STEP 1.16 one row each
// import { TransactionRow } from '@/features/furetinold/components/transaction-row';
import { crypto, rows, section, services } from '@/features/furetinold/data/wallet';
import {
  CARD_TOP,
  HEADER_TOP,
  MARGIN,
  PANEL_TOP,
  ROW_GAP,
  SCROLL_TAIL,
  SECTION_TOP,
} from '@/features/furetinold/layout';
import { fu } from '@/features/furetinold/theme';
import { useInsets } from '@/features/furetinold/use-insets';

/**
 * Furetin — the wallet home, as it stands.
 *
 * Assembly only: who is here, what is in the wallet, what can be done with it,
 * and what was done lately — over a scroll, with the tab bar pinned below.
 *
 * The two service panels are the same component given different data. They
 * look different in the reference only because one row carries three items and
 * the other six, which is the panel's own arithmetic rather than a second
 * component.
 */
export default function FuretinOld() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: fu.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 across the top
        <Header />
        */}

        <View style={{ marginTop: CARD_TOP }}>
          {/* STEP 1.07 under the header
          <BalanceCard />
          */}
        </View>

        <View style={{ marginTop: PANEL_TOP }}>
          {/* STEP 1.12 the crypto side
          <ServicePanel items={crypto} />
          */}
        </View>

        <View style={{ marginTop: PANEL_TOP }}>
          {/* STEP 1.13 and the bills side
          <ServicePanel items={services} />
          */}
        </View>

        {/* STEP 1.15 what happened lately
        <View
          style={{
            marginTop: SECTION_TOP,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <T variant="section" color={fu.ink}>
            {section.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={section.more}>
            <T variant="more" color={fu.muted}>
              {section.more}
            </T>
          </Pressable>
        </View>
        */}

        <View style={{ marginTop: 10, gap: ROW_GAP }}>
          {/* STEP 1.17 down the page
          {rows.map((r) => (
            <TransactionRow key={r.key} row={r} />
          ))}
          */}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
        {/* STEP 1.22 along the bottom
        <TabBar />
        */}
      </View>
    </View>
  );
}
