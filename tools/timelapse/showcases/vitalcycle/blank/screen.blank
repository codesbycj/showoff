import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.01 import back row
// import { BackRow } from '@/features/vitalcycle/components/back-row';
// STEP 1.05 import day strip
// import { DayStrip } from '@/features/vitalcycle/components/day-strip';
// STEP 1.03 import headline
// import { Headline } from '@/features/vitalcycle/components/headline';
// STEP 1.19 import log title
// import { LogTitle } from '@/features/vitalcycle/components/log-title';
// STEP 1.24 import note row
// import { NoteRow } from '@/features/vitalcycle/components/note-row';
// STEP 1.20 import promo card
// import { PromoCard } from '@/features/vitalcycle/components/promo-card';
// STEP 1.04 import range tabs
// import { RangeTabs } from '@/features/vitalcycle/components/range-tabs';
// STEP 1.13 import symptom chips
// import { SymptomChips } from '@/features/vitalcycle/components/symptom-chips';
import { PageGround } from '@/features/vitalcycle/components/page-ground';
import { ranges } from '@/features/vitalcycle/data/cycle';
import { useLayout } from '@/features/vitalcycle/layout';
import { ct } from '@/features/vitalcycle/theme';

/**
 * Vital — cycle log.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * `PageGround` is full-bleed, so under §5.5 it is the page's own ground and may
 * paint in frame one. Everything after it is staged over it, and each card
 * carries its fill on an absolutely-filled child of its own.
 */
export default function VitalcycleScreen() {
  const L = useLayout();
  const [range, setRange] = useState<string>(ranges[0]);

  return (
    <View style={{ flex: 1, backgroundColor: ct.bgMid, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      {/* STEP 1.01 back row
      <BackRow margin={L.margin} height={L.backH} onBack={() => router.back()} />
      */}

      <View style={{ height: L.gapBack }} />
      {/* STEP 1.03 headline
      <Headline margin={L.margin} height={L.headlineH} />
      */}

      <View style={{ height: L.gapHeadline }} />
      {/* STEP 1.04 range tabs
      <RangeTabs margin={L.margin} height={L.tabsH} value={range} onSelect={setRange} />
      */}

      <View style={{ height: L.gapTabs }} />
      {/* STEP 1.05 day strip
      <DayStrip margin={L.margin} height={L.strip.h} disc={L.strip.disc} gap={L.strip.gap} />
      */}

      <View style={{ height: L.gapStrip }} />
      {/* STEP 1.13 symptom chips
      <SymptomChips margin={L.margin} height={L.chips.h} rowH={L.chips.rowH} gap={L.chips.gap} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.19 log title
      <LogTitle margin={L.margin} height={L.logH} />
      */}

      <View style={{ height: L.gapLog }} />
      {/* STEP 1.20 promo card
      <PromoCard margin={L.margin} height={L.promo.h} radius={L.promo.radius} ctaH={L.promo.cta} />
      */}

      <View style={{ height: L.gapPromo }} />
      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.24 note row
      <NoteRow margin={L.margin} height={L.notes.h} radius={L.notes.radius} gap={L.notes.gap} />
      */}
    </View>
  );
}
