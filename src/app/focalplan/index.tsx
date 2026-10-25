import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { MonthGrid } from '@/features/focalplan/components/month-grid';
import { PlanHead } from '@/features/focalplan/components/plan-head';
import { StatStrip } from '@/features/focalplan/components/stat-strip';
import { SyncRow } from '@/features/focalplan/components/sync-row';
import { MARGIN } from '@/features/focalplan/layout';
import { fc } from '@/features/focalplan/theme';
import { useInsets } from '@/features/focalplan/use-insets';

/**
 * Focal — the schedule.
 *
 * Assembly only: which day is open, what the schedule pulls from, the
 * figures above it, and the month itself.
 *
 * The statistics strip is outside the padded column so a tile can scroll off
 * the right edge; it carries the margin itself. The calendar takes the
 * slack, so the legend sits on the bottom inset at any screen height.
 */
export default function FocalplanScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: fc.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN }}>
        <PlanHead onBack={() => router.back()} />
        <SyncRow />
      </View>

      <StatStrip />

      <View style={{ flex: 1, paddingHorizontal: MARGIN }}>
        <MonthGrid />
      </View>
    </View>
  );
}
