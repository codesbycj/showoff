import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.03 import dish hero
// import { DishHero } from '@/features/slurpdish/components/dish-hero';
// STEP 1.19 import extras row
// import { ExtrasRow } from '@/features/slurpdish/components/extras-row';
// STEP 1.15 import fact chips
// import { FactChips } from '@/features/slurpdish/components/fact-chips';
// STEP 1.05 import qty pill
// import { QtyPill } from '@/features/slurpdish/components/qty-pill';
// STEP 1.24 import select bar
// import { SelectBar } from '@/features/slurpdish/components/select-bar';
// STEP 1.12 import sheet dome
// import { SheetDome } from '@/features/slurpdish/components/sheet-dome';
// STEP 1.08 import size rail
// import { SizeRail } from '@/features/slurpdish/components/size-rail';
// STEP 1.13 import text
// import { T } from '@/features/slurpdish/components/text';
// STEP 1.01 import top bar
// import { TopBar } from '@/features/slurpdish/components/top-bar';
import { dish } from '@/features/slurpdish/data/dish';
import { useLayout } from '@/features/slurpdish/layout';
import { ct } from '@/features/slurpdish/theme';

/**
 * Slurp - the dish.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The hero is the remainder, so the screen always ends on the pinned bar with
 * no band under it (I3).
 */
export default function SlurpdishScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.dark }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 top bar
      <TopBar margin={L.margin} height={L.topH} onCart={() => router.push('/slurpcart')} />
      */}

      {/* STEP 1.03 dish hero
      <DishHero width={L.W} height={L.hero.h} margin={L.margin} />
      */}

      {/* STEP 1.05 qty pill
      <QtyPill top={L.insets.top + L.topH + L.hero.h * 0.42} />
      */}

      {/* STEP 1.08 size rail
      <SizeRail height={L.size.h} disc={L.size.disc} />
      */}

      <View style={{ flex: 1 }}>
        {/* STEP 1.11 view
        <View
          style={{
            position: 'absolute',
            top: L.sheet.domeH,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.white,
          }}
        />
        */}
        {/* STEP 1.12 sheet dome
        <SheetDome width={L.W} domeH={L.sheet.domeH} />
        */}

        <View style={{ height: L.sheet.domeH }} />
        {/* STEP 1.13 name
        <View style={{ marginHorizontal: L.margin, height: L.sheet.titleH, alignItems: 'center' }}>
          <T variant="sheetTitle">{dish.name}</T>
        </View>
        */}

        <View style={{ height: L.sheet.gapTitle }} />
        {/* STEP 1.14 body
        <View style={{ marginHorizontal: L.margin + 14, height: L.sheet.bodyH }}>
          <T variant="body">{dish.body}</T>
        </View>
        */}

        <View style={{ height: L.sheet.gapBody }} />
        {/* STEP 1.15 fact chips
        <FactChips height={L.sheet.chipH} />
        */}

        <View style={{ height: L.sheet.gapChips }} />
        {/* STEP 1.18 section
        <View style={{ marginHorizontal: L.margin, height: L.sheet.sectionH }}>
          <T variant="section">{dish.section}</T>
        </View>
        */}

        <View style={{ height: L.sheet.gapSection }} />
        {/* STEP 1.19 extras row
        <ExtrasRow margin={L.margin} height={L.sheet.extraH} />
        */}

        <View style={{ flex: 1 }} />
        {/* STEP 1.24 select bar
        <SelectBar
          margin={L.margin}
          height={L.sheet.barH}
          onPress={() => router.push('/slurpcart')}
        />
        */}
        <View style={{ height: L.sheet.padBottom }} />
      </View>
        {/* STEP 1.22 a stray rule | FIX 1.23 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
    </View>
  );
}
