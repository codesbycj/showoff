import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

import { FilterRow } from '@/features/milesbrands/components/filter-row';
import { Header } from '@/features/milesbrands/components/header';
import { PromoCard } from '@/features/milesbrands/components/promo-card';
import { SearchField } from '@/features/milesbrands/components/search-field';
import { Stage } from '@/features/milesbrands/components/stage';
import { TabBar } from '@/features/milesbrands/components/tab-bar';
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
        <Header />

        <View style={{ marginTop: TITLE_TOP, alignItems: 'center' }}>
          <T variant="kicker" color={ml.onCanvasSoft}>
            {header.kicker}
          </T>
          <T variant="title" color={ml.onCanvas}>
            {header.title}
          </T>
        </View>

        <View style={{ marginTop: SEARCH_TOP }}>
          <SearchField />
        </View>

        <View style={{ flex: 1, marginTop: STAGE_TOP }}>
          <Stage width={width - MARGIN * 2} height="100%" />
        </View>

        <View style={{ marginTop: FILTER_TOP }}>
          <FilterRow />
        </View>

        <View style={{ marginTop: PROMO_TOP }}>
          <PromoCard />
        </View>

        <View style={{ marginTop: TAB_TOP }}>
          <TabBar />
        </View>
      </View>
    </View>
  );
}
