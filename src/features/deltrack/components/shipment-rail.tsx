import { ScrollView, View } from 'react-native';

import { SHIPMENT_CARD_WIDTH, ShipmentCard } from './shipment-card';
import type { Shipment } from '../data/home';
import { SP } from '../theme';

/**
 * The Current Shipment rail.
 *
 * A horizontal scroll view, not a wrap: the reference shows its second card
 * cut off by the right edge of the screen, and only a row that runs off the
 * edge can do that. Cards are 245dp on an 18dp gap, which puts the second
 * one's left edge at 279 — 114dp of it showing, as in the reference.
 */
export function ShipmentRail({
  shipments,
  onSelect,
}: {
  shipments: readonly Shipment[];
  onSelect?: (key: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={SHIPMENT_CARD_WIDTH + 18}
      decelerationRate="fast"
    >
      {/* The row lives in a child rather than in `contentContainerStyle`.
          `horizontal` lays a ScrollView out as a row on the device, but the
          web build the preview harness renders ignores the prop and stacks
          the cards — and that silence is exactly what the harness exists to
          catch. An explicit row is right on both. */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          paddingHorizontal: SP.margin,
          gap: 18,
        }}
      >
        {shipments.map((s) => (
          <ShipmentCard
            key={s.key}
            title={s.title}
            product={s.product}
            badge={s.badge}
            date={s.date}
            dateLabel={s.dateLabel}
            tracking={s.tracking}
            trackingLabel={s.trackingLabel}
            carrier={s.carrier}
            onPress={() => onSelect?.(s.key)}
            onCarrier={() => onSelect?.(s.key)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
