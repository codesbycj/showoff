import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.22 and where else it goes
// import { Dock } from '@/features/nestperf/components/dock';
// STEP 1.18 the latest news
// import { NewsCards } from '@/features/nestperf/components/news-cards';
// STEP 1.08 six months of it
// import { PerfChart } from '@/features/nestperf/components/perf-chart';
// STEP 1.06 what the sections are
// import { SectionHead } from '@/features/nestperf/components/section-head';
// STEP 1.01 who is here
// import { TopBar } from '@/features/nestperf/components/top-bar';
import { copy } from '@/features/nestperf/data/start';
import { MARGIN } from '@/features/nestperf/layout';
import { ne } from '@/features/nestperf/theme';
import { useInsets } from '@/features/nestperf/use-insets';

/**
 * Nest — performance.
 *
 * Assembly only: who is here, six months of it, the latest news, and where
 * else the app goes.
 *
 * The chart takes `flex: 1`, so it grows into whatever the phone can spare
 * above the news cards; the dock is welded to the foot and takes the bottom
 * inset itself.
 */
export default function NestperfScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ne.canvas, paddingTop: insets.top }}>
      <StatusBar style="dark" />

      <View style={{ flex: 1, paddingHorizontal: MARGIN }}>
{/* STEP 1.02 at the top
        <TopBar />
*/}

{/* STEP 1.07 the first heading
        <SectionHead
          label={copy.performance}
          of="performance"
          first
          onMore={() => router.push('/nesthome')}
        />
*/}

{/* STEP 1.09 the chart
        <PerfChart />
*/}

{/* STEP 1.17 the second heading
        <SectionHead label={copy.news} of="news" onMore={() => router.push('/nestactions')} />
*/}

{/* STEP 1.19 two cards
        <NewsCards onPress={() => router.push('/nestactions')} />
*/}
      </View>

{/* STEP 1.23 and a dark bar
      <Dock
        active="perf"
        bottom={insets.bottom}
        onSelect={(id) => {
          if (id === 'home') router.push('/nesthome');
          if (id === 'actions') router.push('/nestactions');
        }}
      />
*/}
    </View>
  );
}
