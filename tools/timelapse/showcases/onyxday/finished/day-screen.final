import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { DayHead } from '@/features/onyxday/components/day-head';
import { TabBar } from '@/features/onyxday/components/tab-bar';
import { Timeline } from '@/features/onyxday/components/timeline';
import { WeekStrip } from '@/features/onyxday/components/week-strip';
import { MARGIN, TIMELINE_TOP } from '@/features/onyxday/layout';
import { on } from '@/features/onyxday/theme';
import { useInsets } from '@/features/onyxday/use-insets';

/**
 * Onyx — today.
 *
 * Assembly only: what day it is, the week it sits in, the day itself down a
 * rail, and where else the app goes.
 *
 * The timeline takes a `flex: 1` block and its entries share it, so the last
 * one ends on the tab bar at any screen height. The reference's is cut off
 * mid-sentence, which reads as a screen that failed rather than a list that
 * continues.
 */
export default function OnyxdayScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: on.canvas,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <DayHead />

      <WeekStrip />

      <View style={{ flex: 1, marginTop: TIMELINE_TOP }}>
        <Timeline />
      </View>

      <TabBar active="docs" onSelect={(id) => id === 'home' && router.push('/onyxhome')} />
    </View>
  );
}
