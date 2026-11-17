import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/vitalprog/components/glyph';
import { PageGround } from '@/features/vitalprog/components/page-ground';
// STEP 1.02 import calorie card
// import { CalorieCard } from '@/features/vitalprog/components/calorie-card';
// STEP 1.12 import leader banner
// import { LeaderBanner } from '@/features/vitalprog/components/leader-banner';
// STEP 1.09 import programs title
// import { ProgramsTitle } from '@/features/vitalprog/components/programs-title';
// STEP 1.23 import trend list
// import { TrendList } from '@/features/vitalprog/components/trend-list';
// STEP 1.22 import trending title
// import { TrendingTitle } from '@/features/vitalprog/components/trending-title';
import { useLayout } from '@/features/vitalprog/layout';
import { ct } from '@/features/vitalprog/theme';

/**
 * Vital — programs.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `PageGround` is full-bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. The trending list takes the slack in whole rows, so the
 * foot cannot open a band.
 */
export default function VitalprogScreen() {
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
        {/* STEP 1.02 calorie card
        <CalorieCard
          margin={L.margin}
          height={L.calorie.h}
          radius={L.calorie.radius}
          sparkW={L.calorie.sparkW}
        />
        */}

        <View style={{ height: L.gapCalorie }} />
        {/* STEP 1.10 a stray gap above it | FIX 1.11 take the gap back out
        <View style={{ height: 11 }} />
        */}
        {/* STEP 1.09 programs title
        <ProgramsTitle margin={L.margin} height={L.programsH} />
        */}

        <View style={{ height: L.gapPrograms }} />
        {/* STEP 1.20 a stray gap above it | FIX 1.21 take the gap back out
        <View style={{ height: 17 }} />
        */}
        {/* STEP 1.12 leader banner
        <LeaderBanner margin={L.margin} height={L.banner.h} radius={L.banner.radius} />
        */}

        <View style={{ height: L.gapBanner }} />
        {/* STEP 1.22 trending title
        <TrendingTitle margin={L.margin} height={L.trendingH} />
        */}

        <View style={{ height: L.gapTrending }} />
        {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
        <View style={{ height: 23 }} />
        */}
        {/* STEP 1.23 trend list
        <TrendList margin={L.margin} height={L.list.h} rowH={L.list.rowH} radius={L.list.radius} />
        */}
      </View>
    </View>
  );
}
