import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.24 and where else it goes
// import { Dock } from '@/features/masonhome/components/dock';
// STEP 1.05 who it is talking to
// import { Greeting } from '@/features/masonhome/components/greeting';
// STEP 1.01 the brand
// import { Header } from '@/features/masonhome/components/header';
// STEP 1.13 what it costs
// import { MoneyTiles } from '@/features/masonhome/components/money-tiles';
// STEP 1.09 how far through
// import { SnapshotCard } from '@/features/masonhome/components/snapshot-card';
// STEP 1.17 today's tasks
// import { TaskRow } from '@/features/masonhome/components/task-row';
import { T } from '@/features/masonhome/components/text';
import { copy, tasks } from '@/features/masonhome/data/start';
import { MARGIN, ROW_GAP, TASKS_TOP } from '@/features/masonhome/layout';
import { ms, type } from '@/features/masonhome/theme';
import { useInsets } from '@/features/masonhome/use-insets';

/**
 * Mason — the project update.
 *
 * Assembly only: the brand and who is signed in, what the screen is about,
 * how far through the project is, what it costs, today's tasks, and where
 * else the app goes.
 *
 * The list scrolls under the floating dock and its last row runs off the
 * bottom edge, which is what the reference crops — a list that ends in a band
 * of white reads as a page that ran out.
 */
export default function MasonhomeScreen() {
  const insets = useInsets();

  const row = (i: number) => ({
    title: tasks[i].title,
    where: tasks[i].where,
    state: tasks[i].state,
    onPress: () => router.push('/masontasks'),
  });

  return (
    <View style={{ flex: 1, backgroundColor: ms.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingBottom: 20 }}
      >
{/* STEP 1.02 and who is signed in
        <Header />
*/}
{/* STEP 1.06 in three lines
        <Greeting />
*/}
{/* STEP 1.10 on its own card
        <SnapshotCard />
*/}
{/* STEP 1.14 two tiles
        <MoneyTiles />
*/}

{/* STEP 1.18 the heading
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: TASKS_TOP }}>
          <T variant="section" color={ms.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.tasks}
          </T>
          <Pressable
            onPress={() => router.push('/masontasks')}
            accessibilityRole="button"
            accessibilityLabel={copy.viewAll}
          >
            <T variant="link" color={ms.muted} style={{ height: type.link.line }}>
              {copy.viewAll}
            </T>
          </Pressable>
        </View>
*/}

{/* STEP 1.19 row by row
        <View style={{ marginTop: 10, gap: ROW_GAP }}>
          <TaskRow {...row(0)} />
          <TaskRow {...row(1)} />
          <TaskRow {...row(2)} />
        </View>
*/}
      </ScrollView>

{/* STEP 1.25 floating
      <View style={{ paddingHorizontal: MARGIN, paddingBottom: insets.bottom }}>
        <Dock active="home" onSelect={(id) => id === 'board' && router.push('/masontasks')} />
      </View>
*/}
    </View>
  );
}
