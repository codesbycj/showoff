import { StatusBar } from 'expo-status-bar';
import Bell from 'lucide-react-native/icons/bell';
import CalendarDays from 'lucide-react-native/icons/calendar-days';
import ListFilter from 'lucide-react-native/icons/list-filter';
import Search from 'lucide-react-native/icons/search';
import { Pressable, ScrollView, View } from 'react-native';

// STEP 1.22 the way around
// import { Dock } from '@/features/salungwork/components/dock';
// STEP 1.04 how they are doing
// import { PerformanceBanner } from '@/features/salungwork/components/performance-banner';
// STEP 1.10 one card each
// import { ProjectCard } from '@/features/salungwork/components/project-card';
// STEP 1.17 one row each
// import { TaskCard } from '@/features/salungwork/components/task-card';
import { T } from '@/features/salungwork/components/text';
import { header, projects, sections, tasks } from '@/features/salungwork/data/work';
import {
  BANNER_TOP,
  DOCK_BOTTOM,
  HEADER_DISC,
  HEADER_TOP,
  MARGIN,
  PROJECT_GAP,
  SCROLL_TAIL,
  SEARCH_HEIGHT,
  SEARCH_TOP,
  SECTION_GAP,
  SECTION_TOP,
  TASK_GAP,
} from '@/features/salungwork/layout';
import { radius, sl } from '@/features/salungwork/theme';
import { useInsets } from '@/features/salungwork/use-insets';

/**
 * Salung — the work screen.
 *
 * Assembly only: who is here, what they can search, how they are doing, what
 * they are working on, and what is due today — over a scroll, with the dock
 * floating above it.
 *
 * The dock sits outside the scroll rather than at the end of it, so it stays
 * put while the cards run under it. `SCROLL_TAIL` is what buys the last card
 * room to clear it.
 */
export default function SalungWork() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: sl.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + SCROLL_TAIL,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* STEP 1.01 who is here
          <T variant="title" color={sl.ink} style={{ flex: 1 }}>
            {header.title}
          </T>
          */}
          {/* STEP 1.02 and what is waiting
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Disc label="Alerts">
              <Bell size={17} color={sl.ink} strokeWidth={1.8} />
            </Disc>
            <Disc label="Calendar">
              <CalendarDays size={17} color={sl.ink} strokeWidth={1.8} />
            </Disc>
          </View>
          */}
        </View>

        {/* STEP 1.03 what they can look for
        <View
          style={{
            marginTop: SEARCH_TOP,
            height: SEARCH_HEIGHT,
            borderRadius: radius.pill,
            backgroundColor: sl.well,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            gap: 10,
          }}
        >
          <Search size={16} color={sl.muted} strokeWidth={1.9} />
          <T variant="search" color={sl.muted} style={{ flex: 1 }}>
            {header.searchPlaceholder}
          </T>
          <ListFilter size={16} color={sl.ink} strokeWidth={1.9} />
        </View>
        */}

        <View style={{ marginTop: BANNER_TOP }}>
          {/* STEP 1.05 under the search
          <PerformanceBanner />
          */}
        </View>

        {/* STEP 1.09 what they are working on
        <T variant="section" color={sl.ink} style={{ marginTop: SECTION_TOP }}>
          {sections.projects}
        </T>
        */}
        <View style={{ marginTop: SECTION_GAP, flexDirection: 'row', gap: PROJECT_GAP }}>
          {/* STEP 1.11 side by side
          {projects.map((p) => (
            <ProjectCard key={p.key} project={p} />
          ))}
          */}
        </View>

        <View
          style={{
            marginTop: SECTION_TOP,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          {/* STEP 1.16 and what is due
          <T variant="section" color={sl.ink}>
            {sections.tasks}
          </T>
          */}
          <Pressable accessibilityRole="button" accessibilityLabel={sections.more}>
            <T variant="more" color={sl.muted}>
              {sections.more}
            </T>
          </Pressable>
        </View>
        <View style={{ marginTop: SECTION_GAP, gap: TASK_GAP }}>
          {/* STEP 1.18 down the page
          {tasks.map((t) => (
            <TaskCard key={t.key} task={t} />
          ))}
          */}
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
        {/* STEP 1.23 floating at the foot
        <Dock />
        */}
      </View>
    </View>
  );
}

/** A round control in the title row. */
function Disc({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: HEADER_DISC,
          height: HEADER_DISC,
          borderRadius: radius.full,
          backgroundColor: sl.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </Pressable>
  );
}
