import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.22 import accounts link
// import { AccountsLink } from '@/features/vaultassets/components/accounts-link';
// STEP 1.02 import menu button
// import { MenuButton } from '@/features/vaultassets/components/menu-button';
// STEP 1.05 import section tabs
// import { SectionTabs } from '@/features/vaultassets/components/section-tabs';
// STEP 1.17 import stat rows
// import { StatRows } from '@/features/vaultassets/components/stat-rows';
// STEP 1.14 import total caption
// import { TotalCaption } from '@/features/vaultassets/components/total-caption';
// STEP 1.10 import total figure
// import { TotalFigure } from '@/features/vaultassets/components/total-figure';
// STEP 1.01 import wordmark
// import { Wordmark } from '@/features/vaultassets/components/wordmark';
import { useLayout } from '@/features/vaultassets/layout';
import { ct } from '@/features/vaultassets/theme';

/**
 * Vaultix - the assets.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The wordmark and the menu are mounted side by side from here rather than
 * wrapped in one header: `stage.js` stages what the screen mounts, so two
 * marks in one wrapper reveal as one step (I5).
 *
 * The rows take the remainder, so the screen is full to the bottom edge with
 * no band under it (I3).
 */
export default function VaultassetsScreen() {
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
        height={L.tabH}
        onSelect={(route) => router.push(route as never)}
      />
      */}

      <View style={{ height: L.gapTabs }} />
      {/* STEP 1.10 total figure
      <TotalFigure margin={L.margin} height={L.figureH} />
      */}

      <View style={{ height: L.gapFigure }} />
      {/* STEP 1.14 total caption
      <TotalCaption margin={L.margin} height={L.captionH} />
      */}

      <View style={{ height: L.gapCaption }} />
      {/* STEP 1.17 stat rows
      <StatRows margin={L.margin} gap={L.row.gap} height={L.row.h} radius={L.row.radius} />
      */}

      <View style={{ height: 10 }} />
      {/* STEP 1.22 accounts link
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
