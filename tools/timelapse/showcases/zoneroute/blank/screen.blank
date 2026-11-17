import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import route map
// import { RouteMap } from '@/features/zoneroute/components/route-map';
// STEP 1.25 import route bar
// import { RouteBar } from '@/features/zoneroute/components/route-bar';
// STEP 1.28 import route sheet
// import { RouteSheet } from '@/features/zoneroute/components/route-sheet';
import { useLayout } from '@/features/zoneroute/layout';
import { ct } from '@/features/zoneroute/theme';

/**
 * Food Zone — delivery tracking.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The map is full bleed — it is the page's own ground under §5.5 — and the
 * sheet sits on it, sized from its own rows, so the foot cannot open a band.
 * The map is built as the map *idea* rather than traced; see `route-map.tsx`
 * and I4.
 */
export default function ZonerouteScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.land }}>
      <StatusBar style="dark" />

      {/* STEP 1.01 route map
      <RouteMap width={L.W} height={L.map.h} />
      */}

      {/* STEP 1.25 route bar
      <RouteBar
        margin={L.margin}
        topInset={L.insets.top}
        control={L.control}
        onBack={() => router.back()}
      />
      */}

      {/* STEP 1.35 a stray gap above it | FIX 1.36 take the gap back out
      <View style={{ height: 23 }} />
      */}
      {/* STEP 1.28 route sheet
      <RouteSheet
        margin={L.margin}
        height={L.sheet.h}
        radius={L.sheet.radius}
        etaH={L.sheet.etaH}
        riderH={L.sheet.riderH}
        stepH={L.sheet.stepH}
      />
      */}
    </View>
  );
}
