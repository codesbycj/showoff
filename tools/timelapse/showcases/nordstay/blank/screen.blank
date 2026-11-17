import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.17 import amenities
// import { Amenities } from '@/features/nordstay/components/amenities';
// STEP 1.27 import check in notes
// import { CheckInNotes } from '@/features/nordstay/components/check-in-notes';
// STEP 1.01 import gallery
// import { Gallery } from '@/features/nordstay/components/gallery';
// STEP 1.08 import gallery controls
// import { GalleryControls } from '@/features/nordstay/components/gallery-controls';
// STEP 1.14 import host row
// import { HostRow } from '@/features/nordstay/components/host-row';
// STEP 1.29 import price bar
// import { PriceBar } from '@/features/nordstay/components/price-bar';
// STEP 1.11 import stay title
// import { StayTitle } from '@/features/nordstay/components/stay-title';
import { useLayout } from '@/features/nordstay/layout';
import { ct } from '@/features/nordstay/theme';

/**
 * Nordvik — listing.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The price bar is pinned over the detail rows and clears the home indicator
 * on its own, so nothing here adds `insets.bottom` to it a second time (R1b).
 */
export default function NordstayScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.surface }}>
      <StatusBar style="light" />

      {/* STEP 1.01 gallery
      <Gallery width={L.W} height={L.gallery.h} radius={L.gallery.radius} />
      */}

      {/* STEP 1.08 gallery controls
      <GalleryControls
        margin={L.margin}
        top={L.insets.top + 4}
        size={L.gallery.control}
        onClose={() => router.push('/nordsearch')}
      />
      */}

      <View style={{ height: L.gapTitle }} />
      {/* STEP 1.11 stay title
      <StayTitle margin={L.margin} height={L.titleH} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.14 host row
      <HostRow margin={L.margin} height={L.hostH} />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.17 amenities
      <Amenities
        margin={L.margin}
        titleH={L.amenity.titleH}
        chipH={L.amenity.chipH}
        gap={L.amenity.chipGap}
      />
      */}

      <View style={{ height: L.gapRow }} />
      {/* STEP 1.27 check in notes
      <CheckInNotes margin={L.margin} rowH={L.noteH} gap={L.gapNotes} />
      */}

      {/* STEP 1.32 a stray gap above it | FIX 1.33 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.29 price bar
      <PriceBar margin={L.margin} height={L.bar.h} bottom={L.bar.bottom} radius={L.bar.radius} />
      */}
    </View>
  );
}
