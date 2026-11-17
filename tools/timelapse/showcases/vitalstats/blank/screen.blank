import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.01 import back row
// import { BackRow } from '@/features/vitalstats/components/back-row';
import { PageGround } from '@/features/vitalstats/components/page-ground';
// STEP 1.06 import headline
// import { Headline } from '@/features/vitalstats/components/headline';
// STEP 1.03 import kicker
// import { Kicker } from '@/features/vitalstats/components/kicker';
// STEP 1.14 import leaderboard
// import { Leaderboard } from '@/features/vitalstats/components/leaderboard';
// STEP 1.09 import stat tabs
// import { StatTabs } from '@/features/vitalstats/components/stat-tabs';
import { tabs } from '@/features/vitalstats/data/stats';
import { useLayout } from '@/features/vitalstats/layout';
import { ct } from '@/features/vitalstats/theme';

/**
 * Vital — stats.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `PageGround` is full-bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. The leaderboard takes the slack in whole rows, so the
 * foot cannot open a band.
 */
export default function VitalstatsScreen() {
  const L = useLayout();
  const [tab, setTab] = useState<string>(tabs[0].key);

  return (
    <View style={{ flex: 1, backgroundColor: ct.bgMid, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      {/* STEP 1.01 back row
      <BackRow margin={L.margin} height={L.backH} onPress={() => router.back()} />
      */}

      <View style={{ height: L.gapBack }} />
      {/* STEP 1.03 kicker
      <Kicker margin={L.margin} height={L.kickerH} />
      */}
      {/* STEP 1.04 a stray gap under it | FIX 1.05 take the gap back out
      <View style={{ height: 11 }} />
      */}

      <View style={{ height: L.gapKicker }} />
      {/* STEP 1.06 headline
      <Headline margin={L.margin} height={L.headlineH} />
      */}

      <View style={{ height: L.gapHeadline }} />
      {/* STEP 1.09 stat tabs
      <StatTabs margin={L.margin} height={L.tabsH} value={tab} onSelect={setTab} />
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 17 }} />
      */}

      <View style={{ height: L.gapTabs }} />
      {/* STEP 1.14 leaderboard
      <Leaderboard
        margin={L.margin}
        height={L.board.h}
        rowH={L.board.rowH}
        stripH={L.board.stripH}
        radius={L.board.radius}
        avatar={L.board.avatar}
      />
      */}
      {/* STEP 1.19 a stray gap under it | FIX 1.20 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
