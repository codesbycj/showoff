import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

// STEP 1.23 and where else it goes
// import { Dock } from '@/features/masontasks/components/dock';
// STEP 1.06 which to show
// import { FilterChips } from '@/features/masontasks/components/filter-chips';
// STEP 1.11 how to order them
// import { SortRow } from '@/features/masontasks/components/sort-row';
// STEP 1.15 the tasks
// import { TaskCard } from '@/features/masontasks/components/task-card';
// STEP 1.01 the way back
// import { TopBar } from '@/features/masontasks/components/top-bar';
import { tasks } from '@/features/masontasks/data/start';
import { LIST_TOP, MARGIN } from '@/features/masontasks/layout';
import { ms } from '@/features/masontasks/theme';
import { useInsets } from '@/features/masontasks/use-insets';

/**
 * Mason — the task list.
 *
 * Assembly only: the way back, which tasks to show, how they are ordered,
 * the tasks themselves on a rail, and where else the app goes.
 *
 * The filter is real state, so the chips answer a tap. The cards are written
 * out rather than mapped so the reveal can land them one at a time, and the
 * list scrolls under the dock with its last card running off the bottom
 * edge — which is what the reference crops.
 */
export default function MasontasksScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState('all');

  const card = (i: number) => ({
    title: tasks[i].title,
    where: tasks[i].where,
    state: tasks[i].state,
    due: tasks[i].due,
    crew: tasks[i].crew,
    progress: tasks[i].progress,
    mark: tasks[i].mark,
    onPress: () => router.push('/masonstats'),
  });

  return (
    <View style={{ flex: 1, backgroundColor: ms.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.02 and what this is
        <TopBar onBack={() => router.back()} />
*/}
      </View>

{/* STEP 1.07 counted, not typed
      <FilterChips picked={picked} onPick={setPicked} />
*/}

      <View style={{ paddingHorizontal: MARGIN }}>
{/* STEP 1.12 by due date
        <SortRow />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: LIST_TOP }}
      >
{/* STEP 1.16 the first one
        <TaskCard {...card(0)} />
*/}
{/* STEP 1.20 another
        <TaskCard {...card(1)} />
*/}
{/* STEP 1.21 another
        <TaskCard {...card(2)} />
*/}
{/* STEP 1.22 and the one that ends the rail
        <TaskCard {...card(3)} last />
*/}
      </ScrollView>

{/* STEP 1.24 floating
      <View style={{ paddingHorizontal: MARGIN, paddingBottom: insets.bottom }}>
        <Dock active="board" onSelect={(id) => id === 'home' && router.push('/masonhome')} />
      </View>
*/}
    </View>
  );
}
