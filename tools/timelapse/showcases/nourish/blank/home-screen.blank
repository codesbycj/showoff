import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the lit paper it is all printed on
// import { Backdrop } from '@/features/nourish/components/backdrop';
// STEP 1.05 the day, as one number
// import { CalorieGauge } from '@/features/nourish/components/calorie-gauge';
// STEP 1.22 the hero is one page of three
// import { CarouselDots } from '@/features/nourish/components/carousel-dots';
// STEP 1.11 the two figures beside it
// import { FlankStat } from '@/features/nourish/components/flank-stat';
// STEP 1.35 what was eaten
// import { FoodLog } from '@/features/nourish/components/food-log';
// STEP 1.28 what today asks of you
// import { GoalRow } from '@/features/nourish/components/goal-row';
// STEP 1.03 say something kind
// import { Greeting } from '@/features/nourish/components/greeting';
// STEP 1.14 the three the big one is made of
// import { MacroRow } from '@/features/nourish/components/macro-row';
// STEP 1.26 name a section
// import { SectionHead } from '@/features/nourish/components/section-head';
// STEP 1.41 somewhere to go next
// import { TabDock } from '@/features/nourish/components/tab-dock';
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
          {/* STEP 1.02 wash the top
          <Backdrop height={wash} />
          */}

          {/* STEP 1.04 at the top of the page
          <Greeting>Great job today</Greeting>
          */}

          <View
            style={{
              marginTop: GAUGE_TOP,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            {/* STEP 1.12 what is left
            <FlankStat value={String(calories.left)} label="Left" align="left" />
            */}
            {/* STEP 1.06 in the middle of the hero
            <CalorieGauge
              size={hero.gauge}
              fraction={calories.eaten / (calories.eaten + calories.left)}
              value={String(calories.eaten)}
              label="Calories"
            />
            */}
            {/* STEP 1.13 and what has been logged
            <FlankStat value={String(calories.logs)} label="Logs" align="right" />
            */}
          </View>

          {/* STEP 1.15 under the gauge
          <View style={{ marginTop: RING_TOP }}>
            <MacroRow />
          </View>
          */}

          {/* STEP 1.23 so say so
          <View style={{ marginTop: DOTS_TOP }}>
            <CarouselDots count={3} active={0} />
          </View>
          */}
        </View>

        {/* STEP 1.24 a dot for every page | FIX 1.25 three pages, three dots
        <CarouselDots count={5} active={0} />
        */}

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
            {/* STEP 1.27 Today
            <SectionHead title="Today" />
            */}
          </View>

          <View style={{ marginTop: SECTION_GAP }}>
            {/* STEP 1.29 running off the right-hand edge
            <GoalRow />
            */}
          </View>

          <View style={{ marginTop: SECTION_TOP, paddingHorizontal: MARGIN }}>
            {/* STEP 1.34 Food Log, and a way into it
            <SectionHead title="Food Log" action="See All" />
            */}

            <View style={{ marginTop: SECTION_GAP }}>
              {/* STEP 1.36 under the heading
              <FoodLog />
              */}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        {/* STEP 1.42 floating over the lot
        <TabDock active="home" bottomInset={insets.bottom} />
        */}
      </View>
    </View>
  );
}
