import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.21 import accounts link
// import { AccountsLink } from '@/features/vaultperf/components/accounts-link';
// STEP 1.02 import menu button
// import { MenuButton } from '@/features/vaultperf/components/menu-button';
// STEP 1.14 import return caption
// import { ReturnCaption } from '@/features/vaultperf/components/return-caption';
// STEP 1.10 import return figure
// import { ReturnFigure } from '@/features/vaultperf/components/return-figure';
// STEP 1.05 import section tabs
// import { SectionTabs } from '@/features/vaultperf/components/section-tabs';
// STEP 1.17 import stat tiles
// import { StatTiles } from '@/features/vaultperf/components/stat-tiles';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/vaultperf/components/wordmark';
import { useLayout } from '@/features/vaultperf/layout';
import { ct } from '@/features/vaultperf/theme';

/**
 * Vaultix - performance.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The tiles take the remainder, so the screen is full to the bottom edge with
 * no band under it (I3).
 */
export default function VaultperfScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View
        style={{
          marginHorizontal: L.margin,
          height: L.topH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.01 wordmark
        <Wordmark height={L.topH} />
        */}
        {/* STEP 1.02 menu button
        <MenuButton size={44} />
        */}
      </View>

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.05 section tabs
      <SectionTabs
        margin={L.margin}
        height={L.pillH}
        onSelect={(route) => router.push(route as never)}
      />
      */}

      <View style={{ height: L.gapPill }} />
      {/* STEP 1.10 return figure
      <ReturnFigure margin={L.margin} height={L.figureH} />
      */}

      <View style={{ height: L.gapFigure }} />
      {/* STEP 1.14 return caption
      <ReturnCaption margin={L.margin} height={L.captionH} />
      */}

      <View style={{ height: L.gapCaption }} />
      {/* STEP 1.17 stat tiles
      <StatTiles margin={L.margin} gap={L.tile.gap} height={L.tile.h} radius={L.tile.radius} />
      */}

      <View style={{ height: 10 }} />
      {/* STEP 1.21 accounts link
      <AccountsLink height={L.footerH} />
      */}
        {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
        <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
        */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.12 a stray rule | FIX 1.13 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.15 a stray rule | FIX 1.16 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
