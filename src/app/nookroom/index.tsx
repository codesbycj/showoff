import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.09 import add button
// import { AddButton } from '@/features/nookroom/components/add-button';
// STEP 1.01 import close button
// import { CloseButton } from '@/features/nookroom/components/close-button';
// STEP 1.18 import look rail
// import { LookRail } from '@/features/nookroom/components/look-rail';
// STEP 1.12 import piece card
// import { PieceCard } from '@/features/nookroom/components/piece-card';
// STEP 1.04 import price pill
// import { PricePill } from '@/features/nookroom/components/price-pill';
import { RoomPhoto } from '@/features/nookroom/components/room-photo';
import { useLayout } from '@/features/nookroom/layout';
import { ct } from '@/features/nookroom/theme';

/**
 * Nook - the room preview.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The three floating controls are mounted **side by side from here** rather
 * than wrapped in one control component: `stage.js` stages what the screen
 * mounts, so three controls in one wrapper reveal as one step and three
 * mounted here reveal as three (I5).
 *
 * The photograph is the page's own ground and runs to every edge, so there is
 * no column to budget and no band to leave (I3, SS5.5).
 */
export default function NookroomScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.panel }}>
      <StatusBar style="light" />

      <RoomPhoto width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.controlH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 close button
        <CloseButton size={L.controlH} onPress={() => router.push('/nookshop')} />
        */}
        {/* STEP 1.04 price pill
        <PricePill height={L.controlH} />
        */}
        {/* STEP 1.09 add button
        <AddButton size={L.controlH} />
        */}
      </View>

      <View style={{ flex: 1 }} />
      {/* STEP 1.12 piece card
      <PieceCard margin={L.margin} height={L.piece.h} radius={L.piece.radius} />
      */}

      <View style={{ height: L.gapPiece }} />
      {/* STEP 1.18 look rail
      <LookRail margin={L.margin} height={L.rail.h} width={L.rail.w} radius={L.rail.radius} />
      */}
        {/* STEP 1.02 a stray rule | FIX 1.03 take the rule back out
        <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
        {/* STEP 1.07 a stray rule | FIX 1.08 take the rule back out
        <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
        {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
        <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.16 a stray rule | FIX 1.17 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.footer }} />
    </View>
  );
}
