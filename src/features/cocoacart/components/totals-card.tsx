import { Image, View } from 'react-native';

import { delivery, money, total, totals } from '../data/cart';
import { ct } from '../theme';
import { T } from './text';

type Props = { height: number; radius: number };

/**
 * What it comes to.
 *
 * **R9: the total is the lines plus delivery**, computed here rather than
 * typed, so it cannot disagree with the rows above it.
 *
 * The product thumbnails are inset so they cannot run under the figures - a
 * surface that straddles text is the shape `audit.js` reports as COVERED, and
 * covering text is a FAIL (R3).
 */
export function TotalsCard({ height, radius }: Props) {
  return (
    <View style={{ height, borderRadius: radius, backgroundColor: ct.yellow, overflow: 'hidden' }}>
      {/* STEP 1.14 image
      <Image
        source={totals.image}
        style={{
          position: 'absolute',
          right: -10,
          bottom: -14,
          width: height,
          height: height,
          opacity: 0.9,
        }}
        resizeMode="cover"
      />
      */}

      <View style={{ paddingLeft: 16, paddingTop: 14, paddingRight: height * 0.9 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* STEP 1.15 label
          <T variant="totalLabel">{delivery.label}</T>
          */}
          {/* STEP 1.16 t
          <T variant="totalLabel">{money(delivery.amount)}</T>
          */}
        </View>

        <View style={{ height: 10 }} />
        {/* STEP 1.17 label
        <T variant="totalLabel">{totals.label}</T>
        */}
        {/* STEP 1.18 t
        <T variant="totalBig">{money(total())}</T>
        */}
      </View>
    </View>
  );
}
