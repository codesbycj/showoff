import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.05 import the destination chips
// import { CountryChips } from '@/features/voyago/components/country-chips';
// STEP 1.12 import the Dubai hero
// import { FeaturedCard } from '@/features/voyago/components/featured-card';
// STEP 1.01 import the masthead
// import { HomeTitle } from '@/features/voyago/components/home-title';
// STEP 1.17 import the hotel teaser
// import { HotelPreviewCard } from '@/features/voyago/components/hotel-preview-card';
// STEP 1.03 import the search capsule
// import { SearchField } from '@/features/voyago/components/search-field';
// STEP 1.10 import the section head
// import { SectionHead } from '@/features/voyago/components/section-head';
// STEP 1.19 import the floating nav
// import { TabBar } from '@/features/voyago/components/tab-bar';
import {
  CHIPS,
  FEATURED,
  HOTEL_PREVIEW,
  NAV,
  SEARCH_PLACEHOLDER,
  SECTIONS,
} from '@/features/voyago/data/home';
import { SP, voyagoTheme, vy } from '@/features/voyago/theme';

/**
 * Screen 1 — the discovery feed.
 *
 * The export draws its own iOS status bar and home indicator. Neither is
 * rebuilt: the device supplies both, and the safe-area insets are what reserve
 * room for them.
 *
 * Every destination this screen offers is wired here rather than inside a
 * component — "View All" and the hotel teaser both go to the hotels list, and
 * the Tickets tab goes to the boarding pass.
 */
export default function VoyagoHome() {
  const insets = useSafeAreaInsets();
  const [country, setCountry] = useState<string>('uae');

  return (
    <View style={[voyagoTheme, { flex: 1, backgroundColor: vy.canvas }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + SP.md,
          paddingHorizontal: SP.gutterHome,
          paddingBottom: insets.bottom + 96,
          gap: SP.lg,
        }}
      >
{/* STEP 1.02 the masthead
        <HomeTitle />
*/}

{/* STEP 1.04 where would you like to go?
        <SearchField placeholder={SEARCH_PLACEHOLDER} />
*/}

{/* STEP 1.06 room for the destinations
        <CountryChips chips={CHIPS} selected={country} onSelect={setCountry} />
*/}

{/* STEP 1.11 name the nearby rail
        <SectionHead
          title={SECTIONS.nearby.title}
          action={SECTIONS.nearby.action}
          onAction={() => router.push('/voyago/hotels')}
        />
*/}

{/* STEP 1.13 the Dubai card
        <FeaturedCard
          country={FEATURED.country}
          city={FEATURED.city}
          priceLabel={FEATURED.priceLabel}
          price={FEATURED.price}
          image={FEATURED.image}
        />
*/}

{/* STEP 1.14 name the hotels rail | FIX 1.16 the second head is a size down, not up
        <SectionHead title={SECTIONS.hotels.title} action={SECTIONS.hotels.action} size={22} />
*/}

{/* STEP 1.15 name the hotels rail, a size down
        <SectionHead title={SECTIONS.hotels.title} action={SECTIONS.hotels.action} size={14} />
*/}

{/* STEP 1.18 the hotel teaser
        <HotelPreviewCard
          name={HOTEL_PREVIEW.name}
          price={HOTEL_PREVIEW.price}
          per={HOTEL_PREVIEW.per}
          rating={HOTEL_PREVIEW.rating}
          image={HOTEL_PREVIEW.image}
          onPress={() => router.push('/voyago/hotels')}
        />
*/}
      </ScrollView>

{/* STEP 1.23 pin the nav | FIX 1.25 Schedule is the tab we are on, not Tickets
      <TabBar
        items={NAV}
        active="tickets"
        inset={insets.bottom}
        onSelect={(key) => {
          if (key === 'tickets') router.push('/voyago/ticket');
        }}
      />
*/}

{/* STEP 1.24 pin the nav, on the right tab
      <TabBar
        items={NAV}
        active="schedule"
        inset={insets.bottom}
        onSelect={(key) => {
          if (key === 'tickets') router.push('/voyago/ticket');
        }}
      />
*/}
    </View>
  );
}
