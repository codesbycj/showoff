import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.04 import account row
// import { AccountRow } from '@/features/nebuhome/components/account-row';
// STEP 1.16 import action chips
// import { ActionChips } from '@/features/nebuhome/components/action-chips';
// STEP 1.09 import balance block
// import { BalanceBlock } from '@/features/nebuhome/components/balance-block';
// STEP 1.27 import dock
// import { Dock } from '@/features/nebuhome/components/dock';
// STEP 1.20 import holdings list
// import { HoldingsList } from '@/features/nebuhome/components/holdings-list';
// STEP 1.01 import nebula ground
// import { NebulaGround } from '@/features/nebuhome/components/nebula-ground';
// STEP 1.19 import section title
// import { SectionTitle } from '@/features/nebuhome/components/section-title';
import { sections } from '@/features/nebuhome/data/home';
import { useLayout } from '@/features/nebuhome/layout';
import { ct } from '@/features/nebuhome/theme';

/**
 * Nebula — portfolio.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The nebula is the page's own ground and may paint in frame one; everything
 * else is a block that appears (§5.5).
 */
export default function NebuhomeScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 nebula ground
      <NebulaGround width={L.W} height={L.glowH} />
      */}

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.04 account row
      <AccountRow margin={L.margin} height={L.accountH} />
      */}

      <View style={{ height: L.gapAccount }} />
      {/* STEP 1.09 balance block
      <BalanceBlock height={L.balanceH} />
      */}

      <View style={{ height: L.gapBalance }} />
      {/* STEP 1.16 action chips
      <ActionChips margin={L.margin} height={L.chip.h} radius={L.chip.radius} />
      */}

      <View style={{ height: L.gapChips }} />
      {/* STEP 1.19 section title
      <SectionTitle margin={L.margin} height={L.sectionH} label={sections.portfolio} />
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.20 holdings list
      <HoldingsList
        margin={L.margin}
        width={L.W - L.margin * 2}
        rowH={L.row.h}
        featureH={L.row.featureH}
        radius={L.row.radius}
        gap={L.row.gap}
        bottomPad={L.dock.h + L.dock.bottom}
      />
      */}

      {/* STEP 1.31 a stray gap above it | FIX 1.32 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.27 dock
      <Dock
        margin={L.margin}
        height={L.dock.h}
        radius={L.dock.radius}
        bottom={L.dock.bottom}
        active="home"
      />
      */}
    </View>
  );
}
