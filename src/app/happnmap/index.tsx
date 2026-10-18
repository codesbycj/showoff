import { StatusBar } from 'expo-status-bar';
import { ScrollView, useWindowDimensions, View } from 'react-native';

// STEP 1.06 how to narrow it
// import { FilterRow } from '@/features/happnmap/components/filter-row';
// STEP 1.01 what the screen is
// import { Header } from '@/features/happnmap/components/header';
// STEP 1.12 who it is pointing at
// import { ProfileRow } from '@/features/happnmap/components/profile-row';
// STEP 1.09 the field itself
// import { Radar } from '@/features/happnmap/components/radar';
// STEP 1.20 the way around
// import { TabDock } from '@/features/happnmap/components/tab-dock';
import { T } from '@/features/happnmap/components/text';
import { about } from '@/features/happnmap/data/map';
import {
  ABOUT_TOP,
  CARD_TOP,
  FILTER_TOP,
  HEADER_TOP,
  MARGIN,
  RADAR_TOP,
  TAB_BOTTOM,
  TAB_HEIGHT,
} from '@/features/happnmap/layout';
import { hp } from '@/features/happnmap/theme';
import { useInsets } from '@/features/happnmap/use-insets';

/**
 * We Crossed Paths — the map.
 *
 * Assembly only: the way back, how to narrow the radar, the radar, the person
 * it is pointing at, and what they say about themselves.
 *
 * The radar is sized off the window's width rather than given a dp box, so it
 * is the same share of the screen on a 360dp phone as on a 430dp one.
 */
export default function HappnMap() {
  const insets = useInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: hp.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + TAB_HEIGHT + 24,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 across the top
        <Header />
        */}

        <View style={{ marginTop: FILTER_TOP }}>
          {/* STEP 1.07 under the title
          <FilterRow />
          */}
        </View>

        <View style={{ marginTop: RADAR_TOP }}>
          {/* STEP 1.10 as wide as the page
          <Radar size={width - MARGIN * 2} />
          */}
        </View>

        <View style={{ marginTop: CARD_TOP }}>
          {/* STEP 1.13 under the radar
          <ProfileRow />
          */}
        </View>

        <View style={{ marginTop: ABOUT_TOP }}>
          {/* STEP 1.18 what they say
          <T variant="section" color={hp.ink}>
            {about.title}
          </T>
          */}
          {/* STEP 1.19 about themselves
          <T variant="body" color={hp.muted} style={{ marginTop: 4 }}>
            {about.body}
          </T>
          */}
        </View>
      </ScrollView>

      {/* Outside the scroll, so the page runs under it rather than pushes it. */}
      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: insets.bottom + TAB_BOTTOM,
        }}
      >
        {/* STEP 1.21 floating at the foot
        <TabDock />
        */}
      </View>
    </View>
  );
}
