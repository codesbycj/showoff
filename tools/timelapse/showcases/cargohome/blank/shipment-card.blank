import { Pressable, View } from 'react-native';

import { Parcel } from './parcel-stack';
import { ProgressTrack } from './progress-track';
import { T } from './text';
import type { Shipment } from '../data/home';
import { SHIPMENT_CARD_H, SHIPMENT_PARCEL } from '../layout';
import { radius, cg } from '../theme';

/**
 * One consignment in the recent list.
 *
 * The same shape as the tracking card above it at two thirds the size and in
 * grey rather than yellow, which is what makes the yellow one read as *the*
 * one rather than simply the first.
 */
export function ShipmentCard({
  shipment,
  onPress,
}: {
  shipment: Shipment;
  onPress?: (s: Shipment) => void;
}) {
  return (
    <Pressable
      onPress={() => onPress?.(shipment)}
      accessibilityRole="button"
      accessibilityLabel={`${shipment.code}, ${shipment.status}, ${shipment.dateLabel} ${shipment.date}`}
    >
      <View
        style={{
          height: SHIPMENT_CARD_H,
          borderRadius: radius.tile,
          backgroundColor: cg.tile,
          overflow: 'hidden',
          padding: 16,
        }}
      >
        <View style={{ width: '62%', gap: 10 }}>
          {/* STEP 1.23 what stage it is at
          <View
            style={{
              alignSelf: 'flex-start',
              borderRadius: radius.full,
              backgroundColor: cg.chip,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <T variant="chip" color={cg.ink}>
              {shipment.status}
            </T>
          </View>
          */}

          {/* STEP 1.24 which consignment
          <T variant="value" color={cg.ink}>
            {shipment.code}
          </T>
          */}

          {/* STEP 1.25 and when it lands
          <View>
            <T variant="caption" color={cg.label}>
              {shipment.dateLabel}
            </T>
            <T variant="value" color={cg.ink} style={{ marginTop: 1 }}>
              {shipment.date}
            </T>
          </View>
          */}
        </View>

        {/* STEP 1.26 one box this time, not a stack
        <View style={{ position: 'absolute', right: -4, top: 10 }} pointerEvents="none">
          <Parcel size={SHIPMENT_PARCEL} />
        </View>
        */}

        {/* STEP 1.27 the same route, on white
        <View style={{ position: 'absolute', left: 16, right: 16, bottom: 10 }}>
          <ProgressTrack progress={shipment.progress} tone="onWhite" />
        </View>
        */}
      </View>
    </Pressable>
  );
}
