import { StatusBar } from 'expo-status-bar';
import { useWindowDimensions, View } from 'react-native';

import { BookBar } from '@/features/rentaxcar/components/book-bar';
import { CarFront } from '@/features/rentaxcar/components/car-front';
import { DetailSheet } from '@/features/rentaxcar/components/detail-sheet';
import { Scrubber } from '@/features/rentaxcar/components/scrubber';
import { StageHeader } from '@/features/rentaxcar/components/stage-header';
import { T } from '@/features/rentaxcar/components/text';
import { car } from '@/features/rentaxcar/data/car';
import {
  BAR_TOP,
  CAPTION_TOP,
  CAR_TOP,
  HEADER_TOP,
  MARGIN,
  SCRUB_TOP,
  STAGE_BOTTOM,
} from '@/features/rentaxcar/layout';
import { rx } from '@/features/rentaxcar/theme';
import { useInsets } from '@/features/rentaxcar/use-insets';

/**
 * RentaX — car details.
 *
 * Assembly only: a yellow stage with the car on it, a dark sheet carrying what
 * the car is, and a bar at the foot with the price and the booking.
 *
 * The page is two halves rather than a scroll, which is what the reference is
 * — the stage is sized from its own content and the sheet takes the rest with
 * `flex: 1`, so the whole thing fits one screen on a tall phone and the sheet
 * gives first on a short one.
 *
 * Every handler is empty on purpose. The browse screen is its own showcase
 * with its own slug, so there is nothing to push to yet; what matters is that
 * the decision is made here.
 */
export default function RentaxCar() {
  const insets = useInsets();
  const { width } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: rx.canvas }}>
      <StatusBar style="dark" />

      <View
        style={{
          backgroundColor: rx.stage,
          paddingTop: insets.top + HEADER_TOP,
          paddingHorizontal: MARGIN,
          paddingBottom: STAGE_BOTTOM,
        }}
      >
        <StageHeader title={car.title} />

        <View style={{ marginTop: CAPTION_TOP, alignItems: 'center' }}>
          <T variant="caption" color={rx.onStageMuted}>
            {car.caption}
          </T>
        </View>

        <View style={{ marginTop: CAR_TOP, alignItems: 'center' }}>
          <CarFront width={width * 0.88} />
        </View>

        <View style={{ marginTop: SCRUB_TOP, paddingHorizontal: 40 }}>
          <Scrubber position={0.5} />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <DetailSheet />
      </View>

      <View
        style={{
          paddingHorizontal: MARGIN,
          paddingTop: BAR_TOP,
          paddingBottom: insets.bottom + 8,
          backgroundColor: rx.canvas,
        }}
      >
        <BookBar price={car.price} unit={car.priceUnit} action={car.action} />
      </View>
    </View>
  );
}
