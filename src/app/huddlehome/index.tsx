import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 import chip rail
// import { ChipRail } from '@/features/huddlehome/components/chip-rail';
// STEP 1.02 import dock
// import { Dock } from '@/features/huddlehome/components/dock';
// STEP 1.03 import hangout card
// import { HangoutCard } from '@/features/huddlehome/components/hangout-card';
// STEP 1.04 import search row
// import { SearchRow } from '@/features/huddlehome/components/search-row';
// STEP 1.05 import section head
// import { SectionHead } from '@/features/huddlehome/components/section-head';
// STEP 1.06 import top bar
// import { TopBar } from '@/features/huddlehome/components/top-bar';
// STEP 1.07 import trending card
// import { TrendingCard } from '@/features/huddlehome/components/trending-card';
import { copy, hangouts } from '@/features/huddlehome/data/home';
import {
  DOCK_H,
  GAP_BODY_SECTION,
  GAP_CARDS,
  GAP_CHIPS_SECTION,
  GAP_GREET_SEARCH,
  GAP_SEARCH_CHIPS,
  GAP_SECTION_BODY,
  MARGIN,
  PAD_TOP,
} from '@/features/huddlehome/layout';
import { ct } from '@/features/huddlehome/theme';
import { useInsets } from '@/features/huddlehome/use-insets';

/**
 * Huddle — what is on near you.
 *
 * Assembly only: who you are, what you are looking for, the categories, the
 * one the app is pushing, and the list.
 *
 * The whole page scrolls under a floating dock. That is why there is no
 * computed height anywhere here: the content is taller than the frame by
 * design, so the bottom of the first frame is a card passing under the bar
 * rather than a band of empty page.
 *
 * The chip rail and the page have different horizontal padding — the rail
 * runs to the screen edge so its last chip is clipped there, which is what
 * tells you it scrolls.
 */
export default function HuddlehomeScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + DOCK_H + 26 }}
      >
        {/* STEP 1.08 top bar
        <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
          <TopBar />
        </View>
        */}

        {/* STEP 1.09 search row
        <View style={{ marginTop: GAP_GREET_SEARCH, paddingHorizontal: MARGIN }}>
          <SearchRow />
        </View>
        */}

        {/* STEP 1.10 chip rail
        <View style={{ marginTop: GAP_SEARCH_CHIPS }}>
          <ChipRail />
        </View>
        */}

        {/* STEP 1.11 section head
        <View style={{ marginTop: GAP_CHIPS_SECTION, paddingHorizontal: MARGIN }}>
          <SectionHead title={copy.trending} />
        </View>
        */}

        {/* STEP 1.12 trending card
        <View style={{ marginTop: GAP_SECTION_BODY, paddingHorizontal: MARGIN }}>
          <TrendingCard onPress={() => router.push('/huddleevent')} />
        </View>
        */}

        {/* STEP 1.13 section head
        <View style={{ marginTop: GAP_BODY_SECTION, paddingHorizontal: MARGIN }}>
          <SectionHead title={copy.near} />
        </View>
        */}

        {/* STEP 1.14 hangout card
        <View style={{ marginTop: GAP_SECTION_BODY, paddingHorizontal: MARGIN }}>
          {hangouts.map((h, i) => (
            <View key={h.id} style={{ marginTop: i === 0 ? 0 : GAP_CARDS }}>
              <HangoutCard item={h} onPress={() => router.push('/huddleevent')} />
            </View>
          ))}
        </View>
        */}
      </ScrollView>

      {/* STEP 1.15 dock
      <Dock bottom={insets.bottom} />
      */}
      {/* STEP 1.16 a stray gap under it | FIX 1.17 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
