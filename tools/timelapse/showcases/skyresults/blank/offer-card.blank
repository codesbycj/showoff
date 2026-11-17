import { Pressable, View } from 'react-native';

import { card, type Offer } from '../data/results';
import { arrival, clock } from '../format';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { RouteArc } from './route-arc';
import { T } from './text';

type Props = { offer: Offer; width: number; height: number; radius: number; onPress?: () => void };

/**
 * One fare.
 *
 * **R9: the arrival clock is computed** from the departure, the block time and
 * the destination's offset — the board prints the same 07:47 → 14:30 under
 * three different durations.
 *
 * The carrier's mark is drawn, not traced: a mark is an idea, and every
 * airline here is invented (I1, I4).
 */
export function OfferCard({ offer, width, height, radius, onPress }: Props) {
  return (
    <View style={{ width, height }}>
      {/* STEP 1.13 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.surface,
          shadowColor: '#0B1220',
          shadowOpacity: 0.07,
          shadowRadius: 16,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        }}
      />
      */}

      <View style={{ flex: 1, paddingHorizontal: 18, paddingTop: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          {/* STEP 1.14 glyph
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 21,
              backgroundColor: offer.tint,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name={offer.mark} size={22} color={ct.ink} strokeWidth={1.6} />
          </View>
          */}

          {/* STEP 1.15 airline
          <T variant="airline" style={{ flex: 1 }} numberOfLines={1}>
            {offer.airline}
          </T>
          */}

          {/* STEP 1.16 "CHEAPEST"
          {offer.best ? <T variant="flag">CHEAPEST</T> : null}
          */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <View>
            {/* STEP 1.17 t
            <T variant="clock">{clock(offer.departMin)}</T>
            */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              {/* STEP 1.18 from code
              <T variant="code">{offer.fromCode}</T>
              */}
              {/* STEP 1.19 from city
              <T variant="city">{offer.fromCity}</T>
              */}
            </View>
          </View>

          {/* STEP 1.20 route arc
          <RouteArc minutes={offer.durationMin} />
          */}

          <View style={{ alignItems: 'flex-end' }}>
            {/* STEP 1.21 t
            <T variant="clock">{arrival(offer.departMin, offer.durationMin, offer.offsetMin)}</T>
            */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              {/* STEP 1.22 to code
              <T variant="code">{offer.toCode}</T>
              */}
              {/* STEP 1.23 to city
              <T variant="city">{offer.toCity}</T>
              */}
            </View>
          </View>
        </View>

        {/* STEP 1.24 view
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ height: 1, backgroundColor: ct.dash, opacity: 0.8 }} />
        </View>
        */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
          }}
        >
          <View>
            {/* STEP 1.25 t
            <T variant="price">${offer.price}</T>
            */}
            {/* STEP 1.26 per
            <T variant="per">{card.per}</T>
            */}
          </View>

          {/* STEP 1.27 cta
          <Pressable accessibilityRole="button" accessibilityLabel={card.cta} onPress={onPress}>
            <View
              style={{
                height: 46,
                paddingHorizontal: 22,
                borderRadius: 23,
                backgroundColor: ct.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="cta">{card.cta}</T>
            </View>
          </Pressable>
          */}
        </View>
      </View>
    </View>
  );
}
