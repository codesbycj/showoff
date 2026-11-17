import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';

// STEP 1.14 import finish rail
// import { FinishRail } from '@/features/kilnview/components/finish-rail';
// STEP 1.08 import text
// import { T } from '@/features/kilnview/components/text';
// STEP 1.01 import view controls
// import { ViewControls } from '@/features/kilnview/components/view-controls';
import { piece } from '@/features/kilnview/data/view';
import { useLayout } from '@/features/kilnview/layout';
import { ct } from '@/features/kilnview/theme';

/**
 * Kiln - the object view.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The stage the piece stands on is the remainder, so the screen always ends
 * on the finish rail with no band under it (I3).
 */
export default function KilnviewScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.dark }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 view controls
      <ViewControls margin={L.margin} height={L.headerH} onClose={() => router.push('/kilnfind')} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.05 image
      <View style={{ height: L.stage.h, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          source={piece.image}
          style={{ width: L.W - L.margin * 2, height: L.stage.h - 20 }}
          resizeMode="contain"
        />
      </View>
      */}

      <View style={{ marginHorizontal: L.margin, height: L.nameH, justifyContent: 'center' }}>
        {/* STEP 1.08 name
        <T variant="pieceName">{piece.name}</T>
        */}
        {/* STEP 1.11 maker
        <T variant="pieceMaker">{piece.maker}</T>
        */}
      </View>

      {/* STEP 1.14 finish rail
      <FinishRail margin={L.margin} height={L.rail.h} swatch={L.rail.swatch} />
      */}
      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.09 a stray rule | FIX 1.10 take the rule back out
        <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
        {/* STEP 1.12 a stray rule | FIX 1.13 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}

      <View style={{ height: L.footer }} />
    </View>
  );
}
