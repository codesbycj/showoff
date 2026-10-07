import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.04 a line per movement
// import { ActivityRow, GroupHead } from '@/features/nova/components/activity-row';
// STEP 5.01 the small shared parts
// import { FilterChip, RoundButton } from '@/features/nova/components/bits';
// STEP 5.10 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/nova/components/tab-dock';
import { ACTIVITY, GROUPS } from '@/features/nova/data/activity';
import { TABS } from '@/features/nova/data/nav';
import { SP, TYPE, nv, novaTheme } from '@/features/nova/theme';

/**
 * Screen 5 — the transaction history.
 *
 * A filter rail over three day-groups.
 *
 * The header is not `ScreenHead`: that one centres its title between two
 * buttons, and this screen sets the title hard against the back button with
 * *two* actions on the right. Reusing it and fighting the centring would have
 * cost more than the six lines this takes.
 */
export default function NovaActivity() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[novaTheme, { flex: 1, backgroundColor: nv.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: SP.margin }}>
{/* STEP 5.02 name the screen
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <RoundButton icon="back" onPress={() => router.back()} label="Go back" />
            <Text style={[TYPE.title, { color: nv.ink }]}>{ACTIVITY.title}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <RoundButton icon="search" label="Search" />
            <RoundButton icon="filter" label="Filter" />
          </View>
        </View>
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: SP.md, paddingBottom: 116 }}
      >
{/* STEP 5.03 a rail to narrow it down
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 10, paddingVertical: 2 }}
        >
          {ACTIVITY.filters.map((f, i) => (
            <FilterChip key={f} label={f} selected={i === 0} />
          ))}
        </ScrollView>
*/}

{/* STEP 5.05 group it by the day
        <View
          style={{
            paddingHorizontal: SP.margin,
            marginTop: SP.lg,
            gap: SP.lg,
            // MISTAKE 5.06 every group came in crushed together
            gap: 0,
          }}
        >
          {GROUPS.map((group) => (
            <View key={group.key}>
              <GroupHead label={group.label} count={group.count} />

              <View style={{ marginTop: 10, gap: 8 }}>
                {group.entries.map((entry) => (
                  <ActivityRow
                    key={entry.key}
                    entry={entry}
                    onPress={() => router.push('/nova/trade')}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
*/}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 4,
        }}
      >
{/* STEP 5.11 the tab bar
        <TabDock
          active="activity"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'activity') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
