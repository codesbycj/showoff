import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.06 how to narrow it
// import { CategoryRow } from '@/features/happnswipe/components/category-row';
// STEP 1.01 who is here
// import { Header } from '@/features/happnswipe/components/header';
// STEP 1.09 and who is on offer
// import { ProfileCard } from '@/features/happnswipe/components/profile-card';
// STEP 1.17 the way around
// import { TabDock } from '@/features/happnswipe/components/tab-dock';
import {
  CARD_TOP,
  CATEGORY_TOP,
  HEADER_TOP,
  MARGIN,
  TAB_BOTTOM,
} from '@/features/happnswipe/layout';
import { hp } from '@/features/happnswipe/theme';
import { useInsets } from '@/features/happnswipe/use-insets';

/**
 * We Crossed Paths — discover.
 *
 * Assembly only: who is here, how to filter, who is on offer, and the way
 * around.
 *
 * The card takes `flex: 1`, so it grows to whatever the header, the row and
 * the dock leave — which is what keeps the screen full to its bottom edge on
 * a tall phone instead of leaving a band of canvas under it.
 */
export default function HappnSwipe() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: hp.canvas }}>
      <StatusBar style="dark" />

      {/* Vertical, so it is not the diagonal case that comes out mirrored on
          web (AGENTS.md, "Diagonal gradients flip on web"). */}
      <LinearGradient
        colors={[hp.canvasTop, hp.canvas]}
        locations={[0, 0.5]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + TAB_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 across the top
        <Header />
        */}

        <View style={{ marginTop: CATEGORY_TOP }}>
          {/* STEP 1.07 under the header
          <CategoryRow />
          */}
        </View>

        <View style={{ flex: 1, marginTop: CARD_TOP, marginBottom: 12 }}>
          {/* STEP 1.10 filling what is left
          <ProfileCard />
          */}
        </View>

        {/* STEP 1.18 floating at the foot
        <TabDock />
        */}
      </View>
    </View>
  );
}
