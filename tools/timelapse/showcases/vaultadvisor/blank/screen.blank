import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.01 import brand bar
// import { BrandBar } from '@/features/vaultadvisor/components/brand-bar';
// STEP 1.12 import credential row
// import { CredentialRow } from '@/features/vaultadvisor/components/credential-row';
// STEP 1.02 import portrait
// import { Portrait } from '@/features/vaultadvisor/components/portrait';
// STEP 1.05 import text
// import { T } from '@/features/vaultadvisor/components/text';
// STEP 1.19 import trust row
// import { TrustRow } from '@/features/vaultadvisor/components/trust-row';
import { advisor } from '@/features/vaultadvisor/data/advisor';
import { useLayout } from '@/features/vaultadvisor/layout';
import { ct } from '@/features/vaultadvisor/theme';

/**
 * Vaultix - the advisor.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The portrait is the remainder, so the screen is full to the bottom edge with
 * no band under it (I3).
 */
export default function VaultadvisorScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 brand bar
      <BrandBar margin={L.margin} height={L.topH} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.02 portrait
      <Portrait margin={L.margin} height={L.portrait.h} radius={L.portrait.radius} />
      */}

      <View style={{ height: L.gapPortrait }} />
      {/* STEP 1.05 name
      <View style={{ marginHorizontal: L.margin, height: L.nameH, alignItems: 'center' }}>
        <T variant="name">{advisor.name}</T>
      </View>
      */}

      {/* STEP 1.06 role
      <View style={{ marginHorizontal: L.margin, height: L.roleH, alignItems: 'center' }}>
        <T variant="role">{advisor.role}</T>
      </View>
      */}

      {/* STEP 1.09 place
      <View style={{ marginHorizontal: L.margin, height: L.placeH, alignItems: 'center' }}>
        <T variant="place">{advisor.place}</T>
      </View>
      */}

      <View style={{ height: L.gapPlace }} />
      {/* STEP 1.12 credential row
      <CredentialRow margin={L.margin} height={L.credH} />
      */}

      <View style={{ height: L.gapCred }} />
      {/* STEP 1.16 view
      <View style={{ marginHorizontal: L.margin, height: L.ruleH }}>
        <View style={{ flex: 1, backgroundColor: ct.ink, opacity: 0.22 }} />
      </View>
      */}

      <View style={{ height: L.gapRule }} />
      {/* STEP 1.19 trust row
      <TrustRow margin={L.margin} height={L.trustH} />
      */}
      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.07 a stray rule | FIX 1.08 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.10 a stray rule | FIX 1.11 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.17 a stray rule | FIX 1.18 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
