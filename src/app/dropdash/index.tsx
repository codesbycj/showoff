import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.23 what went out
// import { DeliveryRow } from '@/features/dropdash/components/delivery-row';
// STEP 1.06 a way to find anything
// import { SearchField } from '@/features/dropdash/components/search-field';
// STEP 1.15 name a section
// import { SectionHead } from '@/features/dropdash/components/section-head';
// STEP 1.09 the four figures
// import { StatGrid } from '@/features/dropdash/components/stat-grid';
// STEP 1.17 the state of it
// import { StockBar } from '@/features/dropdash/components/stock-bar';
// STEP 1.27 somewhere to go next
// import { TabBar } from '@/features/dropdash/components/tab-bar';
// STEP 1.01 who is on shift
// import { TopBar } from '@/features/dropdash/components/top-bar';
import { deliveries, search, stock } from '@/features/dropdash/data/dashboard';
import {
  BLOCK_TOP,
  DOCK_HEIGHT,
  HEAD_GAP,
  HEADER_TOP,
  MARGIN,
  SEARCH_TOP,
  TILES_TOP,
} from '@/features/dropdash/layout';
import { dd } from '@/features/dropdash/theme';
import { useInsets } from '@/features/dropdash/use-insets';

/**
 * A courier's dashboard.
 *
 * Assembly only: who is on shift, a way to find anything, the four figures
 * that matter, the state of the stock, what went out recently, and a bar at
 * the foot.
 *
 * The page scrolls under a bar that does not, which is why the scroll carries
 * the bar's height as bottom padding — without it the last delivery can never
 * be read.
 *
 * Every handler is empty on purpose. The map screen is its own showcase with
 * its own slug, so there is nothing to push to yet; what matters is that the
 * decision is made here.
 */
export default function DropDash() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: dd.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: DOCK_HEIGHT + insets.bottom + 16,
        }}
      >
        {/* STEP 1.02 at the top
        <TopBar />
        */}

        {/* STEP 1.07 under the header
        <View style={{ marginTop: SEARCH_TOP }}>
          <SearchField placeholder={search.placeholder} />
        </View>
        */}

        {/* STEP 1.10 two by two
        <View style={{ marginTop: TILES_TOP }}>
          <StatGrid />
        </View>
        */}

        <View style={{ marginTop: BLOCK_TOP }}>
          {/* STEP 1.16 Stock Overview
          <SectionHead title={stock.title} />
          */}
        </View>

        <View style={{ marginTop: HEAD_GAP }}>
          {/* STEP 1.18 in one bar
          <StockBar />
          */}
        </View>

        <View style={{ marginTop: BLOCK_TOP }}>
          {/* STEP 1.22 Recent Deliveries
          <SectionHead title={deliveries.title} action={deliveries.link} />
          */}
        </View>

        {/* STEP 1.24 under the heading
        <View style={{ marginTop: 4 }}>
          {deliveries.rows.map((row) => (
            <DeliveryRow key={row.key} title={row.title} meta={row.meta} />
          ))}
        </View>
        */}
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        {/* STEP 1.28 across the bottom
        <TabBar active="home" bottomInset={insets.bottom} />
        */}
      </View>
    </View>
  );
}
