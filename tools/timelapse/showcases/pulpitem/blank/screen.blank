import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.20 import buy row
// import { BuyRow } from '@/features/pulpitem/components/buy-row';
// STEP 1.14 import fact tiles
// import { FactTiles } from '@/features/pulpitem/components/fact-tiles';
// STEP 1.01 import item hero
// import { ItemHero } from '@/features/pulpitem/components/item-hero';
// STEP 1.07 import tag row
// import { TagRow } from '@/features/pulpitem/components/tag-row';
// STEP 1.04 import text
// import { T } from '@/features/pulpitem/components/text';
// STEP 1.03 import title row
// import { TitleRow } from '@/features/pulpitem/components/title-row';
import { drink } from '@/features/pulpitem/data/item';
import { useLayout } from '@/features/pulpitem/layout';
import { ct } from '@/features/pulpitem/theme';

/**
 * Pulp - the drink.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The photograph is the remainder, so the screen always ends on the buy row
 * with no band under it (I3).
 */
export default function PulpitemScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 item hero
      <ItemHero
        margin={L.margin}
        height={L.hero.h}
        radius={L.hero.radius}
        topH={L.topH}
        onBack={() => router.push('/pulphome')}
      />
      */}

      <View style={{ height: L.gapHero }} />
      {/* STEP 1.03 title row
      <TitleRow margin={L.margin} height={L.titleH} />
      */}

      {/* STEP 1.04 size
      <View style={{ marginHorizontal: L.margin, height: L.sizeH }}>
        <T variant="size">{drink.size}</T>
      </View>
      */}

      <View style={{ height: L.gapSize }} />
      {/* STEP 1.07 tag row
      <TagRow margin={L.margin} height={L.tag.h} radius={L.tag.radius} />
      */}

      <View style={{ height: L.gapTags }} />
      {/* STEP 1.11 section
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{drink.section}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.14 fact tiles
      <FactTiles
        margin={L.margin}
        width={L.tile.w}
        height={L.tile.h}
        gap={L.tile.gap}
        radius={L.tile.radius}
      />
      */}

      <View style={{ flex: 1 }} />
      {/* STEP 1.20 buy row
      <BuyRow
        margin={L.margin}
        height={L.buy.h}
        radius={L.buy.radius}
        step={L.buy.step}
        onAdd={() => router.push('/pulptrack')}
      />
      */}

      {/* STEP 1.05 a stray rule | FIX 1.06 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.09 a stray rule | FIX 1.10 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.12 a stray rule | FIX 1.13 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.18 a stray rule | FIX 1.19 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      <View style={{ height: L.padBottom }} />
    </View>
  );
}
