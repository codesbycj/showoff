import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.09 import activity chips
// import { ActivityChips } from '@/features/fernhome/components/activity-chips';
// STEP 1.19 import dock
// import { Dock } from '@/features/fernhome/components/dock';
// STEP 1.05 import flag disc
// import { FlagDisc } from '@/features/fernhome/components/flag-disc';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/fernhome/components/glyph';
// STEP 1.13 import hero trip
// import { HeroTrip } from '@/features/fernhome/components/hero-trip';
// STEP 1.01 import text
// import { T } from '@/features/fernhome/components/text';
// STEP 1.01 import weather pill
// import { WeatherPill } from '@/features/fernhome/components/weather-pill';
import { account, place } from '@/features/fernhome/data/home';
import { useLayout } from '@/features/fernhome/layout';
import { ct } from '@/features/fernhome/theme';

/**
 * Fernweh — home.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero is the remainder — it grows into whatever the header, the headline,
 * the chips and the dock leave — so the screen always ends on the dock with no
 * band under it (I3).
 */
export default function FernhomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 greeting
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T variant="hello">{account.greeting}</T>
          <View style={{ transform: [{ rotate: '-24deg' }] }}>
            <Glyph name="wave" size={19} color="#E8A317" strokeWidth={1.8} />
          </View>
        </View>

        <WeatherPill />
      </View>
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 flag disc
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.countryH,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
        }}
      >
        <FlagDisc name={place.flag} size={14} />
        <T variant="country">{place.country.toUpperCase()}</T>
      </View>
      */}

      {/* STEP 1.08 "Search trips"
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.displayH,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <T variant="display" style={{ flex: 1 }}>
          {place.display}
        </T>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search trips"
          onPress={() => router.push('/fernlist')}
        >
          <View
            style={{
              width: L.search,
              height: L.search,
              borderRadius: L.search / 2,
              backgroundColor: ct.white,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#1F3324',
              shadowOpacity: 0.08,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            <Glyph name="search" size={22} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
      </View>
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.09 activity chips
      <ActivityChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.13 hero trip
      <View style={{ marginHorizontal: L.margin }}>
        <HeroTrip
          width={L.hero.w}
          height={L.hero.h}
          radiusTop={L.hero.radiusTop}
          radiusBottom={L.hero.radiusBottom}
          onPress={() => router.push('/ferntrip')}
        />
      </View>
      */}

      <View style={{ height: L.gapHero }} />
      {/* STEP 1.26 a stray gap above it | FIX 1.27 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.19 dock
      <Dock margin={L.margin} height={L.dock.h} radius={L.dock.radius} pill={L.dock.pill} />
      */}
    </View>
  );
}
