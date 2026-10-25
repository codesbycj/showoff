import { Pressable, View } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

import { strip, tickets } from '../data/search';
import { CARD_PAD, TICKET_HEIGHT, TICKET_PEEK } from '../layout';
import { radius, rv, type } from '../theme';
import { T } from './text';

/**
 * The tickets you could take, stacked.
 *
 * The front one is whole and the two behind it are only their top edge —
 * drawn as short cards, not as full ones pulled up. React Native paints in
 * document order, so pulling each card over the last puts the *later*
 * siblings on top and the ticket you are looking at ends up underneath the
 * two behind it. A card that is not the front one is only ever its own top
 * edge, so it is built as exactly that.
 *
 * The duration between the two times is computed in the data, not written
 * beside it: the reference prints 8:15, 18:15 and "1hr 30m" on one ticket.
 */
export function TicketStack() {
  const fill = (tone: string) =>
    tone === 'rose' ? rv.rose : tone === 'violet' ? rv.violet : rv.butter;
  const ink = (tone: string) => (tone === 'butter' ? rv.canvas : rv.ink);

  return (
    <View>
      {tickets.map((t, i) => {
        const front = i === tickets.length - 1;
        return (
          <Pressable
            key={t.id}
            accessibilityRole="button"
            accessibilityLabel={t.from + ' to ' + t.to + ', ' + t.out}
            style={{ marginTop: i === 0 ? 0 : 10 }}
          >
            <View
              style={{
                height: front ? TICKET_HEIGHT : TICKET_PEEK,
                borderRadius: radius.card,
                backgroundColor: fill(t.tone),
                paddingHorizontal: CARD_PAD,
                paddingTop: 14,
                overflow: 'hidden',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View>
                  <T variant="code" color={ink(t.tone)} style={{ height: type.code.line }}>
                    {t.from}
                  </T>
                  <T variant="time" color={ink(t.tone)} style={{ height: type.time.line }}>
                    {t.out}
                  </T>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: radius.pill,
                      backgroundColor: rv.canvas,
                    }}
                  >
                    <T variant="dur" color={rv.ink} style={{ height: type.dur.line }}>
                      {t.dur}
                    </T>
                  </View>
                  <Svg width={110} height={10} style={{ marginTop: 4 }}>
                    <Line
                      x1={6}
                      y1={5}
                      x2={104}
                      y2={5}
                      stroke={ink(t.tone)}
                      strokeWidth={1.4}
                      strokeDasharray="4 4"
                      opacity={0.6}
                    />
                    <Circle cx={4} cy={5} r={3} fill={ink(t.tone)} />
                    <Circle cx={106} cy={5} r={3} fill={ink(t.tone)} />
                  </Svg>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <T variant="code" color={ink(t.tone)} style={{ height: type.code.line }}>
                    {t.to}
                  </T>
                  <T variant="time" color={ink(t.tone)} style={{ height: type.time.line }}>
                    {t.back}
                  </T>
                </View>
              </View>

              {front ? (
                <>
                  <T
                    variant="radio"
                    color={ink(t.tone)}
                    style={{ marginTop: 14, textAlign: 'center', height: type.radio.line }}
                  >
                    {t.date}
                  </T>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      marginHorizontal: -CARD_PAD,
                      paddingVertical: 11,
                      backgroundColor: rv.canvas,
                      alignItems: 'center',
                    }}
                  >
                    <T variant="strip" color={rv.body} style={{ height: type.strip.line }}>
                      {strip}
                    </T>
                  </View>
                </>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
