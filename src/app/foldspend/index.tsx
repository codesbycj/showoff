import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.19 import category rail
// import { CategoryRail } from '@/features/foldspend/components/category-rail';
// STEP 1.15 import flow tiles
// import { FlowTiles } from '@/features/foldspend/components/flow-tiles';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/foldspend/components/glyph';
// STEP 1.06 import spend chart
// import { SpendChart } from '@/features/foldspend/components/spend-chart';
// STEP 1.01 import text
// import { T } from '@/features/foldspend/components/text';
// STEP 1.27 import transfer list
// import { TransferList } from '@/features/foldspend/components/transfer-list';
import { header, money, spent } from '@/features/foldspend/data/activity';
import { useLayout } from '@/features/foldspend/layout';
import { ct } from '@/features/foldspend/theme';

/**
 * Fold - the activity.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every figure is computed from the months under it (R9), and the transfer
 * list runs under the bottom edge so the screen ends on a row crossing the
 * frame (I3).
 */
export default function FoldspendScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View style={{ marginHorizontal: L.margin, height: L.topH, justifyContent: 'center' }}>
        {/* STEP 1.01 title
        <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
          <T variant="section">{header.title}</T>
        </View>
        */}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* STEP 1.02 "Back"
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.push('/foldhome')}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="back" size={18} color={ct.ink} strokeWidth={1.9} />
            </View>
          </Pressable>
          */}

          {/* STEP 1.03 "More"
          <Pressable accessibilityRole="button" accessibilityLabel="More">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="more" size={18} color={ct.ink} strokeWidth={1.6} />
            </View>
          </Pressable>
          */}
        </View>
      </View>

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.04 total label
      <View style={{ height: L.totalLabelH, alignItems: 'center' }}>
        <T variant="totalLabel">{header.totalLabel}</T>
      </View>
      */}

      {/* STEP 1.05 view
      <View style={{ height: L.totalH, alignItems: 'center' }}>
        <T variant="total">{money(spent())}</T>
      </View>
      */}

      <View style={{ height: L.gapTotal }} />
      {/* STEP 1.06 spend chart
      <SpendChart margin={L.margin} width={L.chart.w} height={L.chart.h} />
      */}

      <View style={{ height: L.gapChart }} />
      {/* STEP 1.15 flow tiles
      <FlowTiles margin={L.margin} width={L.flow.w} height={L.flow.h} gap={L.flow.gap} />
      */}

      <View style={{ height: L.gapFlow }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.sectionH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.16 categories
        <T variant="section">{header.categories}</T>
        */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Filter: ${header.categoryFilter}`}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 44 }}>
            {/* STEP 1.17 category filter
            <T variant="filter">{header.categoryFilter}</T>
            */}
            {/* STEP 1.18 glyph
            <Glyph name="chevronDown" size={14} color={ct.muted} strokeWidth={1.8} />
            */}
          </View>
        </Pressable>
      </View>

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.19 category rail
      <CategoryRail margin={L.margin} width={L.cat.w} height={L.cat.h} gap={L.cat.gap} />
      */}

      <View style={{ height: L.gapCats }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.sectionH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.22 transfers
        <T variant="section">{header.transfers}</T>
        */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Filter: ${header.transferFilter}`}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 44 }}>
            {/* STEP 1.23 transfer filter
            <T variant="filter">{header.transferFilter}</T>
            */}
            {/* STEP 1.24 glyph
            <Glyph name="chevronDown" size={14} color={ct.muted} strokeWidth={1.8} />
            */}
          </View>
        </Pressable>
      </View>

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.27 transfer list
      <TransferList margin={L.margin} height={L.list.h} rowH={L.list.rowH} gap={L.list.gap} />
      */}
            {/* STEP 1.25 a stray rule | FIX 1.26 take the rule back out
            <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
            */}
    </View>
  );
}
