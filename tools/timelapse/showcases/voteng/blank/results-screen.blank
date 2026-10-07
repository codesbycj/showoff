import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.08 import the metric selector
// import { MetricChip } from '@/features/voteng/components/metric-chip';
// STEP 3.18 import the map
// import { NigeriaMap } from '@/features/voteng/components/nigeria-map';
// STEP 3.01 import the masthead
// import { ResultsHead } from '@/features/voteng/components/results-head';
// STEP 3.05 import the overview card
// import { ResultsHero } from '@/features/voteng/components/results-hero';
// STEP 3.07 import the section head
// import { SectionHead } from '@/features/voteng/components/section-head';
// STEP 3.10 import the standings row
// import { StandingCard } from '@/features/voteng/components/standing-card';
// STEP 3.19 import the leaderboard
// import { StateTable } from '@/features/voteng/components/state-table';
// STEP 3.28 import the tab bar
// import { TabBar } from '@/features/voteng/components/tab-bar';
// STEP 3.03 import the view rail
// import { TabStrip } from '@/features/voteng/components/tab-strip';
import { NAV } from '@/features/voteng/data/election';
import { RESULTS, STANDINGS, STATE_ROWS } from '@/features/voteng/data/results';
import { R, SP, vt, votengTheme } from '@/features/voteng/theme';

/**
 * The split panel that carries the map and the state leaderboard.
 *
 * Hoisted out of the tree because it is the one block on this screen whose look
 * is worth naming: a card that holds two half-width columns side by side. It
 * also gives the timelapse something to vary — the staged mistake is this same
 * panel with its direction flipped.
 */
const PANEL = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: SP.md,
  marginHorizontal: SP.margin,
  marginTop: SP.md,
  backgroundColor: vt.card,
  borderRadius: R.lg,
  borderWidth: 1,
  borderColor: vt.line,
  padding: SP.lg,
  shadowColor: '#000000',
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 2 },
  elevation: 1,
} as const;

/**
 * Screen 3 — live results.
 *
 * Same skeleton as home — one scroll, one pinned tab bar — but on a cooler
 * canvas and at a larger type scale throughout. The export treats this as the
 * app's data screen rather than its front page, and the whole hierarchy steps
 * up a size to say so.
 */
export default function VotengResults() {
  const insets = useSafeAreaInsets();
  const [view, setView] = useState<string>(RESULTS.tabs[0]);

  return (
    <View style={[votengTheme, { flex: 1, backgroundColor: vt.canvasCool }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: SP.xl }}
      >
{/* STEP 3.02 what this page is
        <ResultsHead title={RESULTS.title} election={RESULTS.election} scope={RESULTS.scope} />
*/}

{/* STEP 3.04 four ways to cut it
        <View style={{ marginTop: SP.md }}>
          <TabStrip tabs={RESULTS.tabs} active={view} tone="results" onSelect={setView} />
        </View>
*/}

{/* STEP 3.06 how far the count has got
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.sm }}>
          <ResultsHero {...RESULTS.hero} />
        </View>
*/}

{/* STEP 3.09 name the national tally
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md + 4 }}>
          <SectionHead
            title={RESULTS.nationalTitle}
            size={20}
            right={<MetricChip label={RESULTS.metric} />}
          />
        </View>
*/}

{/* STEP 3.11 room for the standings
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md, gap: SP.md }}>
          {STANDINGS.map((s, i) => (
            <StandingCard key={s.key} standing={s} index={i} />
          ))}
        </View>
*/}

{/* STEP 3.17 name the state breakdown
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg }}>
          <SectionHead title={RESULTS.stateTitle} size={20} action={RESULTS.stateAction} />
        </View>
*/}

{/* STEP 3.20 map over table | FIX 3.27 they go side by side, not stacked
        <View style={[PANEL, { flexDirection: 'column' }]}>
          <View style={{ flex: 1 }}>
            <NigeriaMap />
          </View>
          <View style={{ flex: 1 }}>
            <StateTable head={RESULTS.stateHead} rows={STATE_ROWS} />
          </View>
        </View>
*/}

{/* STEP 3.26 the panel, side by side
        <View style={PANEL}>
          <View style={{ flex: 1 }}>
            <NigeriaMap />
          </View>
          <View style={{ flex: 1 }}>
            <StateTable head={RESULTS.stateHead} rows={STATE_ROWS} />
          </View>
        </View>
*/}
      </ScrollView>

{/* STEP 3.29 pin the tab bar
      <TabBar
        items={NAV}
        active="results"
        tone="results"
        inset={insets.bottom}
        onSelect={(k) => {
          const item = NAV.find((n) => n.key === k);
          if (item && k !== 'results') router.push(item.route);
        }}
      />
*/}
    </View>
  );
}
