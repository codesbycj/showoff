import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import day bar
// import { DayBar } from '@/features/vitalday/components/day-bar';
// STEP 1.26 import follow tiles
// import { FollowTiles } from '@/features/vitalday/components/follow-tiles';
// STEP 1.25 import following title
// import { FollowingTitle } from '@/features/vitalday/components/following-title';
// STEP 1.13 import headline
// import { Headline } from '@/features/vitalday/components/headline';
// STEP 1.14 import month chart
// import { MonthChart } from '@/features/vitalday/components/month-chart';
// STEP 1.05 import ring strip
// import { RingStrip } from '@/features/vitalday/components/ring-strip';
import { PageGround } from '@/features/vitalday/components/page-ground';
import { useLayout } from '@/features/vitalday/layout';
import { ct } from '@/features/vitalday/theme';

/**
 * Vital — day view.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `PageGround` is full-bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. The month chart takes the screen's slack, so the foot
 * cannot open a band.
 */
export default function VitaldayScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.bgMid, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      {/* STEP 1.01 day bar
      <DayBar margin={L.margin} height={L.bar.h} avatarSize={L.bar.avatar} />
      */}

      <View style={{ height: L.gapBar }} />
      {/* STEP 1.05 ring strip
      <RingStrip margin={L.margin} height={L.rings.h} size={L.rings.size} />
      */}

      <View style={{ height: L.gapRings }} />
      {/* STEP 1.13 headline
      <Headline margin={L.margin} height={L.headlineH} />
      */}

      <View style={{ height: L.gapHeadline }} />
      {/* STEP 1.14 month chart
      <MonthChart margin={L.margin} height={L.chart.h} axisH={L.chart.axisH} />
      */}

      <View style={{ height: L.gapChart }} />
      {/* STEP 1.25 following title
      <FollowingTitle margin={L.margin} height={L.followTitleH} />
      */}

      <View style={{ height: L.gapFollowTitle }} />
      {/* STEP 1.30 a stray gap above it | FIX 1.31 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.26 follow tiles
      <FollowTiles margin={L.margin} height={L.tiles.h} radius={L.tiles.radius} gap={L.tiles.gap} />
      */}
    </View>
  );
}
