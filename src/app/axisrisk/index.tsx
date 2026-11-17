import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.25 import assessor list
// import { AssessorList } from '@/features/axisrisk/components/assessor-list';
// STEP 1.09 import fact grid
// import { FactGrid } from '@/features/axisrisk/components/fact-grid';
// STEP 1.19 import glyph
// import { Glyph } from '@/features/axisrisk/components/glyph';
import { PageGround } from '@/features/axisrisk/components/page-ground';
// STEP 1.04 import score card
// import { ScoreCard } from '@/features/axisrisk/components/score-card';
// STEP 1.03 import text
// import { T } from '@/features/axisrisk/components/text';
// STEP 1.01 import top bar
// import { TopBar } from '@/features/axisrisk/components/top-bar';
import { header } from '@/features/axisrisk/data/risk';
import { useLayout } from '@/features/axisrisk/layout';
import { ct } from '@/features/axisrisk/theme';

/**
 * Axis - the risk.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The score bar reads the score (R9), and the slack lands above the assessor
 * card so the screen ends on it (I3).
 */
export default function AxisriskScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.pageMid }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 top bar
      <TopBar margin={L.margin} height={L.topH} onProfile={() => router.push('/axisprofile')} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.03 title
      <View style={{ marginHorizontal: L.margin }}>
        <T variant="display">{header.title}</T>
      </View>
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.04 score card
      <ScoreCard margin={L.margin} width={L.score.w} height={L.score.h} radius={L.score.radius} />
      */}

      <View style={{ height: L.gapScore }} />
      {/* STEP 1.09 fact grid
      <FactGrid margin={L.margin} height={L.factH} radius={L.score.radius} />
      */}

      <View style={{ height: L.gapFacts }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.sectionH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.16 assessments
        <T variant="section">{header.assessments}</T>
        */}

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {/* STEP 1.19 "Assessors"
          <Pressable accessibilityRole="button" accessibilityLabel="Assessors">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="people" size={17} color={ct.onDark} strokeWidth={1.7} />
            </View>
          </Pressable>
          */}

          {/* STEP 1.22 "Add an assessor"
          <Pressable accessibilityRole="button" accessibilityLabel="Add an assessor">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.white,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="plus" size={17} color={ct.ink} strokeWidth={2} />
            </View>
          </Pressable>
          */}
        </View>
      </View>

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.25 assessor list
      <AssessorList margin={L.margin} rowH={L.assessor.rowH} radius={L.assessor.radius} />
      */}
      {/* STEP 1.14 a stray rule | FIX 1.15 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
          {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
          <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
          */}
          {/* STEP 1.23 a stray rule | FIX 1.24 take the rule back out
          <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
          */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
