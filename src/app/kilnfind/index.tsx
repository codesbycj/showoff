import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.17 import dock
// import { Dock } from '@/features/kilnfind/components/dock';
// STEP 1.05 import result header
// import { ResultHeader } from '@/features/kilnfind/components/result-header';
// STEP 1.09 import result grid
// import { ResultGrid } from '@/features/kilnfind/components/result-grid';
// STEP 1.01 import search row
// import { SearchRow } from '@/features/kilnfind/components/search-row';
import { useLayout } from '@/features/kilnfind/layout';
import { ct } from '@/features/kilnfind/theme';

/**
 * Kiln - the results.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The grid runs under the dock exactly as the board crops it, which is what
 * keeps the foot closed without a spacer (I3).
 */
export default function KilnfindScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 search row
      <SearchRow margin={L.margin} height={L.search.h} />
      */}

      {/* STEP 1.05 result header
      <ResultHeader margin={L.margin} height={L.resultHeaderH} />
      */}

      {/* STEP 1.09 result grid
      <ResultGrid
        width={L.cell.w}
        imageH={L.cell.imageH}
        textH={L.cell.textH}
        onOpen={() => router.push('/kilnitem')}
      />
      */}

      {/* STEP 1.17 dock
      <Dock height={L.dock.h} />
      */}
      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.07 a stray rule | FIX 1.08 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
    </View>
  );
}
