import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// STEP 1.03 who is signed in
// import { GreetingRow } from '@/features/cargohome/components/greeting-row';
// STEP 1.01 the warm wash behind it all
// import { HeaderWash } from '@/features/cargohome/components/header-wash';
// STEP 1.30 everywhere else the app goes
// import { HomeTabBar } from '@/features/cargohome/components/home-tab-bar';
// STEP 1.08 a way to find a consignment
// import { SearchField } from '@/features/cargohome/components/search-field';
// STEP 1.20 the ones before it
// import { ShipmentCard } from '@/features/cargohome/components/shipment-card';
import { T } from '@/features/cargohome/components/text';
// STEP 1.10 the one in flight
// import { TrackingCard } from '@/features/cargohome/components/tracking-card';
import {
  ACTIVE_TAB,
  RECENT,
  SEARCH_PLACEHOLDER,
  SECTIONS,
  TRACKING,
  USER,
} from '@/features/cargohome/data/home';
import { HOME_GAP, HOME_SCROLL_PAD, MARGIN } from '@/features/cargohome/layout';
import { cg } from '@/features/cargohome/theme';
import { useInsets } from '@/features/cargohome/use-insets';

/**
 * Cargo — home.
 *
 * Assembly only: the wash behind the header, then the greeting, the search
 * field, the consignment being tracked, the recent ones, and the tab bar.
 */
export default function CargoHome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: cg.page }}>
      <StatusBar style="dark" />

      {/* STEP 1.02 lay the wash down first
      <HeaderWash />
      */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + 8,
          paddingHorizontal: MARGIN,
          paddingBottom: HOME_SCROLL_PAD + insets.bottom,
          gap: HOME_GAP,
        }}
      >
        {/* STEP 1.04 say hello
        <GreetingRow greeting={USER.greeting} location={USER.location} avatar={USER.avatar} />
        */}

        {/* STEP 1.09 and give them somewhere to search
        <SearchField placeholder={SEARCH_PLACEHOLDER} />
        */}

        {/* STEP 1.11 the consignment in flight
        <TrackingCard
          caption={TRACKING.caption}
          code={TRACKING.code}
          locationLabel={TRACKING.locationLabel}
          location={TRACKING.location}
          statusLabel={TRACKING.statusLabel}
          status={TRACKING.status}
          badge={TRACKING.badge}
          progress={TRACKING.progress}
        />
        */}

        <View style={{ gap: 12 }}>
          {/* STEP 1.19 name what came before
          <T variant="section" color={cg.ink}>
            {SECTIONS.recent}
          </T>
          */}

          {/* STEP 1.21 and list them
          {RECENT.map((s) => (
            <ShipmentCard key={s.id} shipment={s} />
          ))}
          */}
        </View>
      </ScrollView>

      {/* STEP 1.31 float the bar over the foot
      <HomeTabBar active={ACTIVE_TAB} bottomInset={insets.bottom} />
      */}
    </View>
  );
}
