import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 a court to book
// import { BookBar } from '@/features/volleyhome/components/book-bar';
// STEP 1.01 the brand
// import { BrandHead } from '@/features/volleyhome/components/brand-head';
// STEP 1.26 where else it goes
// import { Dock } from '@/features/volleyhome/components/dock';
// STEP 1.21 and what is on soon
// import { EventRail, UpcomingHead } from '@/features/volleyhome/components/event-rail';
// STEP 1.05 the event it wants you in
// import { HeroCard } from '@/features/volleyhome/components/hero-card';
// STEP 1.12 what the app is for
// import { QuickTiles } from '@/features/volleyhome/components/quick-tiles';
import { MARGIN } from '@/features/volleyhome/layout';
import { vl } from '@/features/volleyhome/theme';
import { useInsets } from '@/features/volleyhome/use-insets';

/**
 * Volley - the home.
 *
 * Assembly only: the brand, the event the app wants you in, the four things
 * it is for, a court to book, what is on soon, and where else it goes.
 *
 * The event rail takes `flex: 1`, so it grows into whatever the phone can
 * spare and the dock sits on the bottom inset - the screen has no band of
 * empty white at the foot.
 */
export default function VolleyhomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: vl.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="dark" />

{/* STEP 1.02 at the top
      <BrandHead />
*/}

{/* STEP 1.06 a hero card
      <HeroCard onJoin={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.13 four tiles
      <QuickTiles onPress={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.19 a green bar
      <BookBar onBook={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.22 a heading
      <UpcomingHead onSeeAll={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.23 a rail
      <EventRail onPress={() => router.push('/volleyevent')} />
*/}

{/* STEP 1.27 and the foot
      <Dock active="home" onSelect={(id) => id === 'rank' && router.push('/volleyrank')} />
*/}
    </View>
  );
}
