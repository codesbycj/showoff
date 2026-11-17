import { View } from 'react-native';

import { flight, stubs } from '../data/ticket';
import { arrival, clock } from '../format';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { RouteArc } from './route-arc';
import { T } from './text';

type Props = { height: number; radius: number };

/**
 * The flight itself — the dominant element on the screen (R8).
 *
 * **R9: the arrival clock is computed.** The board prints 01:30 AM at both
 * ends of the same 7h 15m flight; here the destination's clock comes from the
 * departure, the block time and the offset, so the two cannot disagree.
 *
 * The fill is an absolutely-filled child carrying the shadow, so an emptied
 * card paints nothing in frame one (§5.5).
 */
export function FlightCard({ height, radius }: Props) {
  return (
    <View style={{ height }}>
      {/* STEP 1.05 view
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

      <View style={{ flex: 1, paddingHorizontal: 18, paddingVertical: 16 }}>
        {/* STEP 1.06 airline
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: ct.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="lark" size={21} color={ct.ink} />
          </View>

          <T variant="airline" style={{ flex: 1 }} numberOfLines={1}>
            {flight.airline}
          </T>

          <T variant="reference">{flight.reference}</T>
        </View>
        */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
          }}
        >
          {/* STEP 1.07 from code
          <View>
            <T variant="clock">{clock(flight.departMin)}</T>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              <T variant="code">{flight.fromCode}</T>
              <T variant="city">{flight.fromCity}</T>
            </View>
          </View>
          */}

          {/* STEP 1.08 route arc
          <RouteArc minutes={flight.durationMin} />
          */}

          {/* STEP 1.09 to code
          <View style={{ alignItems: 'flex-end' }}>
            <T variant="clock">{arrival(flight.departMin, flight.durationMin, flight.offsetMin)}</T>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
              <T variant="code">{flight.toCode}</T>
              <T variant="city">{flight.toCity}</T>
            </View>
          </View>
          */}
        </View>

        {/* STEP 1.10 view
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <View style={{ height: 1, backgroundColor: ct.dash, opacity: 0.8 }} />
        </View>
        */}

        {/* STEP 1.11 label
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {stubs.map((stub) => (
            <View key={stub.id}>
              <T variant="stub">{stub.label}</T>
              <T variant="stubValue">{stub.value}</T>
            </View>
          ))}
        </View>
        */}
      </View>
    </View>
  );
}
