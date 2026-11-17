import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.14 import gps pill
// import { GpsPill } from '@/features/stridestart/components/gps-pill';
// STEP 1.18 import mode chips
// import { ModeChips } from '@/features/stridestart/components/mode-chips';
// STEP 1.22 import option rows
// import { OptionRows } from '@/features/stridestart/components/option-rows';
// STEP 1.01 import route map
// import { RouteMap } from '@/features/stridestart/components/route-map';
import { SheetGround } from '@/features/stridestart/components/sheet-ground';
// STEP 1.24 import start controls
// import { StartControls } from '@/features/stridestart/components/start-controls';
import { useLayout } from '@/features/stridestart/layout';
import { ct } from '@/features/stridestart/theme';

/**
 * Stride - start a run.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * **The map is built as the map idea, never traced** (I4), and it is the
 * remainder of the screen, so the sheet always sits on the foot (I3).
 */
export default function StridestartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 route map
      <RouteMap width={L.W} height={L.map.h} />
      */}

      {/* STEP 1.14 gps pill
      <GpsPill top={L.insets.top + 8} />
      */}

      <View style={{ flex: 1 }}>
        <SheetGround radius={L.sheet.radius} />

        {/* STEP 1.17 view
        <View style={{ height: L.handleH, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 42, height: 4.5, borderRadius: 3, backgroundColor: ct.line }} />
        </View>
        */}

        <View style={{ marginHorizontal: L.margin }}>
          {/* STEP 1.18 mode chips
          <ModeChips
            height={L.mode.h}
            width={(L.W - L.margin * 2 - 30) / 4}
            radius={L.mode.radius}
          />
          */}

          <View style={{ height: L.gapRow }} />
          {/* STEP 1.22 option rows
          <OptionRows height={L.option.h} radius={L.option.radius} />
          */}
        </View>

        {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
        <View style={{ width: 23, height: 23 }} />
        */}
        {/* STEP 1.24 start controls
        <StartControls height={L.controlsH} onStart={() => router.push('/striderun')} />
        */}
      </View>
    </View>
  );
}
