import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import back button
// import { BackButton } from '@/features/hushshare/components/back-button';
// STEP 1.12 import link row
// import { LinkRow } from '@/features/hushshare/components/link-row';
// STEP 1.08 import session label
// import { SessionLabel } from '@/features/hushshare/components/session-label';
// STEP 1.02 import share title
// import { ShareTitle } from '@/features/hushshare/components/share-title';
// STEP 1.17 import target row
// import { TargetRow } from '@/features/hushshare/components/target-row';
// STEP 1.05 import wave art
// import { WaveArt } from '@/features/hushshare/components/wave-art';
import { useLayout } from '@/features/hushshare/layout';
import { ct } from '@/features/hushshare/theme';

/**
 * Hush - sharing a session.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The artwork takes the remainder, so the screen is full to the bottom edge
 * with no band under it (I3).
 */
export default function HushshareScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 back button
      <View style={{ marginHorizontal: L.margin, height: L.topH, justifyContent: 'center' }}>
        <BackButton size={44} onPress={() => router.push('/hushmix')} />
      </View>
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.02 share title
      <ShareTitle margin={L.margin} height={L.titleH} />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.05 wave art
      <WaveArt width={L.W} height={L.waveH} margin={L.margin} />
      */}

      {/* STEP 1.08 session label
      <SessionLabel margin={L.margin} height={L.labelH} />
      */}

      <View style={{ height: L.gapLabel }} />
      {/* STEP 1.12 link row
      <LinkRow margin={L.margin} height={L.link.h} radius={L.link.radius} />
      */}

      <View style={{ height: L.gapLink }} />
      {/* STEP 1.17 target row
      <TargetRow margin={L.margin} tile={L.target.tile} height={L.target.h} />
      */}
      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
