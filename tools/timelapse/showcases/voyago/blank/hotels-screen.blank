import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.05 import the featured hotel
// import { FeaturedHotelCard } from '@/features/voyago/components/featured-hotel-card';
// STEP 2.01 import the header
// import { PageHeader } from '@/features/voyago/components/page-header';
// STEP 2.11 import the stacked card
// import { StackedHotelCard } from '@/features/voyago/components/stacked-hotel-card';
import { FEATURED_HOTEL, STACKED, TITLE } from '@/features/voyago/data/hotels';
import { SP, voyagoTheme, vy } from '@/features/voyago/theme';

/**
 * Screen 2 — recommended hotels.
 *
 * This screen does not scroll. The export gives the card stack
 * `flex-1 … justify-end`, so the whole group is anchored to the bottom of the
 * screen and the space left over opens up under the header — which is why the
 * reference has a large empty band in the middle. That is the design, not a
 * gap waiting to be filled.
 *
 * Picking a hotel goes on to the boarding pass, which is where booking one
 * ends up.
 */
export default function VoyagoHotels() {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        voyagoTheme,
        {
          flex: 1,
          backgroundColor: vy.canvas,
          paddingTop: insets.top + SP.xl,
          paddingHorizontal: SP.gutter,
          paddingBottom: insets.bottom + SP.sm,
        },
      ]}
    >
      <StatusBar style="dark" />

{/* STEP 2.02 the header | FIX 2.04 the long line is the first one, not the second
      <PageHeader
        line1={TITLE.line2}
        line2={TITLE.line1}
        accent={TITLE.accent}
        onBack={() => router.back()}
      />
*/}

{/* STEP 2.03 the header, the right way up
      <PageHeader
        line1={TITLE.line1}
        line2={TITLE.line2}
        accent={TITLE.accent}
        onBack={() => router.back()}
      />
*/}

      <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: SP.sm, paddingBottom: SP.sm }}>
{/* STEP 2.06 the hotel the screen is about
        <FeaturedHotelCard
          name={FEATURED_HOTEL.name}
          price={FEATURED_HOTEL.price}
          per={FEATURED_HOTEL.per}
          rating={FEATURED_HOTEL.rating}
          image={FEATURED_HOTEL.image}
          onPress={() => router.push('/voyago/ticket')}
        />
*/}

{/* STEP 2.12 room for the rest of them
        {STACKED.map((hotel, i) => (
          <StackedHotelCard
            key={hotel.key}
            name={hotel.name}
            tone={hotel.tone}
            depth={i + 1}
            last={i === STACKED.length - 1}
            onPress={() => router.push('/voyago/ticket')}
          />
        ))}
*/}
      </View>
    </View>
  );
}
