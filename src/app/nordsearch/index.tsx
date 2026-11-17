import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.09 import query card
// import { QueryCard } from '@/features/nordsearch/components/query-card';
// STEP 1.16 import result list
// import { ResultList } from '@/features/nordsearch/components/result-list';
// STEP 1.03 import search header
// import { SearchHeader } from '@/features/nordsearch/components/search-header';
// STEP 1.01 import sheet ground
// import { SheetGround } from '@/features/nordsearch/components/sheet-ground';
// STEP 1.02 import sheet handle
// import { SheetHandle } from '@/features/nordsearch/components/sheet-handle';
// STEP 1.13 import type chips
// import { TypeChips } from '@/features/nordsearch/components/type-chips';
import { useLayout } from '@/features/nordsearch/layout';
import { ct } from '@/features/nordsearch/theme';

/**
 * Nordvik — search.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The screen is the sheet the board draws over the discover screen, so the
 * page's own ground is the dark strip at the top and everything else is the
 * sheet — which is why the sheet's fill is an absolutely-filled child rather
 * than a `backgroundColor` on the block (§5.5).
 */
export default function NordsearchScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.dark }}>
      <StatusBar style="light" />

      <View style={{ flex: 1, marginTop: L.sheetTop }}>
        {/* STEP 1.01 sheet ground
        <SheetGround radius={L.sheet.radius} />
        */}

        {/* STEP 1.02 sheet handle
        <SheetHandle height={L.handleH} />
        */}
        {/* STEP 1.07 a stray gap above it | FIX 1.08 take the gap back out
        <View style={{ width: 17, height: 17 }} />
        */}
        {/* STEP 1.03 search header
        <SearchHeader
          margin={L.margin}
          height={L.headerH}
          onClose={() => router.push('/nordhome')}
        />
        */}

        <View style={{ height: L.gapHeader }} />
        {/* STEP 1.09 query card
        <QueryCard margin={L.margin} height={L.query.h} radius={L.query.radius} />
        */}

        <View style={{ height: L.gapQuery }} />
        {/* STEP 1.13 type chips
        <TypeChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
        */}

        <View style={{ height: L.gapChips }} />
        {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
        <View style={{ width: 23, height: 23 }} />
        */}
        {/* STEP 1.16 result list
        <ResultList
          margin={L.margin}
          cardW={L.card.w}
          photoH={L.card.photoH}
          radius={L.card.radius}
          gap={L.cardGap}
          onSelect={() => router.push('/nordstay')}
        />
        */}
      </View>
    </View>
  );
}
