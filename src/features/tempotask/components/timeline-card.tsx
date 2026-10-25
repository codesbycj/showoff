import { View } from 'react-native';

import { copy, days, marker, timeline } from '../data/task';
import { CARD_PAD, TIMELINE_HEIGHT } from '../layout';
import { radius, shadow, tp, type } from '../theme';
import { CardHead } from './card-head';
import { T } from './text';

/**
 * What ran when: three overlapping bars on the same six days the chart uses.
 *
 * Each bar's start and end are shares of the axis, so the two cards are on one
 * scale and the marker line stands on the same day in both. A Gantt drawn from
 * dp offsets cannot make that promise.
 *
 * The marker is in flow behind the bars rather than at a negative z-index: a
 * negative-z child paints below its own parent's background, so the line would
 * vanish under the card and still measure correctly.
 *
 * The card takes `flex: 1` rather than its nominal height. The stack above it
 * is fixed, so whatever rounding the header and the gaps actually come to, the
 * last card absorbs it and the screen still reaches its own bottom edge —
 * which a fixed height got wrong by 56dp on the first pass.
 *
 * The day the card is about is painted behind the bars rather than
 * between them, so the bars keep an even rhythm.
 */
export function TimelineCard() {
  const tone = (t: string) => (t === 'orange' ? tp.orange : t === 'green' ? tp.green : tp.blue);

  return (
    <View
      style={{
        flex: 1,
        minHeight: TIMELINE_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: tp.card,
        padding: CARD_PAD,
        ...shadow.card,
      }}
    >
{/* STEP 1.18 the card names itself
      <CardHead title={copy.timeline} />
*/}

      <View style={{ flex: 1, marginTop: 16 }}>
{/* STEP 1.19 the bars
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${marker * 100}%`,
              width: 2,
              backgroundColor: tp.orange,
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 11,
                height: 11,
                borderRadius: radius.control,
                backgroundColor: tp.card,
                borderWidth: 2.4,
                borderColor: tp.orange,
                marginTop: -5,
              }}
            />
          </View>

          {timeline.map((b, i) => (
            <View
              key={b.id}
              style={{
                position: 'absolute',
                // spread down whatever height the card was given, rather than
                // stepping by a fixed 40dp — the card flexes, so a dp step
                // leaves a hole under the last bar on a taller screen
                top: `${8 + i * 28}%`,
                left: `${b.from * 100}%`,
                right: `${(1 - b.to) * 100}%`,
                height: 28,
                borderRadius: radius.pill,
                backgroundColor: tone(b.tone),
                justifyContent: 'center',
                paddingHorizontal: 12,
              }}
            >
              <T
                variant="bar"
                color={tp.onDark}
                numberOfLines={1}
                style={{ height: type.bar.line }}
              >
                {b.label}
              </T>
            </View>
          ))}
        </View>
*/}

{/* STEP 1.20 and the hours
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {days.map((d) => (
            <View key={d.day} style={{ flex: 1, alignItems: 'center' }}>
              <T
                variant={d.peak ? 'axisOn' : 'axis'}
                color={d.peak ? tp.ink : tp.muted}
                style={{ height: type.axis.line }}
              >
                {d.day}
              </T>
            </View>
          ))}
        </View>
*/}
      </View>
    </View>
  );
}
