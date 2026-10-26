import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.08 the day
// import { DayCard } from '@/features/sprighome/components/day-card';
// STEP 1.36 and where else it goes
// import { Dock } from '@/features/sprighome/components/dock';
// STEP 1.25 fill the day in
// import { GenerateButton } from '@/features/sprighome/components/generate-button';
// STEP 1.21 the macros
// import { MacroRow } from '@/features/sprighome/components/macro-row';
// STEP 1.29 what has been eaten
// import { MealCard } from '@/features/sprighome/components/meal-card';
// STEP 1.01 who is here
// import { Greeting } from '@/features/sprighome/components/greeting';
// STEP 1.05 today, or the week
// import { RangeToggle } from '@/features/sprighome/components/range-toggle';
import { T } from '@/features/sprighome/components/text';
import { brunch, copy, lunch, todayNum } from '@/features/sprighome/data/start';
import { LIST_TOP, MARGIN, SECTION_TOP } from '@/features/sprighome/layout';
import { sg, type } from '@/features/sprighome/theme';
import { useInsets } from '@/features/sprighome/use-insets';

/**
 * Sprig — the day.
 *
 * Assembly only: who is here, today or the week, the day's calories, the
 * macros, a way to fill the day in, and what has been eaten so far.
 *
 * The meals scroll under the dock so the list runs off the bottom edge rather
 * than stopping short of it, which is what the reference crops. The day and
 * the range are real state held here, so adding a destination is a line in
 * this file rather than a change to a component.
 */
export default function SprighomeScreen() {
  const insets = useInsets();
  const [range, setRange] = useState('today');
  const [picked, setPicked] = useState(todayNum);

  return (
    <View style={{ flex: 1, backgroundColor: sg.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <Greeting />
*/}

{/* STEP 1.06 a toggle
        <RangeToggle range={range} onRange={setRange} />
*/}

{/* STEP 1.09 on a lime card
        <DayCard picked={picked} onPick={setPicked} />
*/}

{/* STEP 1.22 three tiles
        <MacroRow />
*/}

{/* STEP 1.26 one button
        <GenerateButton onPress={() => router.push('/sprigdish')} />
*/}

{/* STEP 1.28 the section
        <T
          variant="section"
          color={sg.ink}
          style={{ marginTop: SECTION_TOP, height: type.section.line }}
        >
          {copy.meals}
        </T>
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: LIST_TOP }}
      >
{/* STEP 1.30 the first meal
        <MealCard
          id={brunch.id}
          name={brunch.name}
          items={brunch.items}
          onAdd={() => router.push('/sprigdish')}
        />
*/}
{/* STEP 1.35 and the second
        <MealCard
          id={lunch.id}
          name={lunch.name}
          items={lunch.items}
          glyph="bowl"
          onAdd={() => router.push('/sprigdish')}
        />
*/}
      </ScrollView>

{/* STEP 1.37 along the foot
      <View style={{ paddingHorizontal: MARGIN, paddingBottom: insets.bottom }}>
        <Dock
          active="day"
          onSelect={(id) => id === 'burn' && router.push('/sprigprogress')}
          onAdd={() => router.push('/sprigdish')}
        />
      </View>
*/}
    </View>
  );
}
