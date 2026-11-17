import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.13 import fact grid
// import { FactGrid } from '@/features/axisprofile/components/fact-grid';
import { PageGround } from '@/features/axisprofile/components/page-ground';
// STEP 1.18 import people row
// import { PeopleRow } from '@/features/axisprofile/components/people-row';
// STEP 1.05 import tab row
// import { TabRow } from '@/features/axisprofile/components/tab-row';
// STEP 1.10 import text
// import { T } from '@/features/axisprofile/components/text';
// STEP 1.01 import top bar
// import { TopBar } from '@/features/axisprofile/components/top-bar';
import { description, header } from '@/features/axisprofile/data/profile';
import { useLayout } from '@/features/axisprofile/layout';
import { ct } from '@/features/axisprofile/theme';

/**
 * Axis - the risk profile.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The fact card takes the remainder, so the screen is full to the bottom edge
 * with no band under it (I3).
 */
export default function AxisprofileScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.pageMid }}>
      <StatusBar style="dark" />
      <PageGround width={L.W} height={L.H} />

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.01 top bar
      <TopBar margin={L.margin} height={L.topH} onBack={() => router.push('/axisrisk')} />
      */}

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.05 tab row
      <TabRow margin={L.margin} height={L.tabH} />
      */}

      <View style={{ height: L.gapTabs }} />
      {/* STEP 1.10 display
      <View style={{ marginHorizontal: L.margin, height: L.displayH }}>
        <T variant="display">{header.display}</T>
      </View>
      */}

      <View style={{ height: L.gapDisplay }} />
      {/* STEP 1.13 fact grid
      <FactGrid margin={L.margin} height={L.cardH} radius={L.card.radius} />
      */}

      <View style={{ height: L.gapCard }} />
      {/* STEP 1.18 people row
      <PeopleRow margin={L.margin} height={L.peopleH} />
      */}

      <View style={{ height: L.gapPeople }} />
      {/* STEP 1.21 label
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{description.label}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.24 body
      <View style={{ marginHorizontal: L.margin, height: L.bodyH }}>
        <T variant="body">{description.body}</T>
      </View>
      */}

      {/* STEP 1.03 a stray rule | FIX 1.04 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.08 a stray rule | FIX 1.09 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.11 a stray rule | FIX 1.12 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.22 a stray rule | FIX 1.23 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}

      <View style={{ height: L.padBottom }} />
    </View>
  );
}
