import { ScrollView, View } from 'react-native';

import { arrival, clock, duration, route, tickets } from '../data/fly';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; gap: number; radius: number };

/**
 * The fares.
 *
 * **R9: the arrival clock is the departure plus the block time**, so a card
 * cannot print a journey that does not add up - which is the mistake the
 * board's own ticket makes.
 *
 * The rail down the left is the board's own device: a lime strip carrying the
 * carrier's name, rotated. React Native rotates about an element's centre
 * whatever `transformOrigin` says, so the strip is given the full height of
 * the card and rotated about that centre (SS7).
 */
export function TicketList({ margin, height, gap, radius }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: gap }}
    >
      {tickets.map((ticket) => (
        <View
          key={ticket.id}
          style={{
            height,
            borderRadius: radius,
            backgroundColor: ct.white,
            flexDirection: 'row',
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              width: 34,
              backgroundColor: ct.lime,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{ width: height, transform: [{ rotate: '-90deg' }], alignItems: 'center' }}
            >
              <T variant="rail">{ticket.airline.toUpperCase()}</T>
            </View>
          </View>

          <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View>
                <T variant="code">{route.fromCode}</T>
                <T variant="city">{route.fromCity}</T>
              </View>

              <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
                <Glyph name="plane" size={17} color={ct.ink} />
                <T variant="duration">{duration(ticket.durationMin)}</T>
              </View>

              <View style={{ alignItems: 'flex-end' }}>
                <T variant="code">{route.toCode}</T>
                <T variant="city">{route.toCity}</T>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T variant="clock">{clock(ticket.departMin)}</T>
              <T variant="clock">{arrival(ticket)}</T>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: ct.lime,
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 8,
              }}
            >
              {[
                { id: 'seats', label: 'Seats', value: ticket.seats },
                { id: 'terminal', label: 'Terminal', value: ticket.terminal },
                { id: 'gate', label: 'Gate', value: ticket.gate },
              ].map((stub) => (
                <View key={stub.id}>
                  <T variant="stubLabel" style={{ color: ct.onLime }}>
                    {stub.label}
                  </T>
                  <T variant="stubValue">{stub.value}</T>
                </View>
              ))}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
