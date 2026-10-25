import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import { CategoryRow } from '@/features/quizhome/components/category-row';
import { DailyChallenge } from '@/features/quizhome/components/daily-challenge';
import { Header } from '@/features/quizhome/components/header';
import { TabDock } from '@/features/quizhome/components/tab-dock';
import { SectionHead } from '@/features/quizhome/components/section-head';
import { TrendCard } from '@/features/quizhome/components/trend-card';
import { sections, trending } from '@/features/quizhome/data/home';
import {
  HEADER_TOP,
  HERO_TOP,
  MARGIN,
  SCROLL_TAIL,
  SECTION_GAP,
  SECTION_TOP,
  TREND_GAP,
  DOCK_BOTTOM,
} from '@/features/quizhome/layout';
import { qz } from '@/features/quizhome/theme';
import { useInsets } from '@/features/quizhome/use-insets';

/**
 * Quiz — the home screen.
 *
 * Assembly only: who is here, the challenge of the day, what you can play, and
 * what is popular — over a scroll, with the dock floating above it.
 *
 * The dock sits outside the scroll rather than at the end of it, so it stays
 * put while the cards run under it. `SCROLL_TAIL` is what buys the last card
 * room to clear it.
 */
export default function QuizHome() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: qz.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        <Header />

        <View style={{ marginTop: HERO_TOP }}>
          <DailyChallenge />
        </View>

        <View style={{ marginTop: SECTION_TOP }}>
          <SectionHead title={sections.categories} />
        </View>
        <View style={{ marginTop: SECTION_GAP }}>
          <CategoryRow />
        </View>

        <View style={{ marginTop: SECTION_TOP }}>
          <SectionHead title={sections.trending} />
        </View>
        <View style={{ marginTop: SECTION_GAP, gap: TREND_GAP }}>
          {trending.map((t) => (
            <TrendCard key={t.key} trend={t} />
          ))}
        </View>
      </ScrollView>

      {/* Outside the scroll, so the cards run under it rather than push it. */}
      <View
        style={{
          position: 'absolute',
          left: MARGIN,
          right: MARGIN,
          bottom: insets.bottom + DOCK_BOTTOM,
        }}
      >
        <TabDock />
      </View>
    </View>
  );
}
