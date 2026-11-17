import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.05 import duration block
// import { DurationBlock } from '@/features/striderun/components/duration-block';
// STEP 1.20 import effort bar
// import { EffortBar } from '@/features/striderun/components/effort-bar';
// STEP 1.24 import run controls
// import { RunControls } from '@/features/striderun/components/run-controls';
// STEP 1.01 import run header
// import { RunHeader } from '@/features/striderun/components/run-header';
// STEP 1.14 import splits strip
// import { SplitsStrip } from '@/features/striderun/components/splits-strip';
// STEP 1.08 import stat grid
// import { StatGrid } from '@/features/striderun/components/stat-grid';
import { useLayout } from '@/features/striderun/layout';
import { ct } from '@/features/striderun/theme';

/**
 * Stride — recording.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The stat grid is the remainder, so the controls always sit on the foot with
 * no band under them (I3), and the pace is computed from the duration and the
 * distance rather than typed beside them (R9).
 */
export default function StriderunScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 run header
      <RunHeader margin={L.margin} height={L.headerH} onLock={() => router.push('/stridehome')} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 duration block
      <View style={{ flex: L.durationFlex }}>
        <DurationBlock margin={L.margin} />
      </View>
      */}

      <View style={{ height: L.gapDuration }} />
      {/* STEP 1.12 a stray gap above it | FIX 1.13 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.08 stat grid
      <View style={{ flex: L.statsFlex }}>
        <StatGrid margin={L.margin} />
      </View>
      */}

      {/* STEP 1.14 splits strip
      <SplitsStrip margin={L.margin} height={L.splits.h} />
      */}

      {/* STEP 1.20 effort bar
      <EffortBar margin={L.margin} height={L.effort.h} />
      */}

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.24 run controls
      <RunControls height={L.controlsH} onStop={() => router.push('/stridehome')} />
      */}
    </View>
  );
}
