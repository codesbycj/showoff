import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

// STEP 1.01 import glyph
// import { Glyph } from '@/features/fernreport/components/glyph';
// STEP 1.02 import income card
// import { IncomeCard } from '@/features/fernreport/components/income-card';
// STEP 1.03 import text
// import { T } from '@/features/fernreport/components/text';
import { copy, tabs, transactions } from '@/features/fernreport/data/report';
import { ct, type } from '@/features/fernreport/theme';
import { useInsets } from '@/features/fernreport/use-insets';
import { useReportLayout } from '@/features/fernreport/layout';

/** The arrow on the "new card" banner. */
function Arrow({ tint }: { tint: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M4.8 12h14M13.2 6.4 18.8 12l-5.6 5.6"
        stroke={tint}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/**
 * Fern — the report.
 *
 * Assembly only: the title, which direction of money, the six months as a
 * card, the upsell, and what happened lately.
 *
 * The card's height and the ledger's rows both come from what the screen has
 * left, so the last row lands on the dock. The reference's own list is
 * clipped by its dock with nothing beneath it; this one reaches it.
 */
export default function FernreportScreen() {
  const insets = useInsets();
  const [income, setIncome] = useState(true);
  const { cardH, rowH, margin, segH, bannerH } = useReportLayout(insets, transactions.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.sheet }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + 6, paddingHorizontal: margin }}>
        {/* STEP 1.04 title
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T
            variant="screenTitle"
            color={ct.ink}
            style={{ flex: 1, height: type.screenTitle.line }}
          >
            {copy.title}
          </T>
          {(['search', 'calendar'] as const).map((k) => (
            <Pressable
              key={k}
              accessibilityRole="button"
              accessibilityLabel={k === 'search' ? 'Search' : 'Pick a month'}
              style={{ marginLeft: 10 }}
            >
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  borderWidth: 1,
                  borderColor: ct.hairline,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name={k} size={20} tint={ct.ink} strokeWidth={1.7} />
              </View>
            </Pressable>
          ))}
        </View>
        */}

        {/* STEP 1.05 view
        <View
          style={{
            height: segH,
            marginTop: 16,
            borderRadius: segH / 2,
            backgroundColor: '#F1F3F0',
            flexDirection: 'row',
            padding: 4,
          }}
        >
          {[copy.income, copy.expense].map((label, i) => {
            const on = (i === 0) === income;
            return (
              <Pressable
                key={label}
                accessibilityRole="button"
                accessibilityLabel={label}
                accessibilityState={{ selected: on }}
                onPress={() => setIncome(i === 0)}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    flex: 1,
                    borderRadius: (segH - 8) / 2,
                    backgroundColor: on ? ct.ink : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T
                    variant={on ? 'segOn' : 'seg'}
                    color={on ? '#FFFFFF' : ct.muted}
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

        {/* STEP 1.06 income card
        <View style={{ marginTop: 16 }}>
          <IncomeCard height={cardH} />
        </View>
        */}

        {/* STEP 1.07 banner title
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${copy.bannerTitle}. ${copy.bannerNote}`}
          style={{ marginTop: 14 }}
        >
          <View
            style={{
              height: bannerH,
              borderRadius: 20,
              backgroundColor: '#13200F',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                width: 52,
                height: 36,
                borderRadius: 7,
                backgroundColor: ct.leaf,
                borderWidth: 2,
                borderColor: '#F2C14E',
              }}
            />
            <View style={{ flex: 1, marginLeft: 14 }}>
              <T variant="bannerTitle" color="#FFFFFF" style={{ height: type.bannerTitle.line }}>
                {copy.bannerTitle}
              </T>
              <T
                variant="bannerNote"
                color="rgba(255,255,255,0.68)"
                style={{ height: type.bannerNote.line }}
              >
                {copy.bannerNote}
              </T>
            </View>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Arrow tint="#FFFFFF" />
            </View>
          </View>
        </Pressable>
        */}

        {/* STEP 1.08 recent
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.recent}
          </T>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${copy.seeAll}: ${copy.recent}`}
            style={{ paddingVertical: 13, paddingLeft: 12 }}
          >
            <T variant="seeAll" color={ct.leafDeep} style={{ height: type.seeAll.line }}>
              {copy.seeAll}
            </T>
          </Pressable>
        </View>
        */}

        {/* STEP 1.09 name
        {transactions.map((tx) => (
          <Pressable
            key={tx.id}
            accessibilityRole="button"
            accessibilityLabel={`${tx.name}, ${tx.amount}`}
          >
            <View style={{ height: rowH, flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  overflow: 'hidden',
                  backgroundColor: ct.hairline,
                }}
              >
                <Image source={tx.photo} style={{ width: 44, height: 44 }} contentFit="cover" />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <T variant="txName" color={ct.ink} style={{ height: type.txName.line }}>
                  {tx.name}
                </T>
                <T
                  variant="txMeta"
                  color={ct.muted}
                  style={{ height: type.txMeta.line, marginTop: 2 }}
                >
                  {tx.when}
                </T>
              </View>
              <T
                variant="txAmount"
                color={tx.credit ? ct.leafDeep : ct.ink}
                style={{ height: type.txAmount.line }}
              >
                {tx.amount}
              </T>
            </View>
          </Pressable>
        ))}
        */}
      </View>

      {/* STEP 1.10 the next block

      */}
      <View style={{ height: 58 + insets.bottom }} />

      {/* STEP 1.11 glyph
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 58 + insets.bottom,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F4F6F3',
        }}
      >
        {tabs.map((tab, i) => (
          <Pressable
            key={tab.id}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: i === 1 }}
            onPress={i === 0 ? () => router.back() : undefined}
            style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: i === 1 ? ct.ink : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={tab.icon} size={22} tint={i === 1 ? ct.leaf : ct.muted} />
            </View>
          </Pressable>
        ))}
      </View>
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
