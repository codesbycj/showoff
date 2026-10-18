import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

// STEP 1.15 what to look for
// import { ChipRow } from '@/features/dropmap/components/chip-row';
// STEP 1.01 the ground
// import { MapArt } from '@/features/dropmap/components/map-art';
// STEP 1.18 and where you are going
// import { RouteSheet } from '@/features/dropmap/components/route-sheet';
// STEP 1.11 a way to search it
// import { SearchBar } from '@/features/dropmap/components/search-bar';
import { search } from '@/features/dropmap/data/route';
import { CHIPS_TOP, MARGIN, SEARCH_TOP } from '@/features/dropmap/layout';
import { dm } from '@/features/dropmap/theme';
import { useInsets } from '@/features/dropmap/use-insets';

/**
 * A courier's route sheet.
 *
 * Assembly only: a map, a way to search it, the places worth filtering for,
 * and a sheet describing where you are going.
 *
 * The map is a layer under everything rather than a background on the page:
 * it has to fill the screen edge to edge, including behind the status bar,
 * and a backgrounded image inside a padded view cannot.
 *
 * Every handler is empty on purpose. The dashboard is its own showcase with
 * its own slug, so there is nothing to push to yet; what matters is that the
 * decision is made here.
 */
export default function DropMap() {
  const insets = useInsets();
  const { width, height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: dm.land }}>
      <StatusBar style="light" />

      <View style={{ position: 'absolute', left: 0, top: 0 }}>
        {/* STEP 1.02 under everything
        <MapArt width={width} height={height} />
        */}
      </View>

      <View style={{ flex: 1 }}>
        {/* STEP 1.12 floating over the map
        <View style={{ paddingTop: insets.top + SEARCH_TOP, paddingHorizontal: MARGIN }}>
          <SearchBar placeholder={search.placeholder} />
        </View>
        */}

        {/* STEP 1.16 under the bar
        <View style={{ marginTop: CHIPS_TOP }}>
          <ChipRow />
        </View>
        */}

        <View style={{ flex: 1 }} />

        {/* STEP 1.19 in a sheet at the foot
        <RouteSheet bottomInset={insets.bottom} />
        */}
      </View>
    </View>
  );
}
