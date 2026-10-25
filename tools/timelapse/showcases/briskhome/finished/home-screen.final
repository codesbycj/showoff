import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { FilterRow } from '@/features/briskhome/components/filter-row';
import { Headline } from '@/features/briskhome/components/headline';
import { Panels } from '@/features/briskhome/components/panels';
import { ProfileRow } from '@/features/briskhome/components/profile-row';
import { TabBar } from '@/features/briskhome/components/tab-bar';
import { TaskCard } from '@/features/briskhome/components/task-card';
import { cards } from '@/features/briskhome/data/start';
import { MARGIN, PANELS_TOP, TABBAR_TOP, TASK_TOP } from '@/features/briskhome/layout';
import { br } from '@/features/briskhome/theme';
import { useInsets } from '@/features/briskhome/use-insets';

/**
 * Brisk — the activity overview.
 *
 * Assembly only: who is signed in, what the screen is, which kind of activity
 * to show, the one task it is about, the week and the upsell, and where else
 * the app goes.
 *
 * The filter row is outside the padded column so a chip can scroll off the
 * right edge; it carries the margin itself. The task card takes the slack, so
 * the tab bar rides the bottom inset at any screen height.
 */
export default function BriskhomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: br.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN }}>
        <ProfileRow onAdd={() => router.push('/briskcase')} />
        <Headline />
      </View>

      <FilterRow />

      <View style={{ flex: 1, marginTop: TASK_TOP, paddingHorizontal: MARGIN }}>
        {cards.map((c, i) => (
          <View key={c.id} style={{ flex: 1, marginTop: i === 0 ? 0 : TASK_TOP }}>
            <TaskCard item={c} onDetails={() => router.push('/briskcase')} />
          </View>
        ))}
      </View>

      <View style={{ marginTop: PANELS_TOP, paddingHorizontal: MARGIN }}>
        <Panels />
      </View>

      <View style={{ marginTop: TABBAR_TOP, paddingHorizontal: MARGIN }}>
        <TabBar active="Home" onSelect={(id) => id === 'Schedule' && router.push('/briskcase')} />
      </View>
    </View>
  );
}
