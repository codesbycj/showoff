import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.05 the month itself
// import { MonthGrid } from '@/features/tempocal/components/month-grid';
// STEP 1.10 what is on
// import { SectionHead } from '@/features/tempocal/components/section-head';
// STEP 1.20 and where else it goes
// import { TabBar } from '@/features/tempocal/components/tab-bar';
// STEP 1.14 the tasks
// import { TaskCard } from '@/features/tempocal/components/task-card';
// STEP 1.01 the top of the month
// import { TopBar } from '@/features/tempocal/components/top-bar';
import { tasks } from '@/features/tempocal/data/home';
import {
  CARD_GAP,
  CARD_TOP,
  HEADER_TOP,
  MARGIN,
  MONTH_TOP,
  SECTION_TOP,
  TAB_HEIGHT,
} from '@/features/tempocal/layout';
import { tp } from '@/features/tempocal/theme';
import { useInsets } from '@/features/tempocal/use-insets';

/**
 * Tempo — the calendar.
 *
 * Assembly only: the menu and the month, February itself, and what is due
 * today — over a scroll, with the dock floating above it.
 *
 * Same arrangement as the home screen and for the same reason: the task list
 * runs on under the dock, so the screen reaches its own bottom edge instead of
 * stopping above the bar with a band of canvas under it.
 */
export default function TempocalScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: tp.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
          paddingBottom: insets.bottom + TAB_HEIGHT + 20,
        }}
      >
{/* STEP 1.02 the menu and the month
        <TopBar />
*/}

{/* STEP 1.06 a grid of days
        <View
          style={{
            marginTop: MONTH_TOP,
            // MISTAKE 1.07 the grid came in inset
            paddingHorizontal: 26,
          }}
        >
          <MonthGrid />
        </View>
*/}

{/* STEP 1.11 the heading
        <View style={{ marginTop: SECTION_TOP }}>
          <SectionHead />
        </View>
*/}

{/* STEP 1.15 card by card
        {tasks.map((t, i) => (
          <View key={t.id} style={{ marginTop: i === 0 ? CARD_TOP : CARD_GAP }}>
            <TaskCard
              title={t.title}
              body={t.body}
              faces={t.faces}
              more={t.more}
              progress={t.progress}
            />
          </View>
        ))}
*/}
      </ScrollView>

{/* STEP 1.21 floating
      <TabBar active="calendar" bottom={insets.bottom} />
*/}
    </View>
  );
}
