import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/vitalweight/components/glyph';
import { PageGround } from '@/features/vitalweight/components/page-ground';
// STEP 1.09 import breakdown title
// import { BreakdownTitle } from '@/features/vitalweight/components/breakdown-title';
// STEP 1.16 import predict card
// import { PredictCard } from '@/features/vitalweight/components/predict-card';
// STEP 1.15 import predict title
// import { PredictTitle } from '@/features/vitalweight/components/predict-title';
// STEP 1.12 import stat grid
// import { StatGrid } from '@/features/vitalweight/components/stat-grid';
// STEP 1.02 import weight chart
// import { WeightChart } from '@/features/vitalweight/components/weight-chart';
import { useLayout } from '@/features/vitalweight/layout';
import { ct } from '@/features/vitalweight/theme';

/**
 * Vital — weight breakdown.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `PageGround` is full-bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. The chart takes the screen's slack, so the foot cannot
 * open a band — and it returns `null` while the series is still being staged,
 * which is what keeps every intermediate frame of the reveal rendering (I7).
 */
export default function VitalweightScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.bgMid }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }}>
        {/* STEP 1.01 "Back"
        <View style={{ marginHorizontal: L.margin, height: L.backH, justifyContent: 'center' }}>
          <Pressable
            hitSlop={10}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Back"
            style={{ alignSelf: 'flex-start' }}
          >
            {({ pressed }) => (
              <View
                style={{
                  width: L.backH,
                  height: L.backH,
                  borderRadius: L.backH / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  opacity: pressed ? 0.7 : 1,
                }}
              >
                <Glyph name="back" size={18} color={ct.ink} />
              </View>
            )}
          </Pressable>
        </View>
        */}

        <View style={{ height: L.gapBack }} />
        {/* STEP 1.02 weight chart
        <WeightChart margin={L.margin} width={L.W} height={L.chart.h} axisH={L.chart.axisH} />
        */}

        <View style={{ height: L.gapChart }} />
        {/* STEP 1.10 a stray gap above it | FIX 1.11 take the gap back out
        <View style={{ height: 11 }} />
        */}
        {/* STEP 1.09 breakdown title
        <BreakdownTitle margin={L.margin} height={L.titleH} />
        */}

        <View style={{ height: L.gapTitle }} />
        {/* STEP 1.13 a stray gap above it | FIX 1.14 take the gap back out
        <View style={{ height: 17 }} />
        */}
        {/* STEP 1.12 stat grid
        <StatGrid margin={L.margin} height={L.stats.h} gutter={L.gutter} radius={L.stats.radius} />
        */}

        <View style={{ height: L.gapStats }} />
        {/* STEP 1.15 predict title
        <PredictTitle margin={L.margin} height={L.predictTitleH} />
        */}

        <View style={{ height: L.gapPredict }} />
        {/* STEP 1.23 a stray gap above it | FIX 1.24 take the gap back out
        <View style={{ height: 23 }} />
        */}
        {/* STEP 1.16 predict card
        <PredictCard margin={L.margin} height={L.predict.h} radius={L.predict.radius} />
        */}
      </View>
    </View>
  );
}
