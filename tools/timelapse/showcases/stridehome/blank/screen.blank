import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import day header
// import { DayHeader } from '@/features/stridehome/components/day-header';
// STEP 1.26 import dock
// import { Dock } from '@/features/stridehome/components/dock';
// STEP 1.14 import focus card
// import { FocusCard } from '@/features/stridehome/components/focus-card';
// STEP 1.04 import readiness card
// import { ReadinessCard } from '@/features/stridehome/components/readiness-card';
// STEP 1.17 import week card
// import { WeekCard } from '@/features/stridehome/components/week-card';
import { useLayout } from '@/features/stridehome/layout';
import { ct } from '@/features/stridehome/theme';

/**
 * Stride — today.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The week card is cropped by the dock exactly as the board crops it, so there
 * is no slack at the foot for a band to open in (I3).
 */
export default function StridehomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 day header
      <DayHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.04 readiness card
      <ReadinessCard
        margin={L.margin}
        height={L.readiness.h}
        radius={L.readiness.radius}
        ring={L.readiness.ring}
      />
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.14 focus card
      <FocusCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.focus.h}
        radius={L.focus.radius}
        onStart={() => router.push('/stridestart')}
      />
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.17 week card
      <WeekCard margin={L.margin} height={L.week.h} radius={L.week.radius} />
      */}

      {/* STEP 1.32 a stray gap above it | FIX 1.33 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.26 dock
      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="home"
        onRun={() => router.push('/stridestart')}
      />
      */}
    </View>
  );
}
