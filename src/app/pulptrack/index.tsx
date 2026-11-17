import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.12 import eta chip
// import { EtaChip } from '@/features/pulptrack/components/eta-chip';
// STEP 1.21 import courier row
// import { CourierRow } from '@/features/pulptrack/components/courier-row';
// STEP 1.01 import glyph
// import { Glyph } from '@/features/pulptrack/components/glyph';
// STEP 1.06 import map controls
// import { MapControls } from '@/features/pulptrack/components/map-controls';
// STEP 1.01 import map ground
// import { MapGround } from '@/features/pulptrack/components/map-ground';
// STEP 1.05 import map pins
// import { MapPins } from '@/features/pulptrack/components/map-pins';
// STEP 1.15 import stage rail
// import { StageRail } from '@/features/pulptrack/components/stage-rail';
// STEP 1.09 import text
// import { T } from '@/features/pulptrack/components/text';
import { order } from '@/features/pulptrack/data/order';
import { useLayout } from '@/features/pulptrack/layout';
import { ct } from '@/features/pulptrack/theme';

/**
 * Pulp - the delivery.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The map is drawn as the map **idea** (I4), and the sheet is pinned flush to
 * the foot, so nothing empty sits under it (I3).
 */
export default function PulptrackScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.map }}>
      <StatusBar style="dark" />

      <View style={{ height: L.map.h }}>
        {/* STEP 1.01 map ground
        <MapGround width={L.W} height={L.map.h} />
        */}
        {/* STEP 1.05 map pins
        <MapPins width={L.W} height={L.map.h} />
        */}
        {/* STEP 1.06 map controls
        <MapControls
          margin={L.margin}
          insetTop={L.insets.top}
          onBack={() => router.push('/pulpitem')}
        />
        */}
      </View>

      <View style={{ flex: 1 }}>
        {/* STEP 1.07 view
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.white,
            borderTopLeftRadius: L.sheet.radius,
            borderTopRightRadius: L.sheet.radius,
          }}
        />
        */}

        <View style={{ height: L.sheet.padTop }} />
        {/* STEP 1.08 view
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: L.sheet.grabberH,
              borderRadius: 2,
              backgroundColor: ct.line,
            }}
          />
        </View>
        */}

        <View style={{ height: L.sheet.gapGrabber }} />
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.sheet.titleH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* STEP 1.09 title
          <T variant="sheetTitle">{order.title}</T>
          */}
          {/* STEP 1.12 eta chip
          <EtaChip />
          */}
        </View>

        <View style={{ height: L.sheet.gapTitle }} />
        {/* STEP 1.15 stage rail
        <StageRail margin={L.margin} height={L.sheet.railH} disc={L.sheet.disc} />
        */}

        <View style={{ height: L.sheet.gapRail }} />
        {/* STEP 1.21 courier row
        <CourierRow margin={L.margin} height={L.sheet.rowH} />
        */}
      </View>
          {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
          <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
          */}
          {/* STEP 1.13 a stray rule | FIX 1.14 take the rule back out
          <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
          */}
        {/* STEP 1.19 a stray rule | FIX 1.20 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
    </View>
  );
}
