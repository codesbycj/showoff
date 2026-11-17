import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.14 import bio lines
// import { BioLines } from '@/features/lumoprofile/components/bio-lines';
// STEP 1.23 import dock
// import { Dock } from '@/features/lumoprofile/components/dock';
// STEP 1.17 import photo grid
// import { PhotoGrid } from '@/features/lumoprofile/components/photo-grid';
// STEP 1.02 import profile header
// import { ProfileHeader } from '@/features/lumoprofile/components/profile-header';
// STEP 1.08 import stat row
// import { StatRow } from '@/features/lumoprofile/components/stat-row';
// STEP 1.01 import wash ground
// import { WashGround } from '@/features/lumoprofile/components/wash-ground';
import { useLayout } from '@/features/lumoprofile/layout';
import { ct } from '@/features/lumoprofile/theme';

/**
 * Lumora — profile.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The purple wash is the page's own ground and may paint in frame one; the
 * grid runs under the dock as the board crops it, so the foot cannot open a
 * band (I3).
 */
export default function LumoprofileScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 wash ground
      <WashGround width={L.W} height={Math.round(L.H * 0.5)} />
      */}

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.02 profile header
      <ProfileHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.12 a stray gap above it | FIX 1.13 take the gap back out
      <View style={{ width: 17, height: 17 }} />
      */}
      {/* STEP 1.08 stat row
      <StatRow margin={L.margin} height={L.statsH} />
      */}

      <View style={{ height: L.gapStats }} />
      {/* STEP 1.14 bio lines
      <BioLines margin={L.margin} height={L.bioH} />
      */}

      <View style={{ height: L.gapBio }} />
      {/* STEP 1.17 photo grid
      <PhotoGrid
        margin={L.margin}
        tabsH={L.tabsH}
        cell={L.cell}
        gap={L.gapTabs}
        bottomPad={L.dock.h + L.dock.bottom}
      />
      */}

      {/* STEP 1.28 a stray gap above it | FIX 1.29 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.23 dock
      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="profile"
        onProfile={() => router.push('/lumofeed')}
      />
      */}
    </View>
  );
}
