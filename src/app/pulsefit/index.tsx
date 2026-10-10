import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.01 the bar that never moves
// import { AppHeader } from '@/features/pulsefit/components/app-header';
// STEP 1.06 who is looking at this
// import { GreetingRow } from '@/features/pulsefit/components/greeting-row';
// STEP 1.35 one meal at a time
// import { MealRow } from '@/features/pulsefit/components/meal-row';
// STEP 1.18 a number worth watching
// import { MetricCard } from '@/features/pulsefit/components/metric-card';
// STEP 1.31 something to call the list
// import { SectionHead } from '@/features/pulsefit/components/section-head';
// STEP 1.41 everywhere else the app goes
// import { TabDock } from '@/features/pulsefit/components/tab-dock';
// STEP 1.23 the week, as seven pills
// import { WeekStrip } from '@/features/pulsefit/components/week-strip';
// STEP 1.12 how the week has gone
// import { WeeklyHero } from '@/features/pulsefit/components/weekly-hero';
import { HOME, MEALS, METRICS, TABS, TODAY, WEEK } from '@/features/pulsefit/data/home';
import { DOCK_CLEARANCE, MARGIN, SECTION_GAP, TOP_INSET } from '@/features/pulsefit/layout';
import { pf, pulsefitTheme } from '@/features/pulsefit/theme';

/**
 * PulseFit — home.
 *
 * Assembly only. Every band on the page is its own component under
 * `src/features/pulsefit/components`, so the speed-build video shows the
 * screen arriving a piece at a time.
 *
 * The header is pinned and the dock floats over the foot; everything between
 * them scrolls in one column with a 16dp margin and a 16dp gap, which is what
 * the export's `flex flex-col px-margin-mobile gap-space-lg` resolves to.
 */
export default function PulsefitHome() {
  const insets = useSafeAreaInsets();
  const top = Math.max(insets.top, TOP_INSET);
  const [day, setDay] = useState(TODAY);

  return (
    <View style={[pulsefitTheme, { flex: 1, backgroundColor: pf.canvas }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: top, backgroundColor: pf.canvas, zIndex: 10 }}>
{/* STEP 1.02 pin the header
        <AppHeader brand={HOME.brand} title={HOME.title} avatar={HOME.avatar} />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: 4,
          paddingBottom: DOCK_CLEARANCE,
          gap: SECTION_GAP,
        }}
      >
{/* STEP 1.07 say good morning
        <GreetingRow avatar={HOME.avatar} greeting={HOME.greeting} name={HOME.name} />
*/}

{/* STEP 1.13 the week's progress, and the streak it adds up to
        <WeeklyHero
          badge={HOME.hero.badge}
          title={HOME.hero.title}
          subtitle={HOME.hero.subtitle}
          value={HOME.hero.value}
          unit={HOME.hero.unit}
          progress={HOME.hero.progress}
        />
*/}

{/* STEP 1.19 two numbers to hit today
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {METRICS.map((m) => (
            <MetricCard key={m.key} metric={m} />
          ))}
        </View>
*/}

{/* STEP 1.24 the week itself
        <WeekStrip month={HOME.month} days={WEEK} selected={day} onSelect={setDay} />
*/}

        <View style={{ gap: 12 }}>
{/* STEP 1.32 name the list | FIX 1.33 that is the wrong list
          <SectionHead title="Recent Meals" action={HOME.seeAll} />
*/}

{/* STEP 1.34 it is today's, not the archive
          <SectionHead title={HOME.mealsTitle} action={HOME.seeAll} />
*/}

{/* STEP 1.36 what has been eaten so far
          {MEALS.map((meal) => (
            <MealRow key={meal.key} meal={meal} />
          ))}
*/}
        </View>
      </ScrollView>

{/* STEP 1.42 float the dock
      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <TabDock tabs={TABS} active="home" bottomInset={insets.bottom} />
      </View>
*/}
    </View>
  );
}
