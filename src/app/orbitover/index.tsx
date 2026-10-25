import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { CardRow } from '@/features/orbitover/components/card-row';
import { DaySheet } from '@/features/orbitover/components/day-sheet';
import { StatCard } from '@/features/orbitover/components/stat-card';
import { Summary } from '@/features/orbitover/components/summary';
import { CARDROW_TOP, MARGIN, SHEET_TOP, STAT_TOP } from '@/features/orbitover/layout';
import { ob } from '@/features/orbitover/theme';
import { useInsets } from '@/features/orbitover/use-insets';

/**
 * Orbit — the overview.
 *
 * Assembly only: the way back and what the month came to, which card it was,
 * the seven months behind it, and the day the sheet opens on.
 *
 * The sheet is outside the padded column so it can run to both edges and off
 * the bottom of the screen, which is what a list of a day's transactions
 * does.
 */
export default function OrbitoverScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ob.canvas, paddingTop: insets.top }}>
      <StatusBar style="light" />

      <View style={{ paddingHorizontal: MARGIN }}>
        <Summary onBack={() => router.back()} />

        <View style={{ marginTop: CARDROW_TOP }}>
          <CardRow />
        </View>

        <View style={{ marginTop: STAT_TOP }}>
          <StatCard />
        </View>
      </View>

      <View style={{ flex: 1, marginTop: SHEET_TOP }}>
        <DaySheet />
      </View>
    </View>
  );
}
