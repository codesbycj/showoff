import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { FLIGHT_CARD_H, TRIP_CARD_H } from '../layout';
import { ct, type } from '../theme';
import { copy, flight, trip } from '../data/trips';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The flag disc.
 *
 * Drawn, not an emoji: flags are the single worst case for emoji across
 * platforms — Windows has no flag glyphs at all, so the web harness would
 * show two letters where Android shows a flag, and the harness is where this
 * gets checked.
 */
function JapanFlag({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 44 44">
      <Circle cx="22" cy="22" r="22" fill="#FFFFFF" />
      <Circle cx="22" cy="22" r="9.5" fill="#BC002D" />
    </Svg>
  );
}

/** Where, when, and whether it is paid for. */
export function TripCard() {
  return (
    <View
      style={{
        height: TRIP_CARD_H,
        borderRadius: 16,
        backgroundColor: '#F2F3F5',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <JapanFlag size={30} />
      </View>

      <View style={{ flex: 1, marginLeft: 14 }}>
        <T variant="country" color={ct.ink} style={{ height: type.country.line }}>
          {trip.country}
        </T>
        <T variant="tripMeta" color={ct.muted} style={{ height: type.tripMeta.line, marginTop: 1 }}>
          {`${trip.dates} · ${trip.nights} nights`}
        </T>
      </View>

      <View
        style={{
          height: 30,
          paddingHorizontal: 12,
          borderRadius: 10,
          backgroundColor: ct.blueSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="chip" color={ct.blue} style={{ height: type.chip.line }}>
          {copy.booked}
        </T>
      </View>
    </View>
  );
}

/** The leg itself, with the two airports pinned to the card's edges. */
export function FlightCard() {
  return (
    <View
      style={{
        height: FLIGHT_CARD_H,
        borderRadius: 16,
        backgroundColor: '#F2F3F5',
        paddingHorizontal: 16,
        justifyContent: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <T variant="iata" color={ct.ink} style={{ height: type.iata.line }}>
            {flight.from}
          </T>
          <T variant="city" color={ct.muted} style={{ height: type.city.line }}>
            {flight.fromCity}
          </T>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D7D9DD' }} />
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: ct.blue,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="plane" size={17} tint={ct.onBlue} />
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#D7D9DD' }} />
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <T variant="iata" color={ct.ink} style={{ height: type.iata.line }}>
            {flight.to}
          </T>
          <T variant="city" color={ct.muted} style={{ height: type.city.line }}>
            {flight.toCity}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
        <T variant="leg" color={ct.ink} style={{ flex: 1, height: type.leg.line }}>
          {flight.departs}
        </T>
        <T variant="leg" color={ct.muted} style={{ height: type.leg.line }}>
          {flight.duration}
        </T>
      </View>
    </View>
  );
}
