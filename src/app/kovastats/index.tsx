import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/kovastats/components/glyph';
// STEP 1.07 import metric tiles
// import { MetricTiles } from '@/features/kovastats/components/metric-tiles';
// STEP 1.18 import pill dock
// import { PillDock } from '@/features/kovastats/components/pill-dock';
// STEP 1.14 import post list
// import { PostList } from '@/features/kovastats/components/post-list';
// STEP 1.03 import text
// import { T } from '@/features/kovastats/components/text';
import { header, topLabel } from '@/features/kovastats/data/stats';
import { useLayout } from '@/features/kovastats/layout';
import { ct } from '@/features/kovastats/theme';

/**
 * Kova — insights.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every delta on the tiles is computed from the two periods it compares (R9),
 * and the post list takes the remainder so the screen reaches the dock — the
 * board's own insights screen stops two thirds of the way down (I3).
 */
export default function KovastatsScreen() {
  const L = useLayout();

  const round = {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ct.tray,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.headerH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/kovahome')}
        >
          <View style={round}>
            <Glyph name="back" size={19} color={ct.ink} strokeWidth={2} />
          </View>
        </Pressable>
        */}

        {/* STEP 1.02 "Insight options"
        <Pressable accessibilityRole="button" accessibilityLabel="Insight options">
          <View style={round}>
            <Glyph name="more" size={19} color={ct.ink} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapHeader }} />
      <View style={{ marginHorizontal: L.margin, height: L.titleH, justifyContent: 'center' }}>
        {/* STEP 1.04 a stray gap above it | FIX 1.05 take the gap back out
        <View style={{ width: 11, height: 11 }} />
        */}
        {/* STEP 1.03 title
        <T variant="greeting">{header.title}</T>
        */}
        {/* STEP 1.06 period
        <T variant="postMeta">{header.period}</T>
        */}
      </View>

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.07 metric tiles
      <MetricTiles margin={L.margin} width={L.tile.w} height={L.tile.h} radius={L.tile.radius} />
      */}

      <View style={{ height: L.gapTiles }} />
      {/* STEP 1.12 a stray gap above it | FIX 1.13 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.11 view
      <View style={{ marginHorizontal: L.margin, height: L.sectionH, justifyContent: 'center' }}>
        <T variant="section">{topLabel}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.14 post list
      <PostList
        margin={L.margin}
        height={L.row.h}
        gap={L.row.gap}
        radius={L.row.radius}
        bottomPad={L.dock.h + L.dock.bottom}
      />
      */}

      {/* STEP 1.25 a stray gap above it | FIX 1.26 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.18 pill dock
      <PillDock
        margin={L.margin}
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="me"
        onCalendar={() => router.push('/kovacal')}
      />
      */}
    </View>
  );
}
