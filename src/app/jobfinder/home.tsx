import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.03 the filter row
// import { FilterPills } from '@/features/jobfinder/components/filter-pills';
// STEP 2.01 who is here
// import { GreetingRow } from '@/features/jobfinder/components/greeting-row';
// STEP 2.05 a listing
// import { JobCard } from '@/features/jobfinder/components/job-card';
// STEP 2.11 somewhere to go next
// import { DOCK_CLEARANCE, TabBar } from '@/features/jobfinder/components/tab-bar';
import { HOME, JOBS, TABS } from '@/features/jobfinder/data/jobs';
import { SP, jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 2 — the job feed.
 *
 * One scrolling column with the dock floating over it, which is why the scroll
 * carries `DOCK_CLEARANCE` rather than the dock being the last child of a
 * column: the design has the page running underneath it.
 *
 * The filter row is inside the scroll, not pinned, and bleeds to both screen
 * edges — it undoes the scroll's gutter itself so the last pill can be clipped
 * by the right edge the way the reference shows.
 */
export default function JobFinderHome() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<string>(HOME.activeFilter);

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.gutter,
          paddingTop: insets.top + SP.md,
          paddingBottom: 24,
        }}
      >
{/* STEP 2.02 greet them by name
        <GreetingRow
          greeting={HOME.greeting}
          tagline={HOME.tagline}
          photo={require('../../../assets/images/jobfinder/george-feed.jpg')}
          onProfile={() => router.push('/jobfinder/profile')}
          onSearch={() => router.push('/jobfinder/saved')}
          onNotifications={() => router.push('/jobfinder/messages')}
        />
*/}

{/* STEP 2.04 New, Hot, Near, Remote
        <View style={{ marginTop: SP.lg }}>
          <FilterPills items={HOME.filters} active={filter} onSelect={setFilter} />
        </View>
*/}

{/* STEP 2.06 stack the listings
        <View
          style={{
            marginTop: SP.xl,
            gap: SP.md,
            // MISTAKE 2.10 the whole list came in shoved to one side
            marginLeft: 36,
          }}
        >
          {JOBS.map((job) => (
            <JobCard
              key={job.key}
              job={job}
              onPress={() => router.push({ pathname: '/jobfinder/job', params: { key: job.key } })}
              onOpen={() => router.push({ pathname: '/jobfinder/job', params: { key: job.key } })}
            />
          ))}
        </View>
*/}
      </ScrollView>

{/* STEP 2.12 float the dock over the page
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabBar
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
