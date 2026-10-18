import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

// STEP 1.11 how to narrow it
// import { FilterRow } from '@/features/milesbrands/components/filter-row';
// STEP 1.01 whose miles these are
// import { Header } from '@/features/milesbrands/components/header';
// STEP 1.14 the offer being pushed
// import { PromoCard } from '@/features/milesbrands/components/promo-card';
// STEP 1.06 how to look through it
// import { SearchField } from '@/features/milesbrands/components/search-field';
// STEP 1.08 and what is in it
// import { Stage } from '@/features/milesbrands/components/stage';
// STEP 1.18 the way around
// import { TabBar } from '@/features/milesbrands/components/tab-bar';
import { T } from '@/features/milesbrands/components/text';
import { header } from '@/features/milesbrands/data/brands';
import {
  FILTER_TOP,
  HEADER_TOP,
  MARGIN,
  PROMO_TOP,
  SEARCH_TOP,
  STAGE_TOP,
  TAB_BOTTOM,
  TAB_TOP,
  TITLE_TOP,
} from '@/features/milesbrands/layout';
import { ml } from '@/features/milesbrands/theme';
import { useInsets } from '@/features/milesbrands/use-insets';

/**
 * Miles — the brands screen.
 *
 * Assembly only: the way back, what the screen is, how to search it, what is
 * in it, how to narrow it, and the one offer being pushed.
 *
 * The stage takes `flex: 1`, so the products grow into whatever the fixed
 * blocks leave — which is what keeps the page full to its bottom edge on a
 * tall phone rather than leaving a band of flat blue under the throw.
 */
export default function MilesBrands() {
  const insets = useInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: ml.canvas }}>
      <StatusBar style="light" />

      {/* Vertical, so it is not the diagonal case that comes out mirrored on
          web (AGENTS.md, "Diagonal gradients flip on web"). */}
      <LinearGradient
        colors={[ml.canvasTop, ml.canvas]}
        locations={[0, 0.7]}
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

        {/* STEP 1.05 what the screen is
        <View style={{ marginTop: TITLE_TOP, alignItems: 'center' }}>
          <T variant="kicker" color={ml.onCanvasSoft}>
            {header.kicker}
          </T>
          <T variant="title" color={ml.onCanvas}>
            {header.title}
          </T>
        </View>
        */}

        <View style={{ marginTop: SEARCH_TOP }}>
          {/* STEP 1.07 under the title
          <SearchField />
          */}
        </View>

        <View style={{ flex: 1, marginTop: STAGE_TOP }}>
          {/* STEP 1.09 filling the page
          <Stage width={width - MARGIN * 2} height="100%" />
          */}
        </View>

        <View style={{ marginTop: FILTER_TOP }}>
          {/* STEP 1.12 in a row off the edge
          <FilterRow />
          */}
        </View>

        <View style={{ marginTop: PROMO_TOP }}>
          {/* STEP 1.15 above the bar
          <PromoCard />
          */}
        </View>

        <View style={{ marginTop: TAB_TOP }}>
          {/* STEP 1.19 along the bottom
          <TabBar />
          */}
        </View>
      </View>
    </View>
  );
}
