import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.18 import day axis
// import { DayAxis } from '@/features/axistime/components/day-axis';
// STEP 1.21 import entry cards
// import { EntryCards } from '@/features/axistime/components/entry-cards';
import { PageGround } from '@/features/axistime/components/page-ground';
// STEP 1.05 import text
// import { T } from '@/features/axistime/components/text';
// STEP 1.08 import timeline chart
// import { TimelineChart } from '@/features/axistime/components/timeline-chart';
// STEP 1.01 import top bar
// import { TopBar } from '@/features/axistime/components/top-bar';
import { header } from '@/features/axistime/data/timeline';
import { useLayout } from '@/features/axistime/layout';
import { ct } from '@/features/axistime/theme';

/**
 * Axis - the timeline.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Both curves are plotted from the same series the weekday axis labels (R9),
 * and the plot takes the remainder so the screen is full to the bottom edge
 * (I3).
 */
export default function AxistimeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.pageMid }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 top bar
      <TopBar margin={L.margin} height={L.topH} onBack={() => router.push('/axisrisk')} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.05 display
      <View style={{ marginHorizontal: L.margin, height: L.displayH }}>
        <T variant="display">{header.display}</T>
      </View>
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.08 timeline chart
      <TimelineChart width={L.W} height={L.chartH} margin={L.margin} />
      */}

      {/* STEP 1.18 day axis
      <DayAxis margin={L.margin} height={L.axisH} />
      */}

      <View style={{ height: L.gapAxis }} />
      {/* STEP 1.21 entry cards
      <EntryCards margin={L.margin} height={L.card.h} gap={L.card.gap} radius={L.card.radius} />
      */}
      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.19 a stray rule | FIX 1.20 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
