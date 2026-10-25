import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Hero } from '@/features/onyxhome/components/hero';
import { ProjectRow } from '@/features/onyxhome/components/project-row';
import { SearchBar } from '@/features/onyxhome/components/search-bar';
import { TabBar } from '@/features/onyxhome/components/tab-bar';
import { TaskList } from '@/features/onyxhome/components/task-list';
import { FIELD_OVERLAP, MARGIN, SECTION_TOP, TASKS_TOP } from '@/features/onyxhome/layout';
import { on } from '@/features/onyxhome/theme';
import { useInsets } from '@/features/onyxhome/use-insets';

/**
 * Onyx — the project home.
 *
 * Assembly only: the black panel, the search field straddling its edge, the
 * projects in a row that runs off the screen, what is on today, and where
 * else the app goes.
 *
 * The search field is pulled up by half its height with a negative margin
 * rather than positioned absolutely, so everything below it still flows: an
 * absolute field would leave the panel's full height of space behind it and
 * push the page down by 58dp.
 *
 * The project row is outside the padded column so a card can scroll off the
 * right edge; it carries the margin itself.
 */
export default function OnyxhomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: on.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      <View style={{ paddingHorizontal: MARGIN }}>
        <Hero />
      </View>

      <View style={{ marginTop: -FIELD_OVERLAP, paddingHorizontal: MARGIN }}>
        <SearchBar />
      </View>

      <View style={{ marginTop: SECTION_TOP }}>
        <ProjectRow onOpen={() => router.push('/onyxday')} />
      </View>

      <View style={{ flex: 1, marginTop: TASKS_TOP, paddingHorizontal: MARGIN }}>
        <TaskList />
      </View>

      <TabBar active="home" onSelect={(id) => id === 'docs' && router.push('/onyxday')} />
    </View>
  );
}
