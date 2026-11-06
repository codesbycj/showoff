import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

// STEP 1.01 import dock
// import { Dock } from '@/features/byteactivity/components/dock';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/byteactivity/components/glyph';
// STEP 1.03 import overview list
// import { OverviewList } from '@/features/byteactivity/components/overview-list';
// STEP 1.04 import text
// import { T } from '@/features/byteactivity/components/text';
// STEP 1.05 import week chart
// import { WeekChart } from '@/features/byteactivity/components/week-chart';
import { categories, copy, total } from '@/features/byteactivity/data/activity';
import {
  GAP_CHART_SECTION,
  GAP_HEAD_SEG,
  GAP_SECTION_ROWS,
  GAP_SEG_TOTAL,
  GAP_TOTAL_CHART,
  HEAD_H,
  MARGIN,
  PAD_TOP,
  PERIOD_H,
  SECTION_H,
  SEG_H,
  useActivityLayout,
} from '@/features/byteactivity/layout';
import { ct, sheet, type } from '@/features/byteactivity/theme';
import { useInsets } from '@/features/byteactivity/use-insets';

/**
 * Byte — account activity.
 *
 * Assembly only: the way back, which direction of money, how much of it, the
 * week as bars, and where it went.
 *
 * The chart and the list divide the space between the headline figure and
 * the dock, with the raised scan control's rise paid for — so the last
 * category row clears it rather than sitting underneath it.
 */
export default function ByteactivityScreen() {
  const insets = useInsets();
  const [expense, setExpense] = useState(true);
  const { chartW, chartH, rowH } = useActivityLayout(insets, categories.length);

  return (
    <View style={{ flex: 1, backgroundColor: sheet.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        {/* STEP 1.06 "Back"
        <View style={{ height: HEAD_H, flexDirection: 'row', alignItems: 'center' }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.back()}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: sheet.hairline,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="back" size={19} tint={sheet.ink} />
            </View>
          </Pressable>
          <T
            variant="screenTitle"
            color={sheet.ink}
            style={{ flex: 1, textAlign: 'center', height: type.screenTitle.line }}
          >
            {copy.title}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel="More">
            <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
              <Glyph name="kebab" size={20} tint={sheet.ink} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.07 view
        <View
          style={{
            height: SEG_H,
            marginTop: GAP_HEAD_SEG,
            borderRadius: SEG_H / 2,
            backgroundColor: '#F4F6F6',
            flexDirection: 'row',
            padding: 4,
          }}
        >
          {[copy.expense, copy.income].map((label, i) => {
            const on = (i === 0) === expense;
            return (
              <Pressable
                key={label}
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ selected: on }}
                onPress={() => setExpense(i === 0)}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: (SEG_H - 8) / 2,
                    backgroundColor: on ? ct.teal : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T
                    variant={on ? 'segOn' : 'seg'}
                    color={on ? ct.onDeep : sheet.muted}
                    style={{ height: type.seg.line }}
                  >
                    {label}
                  </T>
                </View>
              </Pressable>
            );
          })}
        </View>
        */}

        {/* STEP 1.08 period
        <View style={{ marginTop: GAP_SEG_TOTAL, flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <T variant="label" color={sheet.muted} style={{ height: type.label.line }}>
              {expense ? copy.totalExpense : copy.totalIncome}
            </T>
            <T variant="total" color={sheet.ink} style={{ height: type.total.line }}>
              {total}
            </T>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={`Period: ${copy.period}`}>
            <View
              style={{
                height: PERIOD_H,
                paddingHorizontal: 16,
                borderRadius: PERIOD_H / 2,
                borderWidth: 1,
                borderColor: sheet.hairline,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <T variant="pill" color={sheet.ink} style={{ height: type.pill.line }}>
                {copy.period}
              </T>
              <View style={{ marginLeft: 8, transform: [{ rotate: '90deg' }] }}>
                <Glyph name="chevron" size={14} tint={sheet.ink} />
              </View>
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.09 week chart
        <View style={{ marginTop: GAP_TOTAL_CHART }}>
          <WeekChart width={chartW} height={chartH} />
        </View>
        */}

        {/* STEP 1.10 overview
        <View
          style={{
            marginTop: GAP_CHART_SECTION,
            height: SECTION_H,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <T variant="section" color={sheet.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.overview}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.viewDetail}
            style={{ paddingVertical: 13, paddingLeft: 12 }}
          >
            <T variant="viewAll" color={ct.teal} style={{ height: type.viewAll.line }}>
              {copy.viewDetail}
            </T>
          </Pressable>
        </View>
        */}

        {/* STEP 1.11 overview list
        <View style={{ marginTop: GAP_SECTION_ROWS }}>
          <OverviewList rowH={rowH} />
        </View>
        */}
      </View>

      <View style={{ flex: 1 }} />

      {/* STEP 1.12 dock
      <Dock active={1} bottom={insets.bottom} />
      */}
      {/* STEP 1.13 a stray gap under it | FIX 1.14 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
