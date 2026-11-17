import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.21 import dock
// import { Dock } from '@/features/nordhome/components/dock';
// STEP 1.04 import hero headline
// import { HeroHeadline } from '@/features/nordhome/components/hero-headline';
// STEP 1.01 import hero photo
// import { HeroPhoto } from '@/features/nordhome/components/hero-photo';
// STEP 1.04 import location row
// import { LocationRow } from '@/features/nordhome/components/location-row';
// STEP 1.17 import place rail
// import { PlaceRail } from '@/features/nordhome/components/place-rail';
// STEP 1.07 import search pill
// import { SearchPill } from '@/features/nordhome/components/search-pill';
// STEP 1.10 import section title
// import { SectionTitle } from '@/features/nordhome/components/section-title';
// STEP 1.11 import stay rail
// import { StayRail } from '@/features/nordhome/components/stay-rail';
import { sections } from '@/features/nordhome/data/home';
import { useLayout } from '@/features/nordhome/layout';
import { ct } from '@/features/nordhome/theme';

/**
 * Nordvik — discover.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The content runs past the frame on purpose (I3): the places rail passes
 * under the floating dock exactly as the board shows it, so there is no slack
 * for the scroller to collect into a hole at the foot.
 */
export default function NordhomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: L.hero.h }}>
          {/* STEP 1.01 hero photo
          <HeroPhoto width={L.W} height={L.hero.h} radius={L.hero.radius} />
          */}

          {/* STEP 1.04 location row
          <View style={{ paddingTop: L.insets.top }}>
            <LocationRow margin={L.margin} />
            <HeroHeadline margin={L.margin} width={L.W} />
          </View>
          */}

          {/* STEP 1.07 search pill
          <SearchPill
            margin={L.margin}
            height={L.pill.h}
            radius={L.pill.radius}
            bottom={L.pill.bottom}
          />
          */}
        </View>

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.10 section title
        <SectionTitle margin={L.margin} height={L.sectionH} label={sections.relevant} />
        */}

        <View style={{ height: L.gapAfterTitle }} />
        {/* STEP 1.11 stay rail
        <StayRail
          margin={L.margin}
          cardW={L.card.w}
          photoH={L.card.photoH}
          radius={L.card.radius}
          gap={L.railGap}
          height={L.card.h}
          onSelect={() => router.push('/nordstay')}
        />
        */}

        <View style={{ height: L.gapSection }} />
        {/* STEP 1.16 section title
        <SectionTitle margin={L.margin} height={L.sectionH} label={sections.discover} />
        */}

        <View style={{ height: L.gapAfterTitle }} />
        {/* STEP 1.17 place rail
        <PlaceRail
          margin={L.margin}
          width={L.tile.w}
          height={L.tile.h}
          radius={L.tile.radius}
          gap={L.railGap}
        />
        */}

        {/* STEP 1.20 view
        <View style={{ height: L.dock.h + L.dock.bottom }} />
        */}
      </ScrollView>

      {/* STEP 1.25 a stray gap above it | FIX 1.26 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.21 dock
      <Dock margin={L.margin} height={L.dock.h} radius={L.dock.radius} bottom={L.dock.bottom} />
      */}
    </View>
  );
}
