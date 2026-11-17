import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import brand row
// import { BrandRow } from '@/features/nookstart/components/brand-row';
// STEP 1.16 import browse link
// import { BrowseLink } from '@/features/nookstart/components/browse-link';
// STEP 1.13 import posed pieces
// import { PosedPieces } from '@/features/nookstart/components/posed-pieces';
// STEP 1.08 import season count
// import { SeasonCount } from '@/features/nookstart/components/season-count';
// STEP 1.04 import splash title
// import { SplashTitle } from '@/features/nookstart/components/splash-title';
// STEP 1.19 import start disc
// import { StartDisc } from '@/features/nookstart/components/start-disc';
import { useLayout } from '@/features/nookstart/layout';
import { ct } from '@/features/nookstart/theme';

/**
 * Nook - the splash.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The posed field is the remainder, so the screen always ends on its action
 * with no band under it (I3).
 */
export default function NookstartScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.panel }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 brand row
      <BrandRow margin={L.margin} height={L.brandH} />
      */}

      <View style={{ height: L.gapBrand }} />
      {/* STEP 1.04 splash title
      <SplashTitle margin={L.margin} height={L.displayH} />
      */}

      {/* STEP 1.08 season count
      <SeasonCount margin={L.margin} height={L.countH} />
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.13 posed pieces
      <PosedPieces
        width={L.W}
        height={L.field.h}
        big={L.field.big}
        small={L.field.small}
        margin={L.margin}
      />
      */}

      <View
        style={{
          marginHorizontal: L.margin,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.16 browse link
        <BrowseLink onPress={() => router.push('/nookshop')} />
        */}
        {/* STEP 1.19 start disc
        <StartDisc size={L.cta.h} onPress={() => router.push('/nookshop')} />
        */}
      </View>
      {/* STEP 1.02 a stray rule | FIX 1.03 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.06 a stray rule | FIX 1.07 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.11 a stray rule | FIX 1.12 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
        {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
        <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
    </View>
  );
}
