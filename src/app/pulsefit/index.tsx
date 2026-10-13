import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppHeader } from '@/features/pulsefit/components/app-header';
import { GreetingRow } from '@/features/pulsefit/components/greeting-row';
import { MealRow } from '@/features/pulsefit/components/meal-row';
import { MetricCard } from '@/features/pulsefit/components/metric-card';
import { SectionHead } from '@/features/pulsefit/components/section-head';
import { TabDock } from '@/features/pulsefit/components/tab-dock';
import { WeekStrip } from '@/features/pulsefit/components/week-strip';
import { WeeklyHero } from '@/features/pulsefit/components/weekly-hero';
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
        <AppHeader brand={HOME.brand} title={HOME.title} avatar={HOME.avatar} />
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
        <GreetingRow avatar={HOME.avatar} greeting={HOME.greeting} name={HOME.name} />

        <WeeklyHero
          badge={HOME.hero.badge}
          title={HOME.hero.title}
          subtitle={HOME.hero.subtitle}
          value={HOME.hero.value}
          unit={HOME.hero.unit}
          progress={HOME.hero.progress}
        />

        <View style={{ flexDirection: 'row', gap: 12 }}>
          {METRICS.map((m) => (
            <MetricCard key={m.key} metric={m} />
          ))}
        </View>

        <WeekStrip month={HOME.month} days={WEEK} selected={day} onSelect={setDay} />

        <View style={{ gap: 12 }}>
          <SectionHead title={HOME.mealsTitle} action={HOME.seeAll} />

          {MEALS.map((meal) => (
            <MealRow key={meal.key} meal={meal} />
          ))}
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        <TabDock tabs={TABS} active="home" bottomInset={insets.bottom} />
      </View>
    </View>
  );
}
