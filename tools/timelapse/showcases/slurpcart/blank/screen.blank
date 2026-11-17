import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.03 import line list
// import { LineList } from '@/features/slurpcart/components/line-list';
// STEP 1.06 import promo row
// import { PromoRow } from '@/features/slurpcart/components/promo-row';
// STEP 1.01 import screen bar
// import { ScreenBar } from '@/features/slurpcart/components/screen-bar';
// STEP 1.12 import summary rows
// import { SummaryRows } from '@/features/slurpcart/components/summary-rows';
// STEP 1.09 import text
// import { T } from '@/features/slurpcart/components/text';
// STEP 1.18 import total row
// import { TotalRow } from '@/features/slurpcart/components/total-row';
import { header } from '@/features/slurpcart/data/cart';
import { useLayout } from '@/features/slurpcart/layout';
import { ct } from '@/features/slurpcart/theme';

/**
 * Slurp - the cart.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * Every figure under the lines is computed from them (R9), and the slack lands
 * above the pinned button so the screen ends on it (I3).
 */
export default function SlurpcartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 screen bar
      <ScreenBar margin={L.margin} height={L.topH} onBack={() => router.push('/slurpdish')} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.03 line list
      <LineList
        margin={L.margin}
        height={L.line.h}
        image={L.line.image}
        radius={L.line.radius}
        gap={L.line.gap}
        step={L.line.step}
      />
      */}

      <View style={{ height: L.gapLines }} />
      {/* STEP 1.06 promo row
      <PromoRow margin={L.margin} height={L.promo.h} radius={L.promo.radius} />
      */}

      <View style={{ height: L.gapPromo }} />
      {/* STEP 1.09 summary
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{header.summary}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.12 summary rows
      <SummaryRows margin={L.margin} rowH={L.rowH} />
      */}

      {/* STEP 1.15 view
      <View style={{ marginHorizontal: L.margin, height: L.dividerH, justifyContent: 'center' }}>
        <View style={{ height: 1, backgroundColor: ct.line }} />
      </View>
      */}

      {/* STEP 1.18 total row
      <TotalRow margin={L.margin} height={L.totalH} />
      */}

      <View style={{ flex: 1 }} />
      {/* STEP 1.22 cta
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={header.cta}
        onPress={() => router.push('/slurppay')}
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

      {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      <View style={{ height: L.padBottom }} />
    </View>
  );
}
