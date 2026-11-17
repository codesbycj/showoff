import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.09 import add method
// import { AddMethod } from '@/features/slurppay/components/add-method';
// STEP 1.12 import address row
// import { AddressRow } from '@/features/slurppay/components/address-row';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/slurppay/components/glyph';
// STEP 1.03 import method card
// import { MethodCard } from '@/features/slurppay/components/method-card';
// STEP 1.01 import screen bar
// import { ScreenBar } from '@/features/slurppay/components/screen-bar';
// STEP 1.19 import summary rows
// import { SummaryRows } from '@/features/slurppay/components/summary-rows';
// STEP 1.11 import text
// import { T } from '@/features/slurppay/components/text';
// STEP 1.23 import total row
// import { TotalRow } from '@/features/slurppay/components/total-row';
import { header } from '@/features/slurppay/data/checkout';
import { useLayout } from '@/features/slurppay/layout';
import { ct } from '@/features/slurppay/theme';

/**
 * Slurp - the checkout.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every payment brand is invented and drawn (I1/I4), every figure is computed
 * from the lines (R9), and the slack lands above the pinned button so the
 * screen ends on it (I3).
 */
export default function SlurppayScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 screen bar
      <ScreenBar margin={L.margin} height={L.topH} onBack={() => router.push('/slurpcart')} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.03 method card
      <MethodCard margin={L.margin} rowH={L.method.rowH} radius={L.method.radius} />
      */}

      <View style={{ height: L.gapMethods }} />
      {/* STEP 1.09 add method
      <AddMethod margin={L.margin} height={L.add.h} radius={L.add.radius} />
      */}

      <View style={{ height: L.gapAdd }} />
      {/* STEP 1.11 address section
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{header.addressSection}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.12 address row
      <AddressRow margin={L.margin} height={L.addressH} />
      */}

      <View style={{ height: L.gapAddress }} />
      {/* STEP 1.16 summary
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{header.summary}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.19 summary rows
      <SummaryRows margin={L.margin} rowH={L.rowH} />
      */}

      {/* STEP 1.20 view
      <View style={{ marginHorizontal: L.margin, height: L.dividerH, justifyContent: 'center' }}>
        <View style={{ height: 1, backgroundColor: ct.line }} />
      </View>
      */}

      {/* STEP 1.23 total row
      <TotalRow margin={L.margin} height={L.totalH} />
      */}

      <View style={{ flex: 1 }} />
      {/* STEP 1.27 cta
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={header.cta}
        onPress={() => router.push('/slurpdish')}
      >
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.cta.h,
            borderRadius: L.cta.radius,
            backgroundColor: ct.dark,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="cta">{header.cta}</T>
        </View>
      </Pressable>
      */}

      {/* STEP 1.14 a stray rule | FIX 1.15 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.21 a stray rule | FIX 1.22 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.25 a stray rule | FIX 1.26 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      <View style={{ height: L.padBottom }} />
    </View>
  );
}
