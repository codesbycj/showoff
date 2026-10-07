import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.12 the floating dock
// import { TabBar } from '@/features/mindful/components/bits';
// STEP 4.01 everything the calendar is made of
// import { CalendarGrid, MonthBar, PositivityBanner, StatCard, SummaryCard, } from '@/features/mindful/components/calendar-parts';
import { STATS } from '@/features/mindful/data/calendar';
import { TABS } from '@/features/mindful/data/nav';
import { SP, mindfulTheme, mp } from '@/features/mindful/theme';

/**
 * Screen 4 — the mood calendar.
 *
 * One scrolling column: month switcher, the heatmap, the summary hero, three
 * bento stats, then the positivity banner. The dock floats over it.
 *
 * Tapping a day goes to the check-in for that day, which is the only place a
 * logged entry could be edited.
 */
export default function MindfulCalendar() {
  const insets = useSafeAreaInsets();
  const dockSpace = 48 + SP.sm + SP.md + Math.max(insets.bottom, SP.md);

  return (
    <View style={[mindfulTheme, { flex: 1, backgroundColor: mp.bg, paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.marginSm,
          paddingBottom: dockSpace,
          gap: SP.md,
        }}
      >
{/* STEP 4.02 name the month
        <MonthBar onBack={() => router.back()} onPick={() => router.push('/mindful/checkin')} />
*/}

{/* STEP 4.03 thirty-five days of mood
        <View
          style={{
            // MISTAKE 4.04 the grid came in washed out
            opacity: 0.3,
          }}
        >
          <CalendarGrid onSelect={() => router.push('/mindful/checkin')} />
        </View>
*/}

{/* STEP 4.05 sum the month up
        <SummaryCard />
*/}

{/* STEP 4.08 three numbers from it
        <View style={{ flexDirection: 'row', gap: SP.gutterSm }}>
          {STATS.map((s) => (
            <StatCard key={s.key} stat={s} />
          ))}
        </View>
*/}

{/* STEP 4.13 and the headline streak
        <PositivityBanner onPress={() => router.push('/mindful/insights')} />
*/}
      </ScrollView>

{/* STEP 4.14 float the dock over it all
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 0) + SP.md,
        }}
      >
        <TabBar
          active="calendar-insights"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'calendar-insights') router.push(tab.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
