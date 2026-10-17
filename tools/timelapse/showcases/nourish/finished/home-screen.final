import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

import { Backdrop } from '@/features/nourish/components/backdrop';
import { CalorieGauge } from '@/features/nourish/components/calorie-gauge';
import { CarouselDots } from '@/features/nourish/components/carousel-dots';
import { FlankStat } from '@/features/nourish/components/flank-stat';
import { FoodLog } from '@/features/nourish/components/food-log';
import { GoalRow } from '@/features/nourish/components/goal-row';
import { Greeting } from '@/features/nourish/components/greeting';
import { MacroRow } from '@/features/nourish/components/macro-row';
import { SectionHead } from '@/features/nourish/components/section-head';
import { TabDock } from '@/features/nourish/components/tab-dock';
import { calories } from '@/features/nourish/data/home';
import {
  DOCK_HEIGHT,
  DOTS_TOP,
  GAUGE_TOP,
  GREETING_TOP,
  MARGIN,
  RING_TOP,
  SECTION_GAP,
  SECTION_TOP,
  SHEET_PAD,
  SHEET_TOP,
  useHero,
  useWash,
} from '@/features/nourish/layout';
import { nr } from '@/features/nourish/theme';
import { useInsets } from '@/features/nourish/use-insets';

/**
 * Nourish — home.
 *
 * Assembly only: a washed hero that is one page of a carousel, a white sheet
 * carrying the day's prompts and the food log, and a dock floating over both.
 *
 * The wash lives inside the scroll rather than behind it, so it travels with
 * the hero it belongs to instead of staying put while the hero slides out from
 * under it.
 *
 * The Today row is the one block that escapes the page margin: its cards run
 * off the right-hand edge in the reference, which only a horizontal scroll
 * does, and such a scroll has to reach the edge to do it.
 *
 * Every handler is empty on purpose. The other four destinations are their own
 * showcases with their own slugs, so there is nothing to push to yet; what
 * matters is that the decision is made *here* and the components only report
 * that they were pressed.
 */
export default function NourishHome() {
  const insets = useInsets();
  const hero = useHero();
  const wash = useWash();

  return (
    <View style={{ flex: 1, backgroundColor: nr.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: DOCK_HEIGHT + insets.bottom,
        }}
      >
        <View style={{ paddingTop: insets.top + GREETING_TOP, paddingHorizontal: MARGIN }}>
          <Backdrop height={wash} />

          <Greeting>Great job today</Greeting>

          <View
            style={{
              marginTop: GAUGE_TOP,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <FlankStat value={String(calories.left)} label="Left" align="left" />
            <CalorieGauge
              size={hero.gauge}
              fraction={calories.eaten / (calories.eaten + calories.left)}
              value={String(calories.eaten)}
              label="Calories"
            />
            <FlankStat value={String(calories.logs)} label="Logs" align="right" />
          </View>

          <View style={{ marginTop: RING_TOP }}>
            <MacroRow />
          </View>

          <View style={{ marginTop: DOTS_TOP }}>
            <CarouselDots count={3} active={0} />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            marginTop: SHEET_TOP,
            paddingTop: SHEET_PAD,
            backgroundColor: nr.sheet,
            borderTopWidth: 1,
            borderTopColor: nr.rule,
          }}
        >
          <View style={{ paddingHorizontal: MARGIN }}>
            <SectionHead title="Today" />
          </View>

          <View style={{ marginTop: SECTION_GAP }}>
            <GoalRow />
          </View>

          <View style={{ marginTop: SECTION_TOP, paddingHorizontal: MARGIN }}>
            <SectionHead title="Food Log" action="See All" />

            <View style={{ marginTop: SECTION_GAP }}>
              <FoodLog />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <TabDock active="home" bottomInset={insets.bottom} />
      </View>
    </View>
  );
}
