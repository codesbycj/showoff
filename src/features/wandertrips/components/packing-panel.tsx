import { View } from 'react-native';

import { ct, type } from '../theme';
import { copy, itinerary, packedPct } from '../data/trips';
import { T } from './text';

/**
 * How ready the bag is, and where the trip goes.
 *
 * **The percentage is counted, not typed.** It is the share of the itinerary
 * that is packed for, so the big blue number and the list beside it cannot
 * disagree — which is the whole of R9 in one block.
 *
 * Both panels take the height they are given, so the pair ends on the dock
 * rather than leaving a band of page under the last stop.
 */
export function PackingPanel({ height }: { height: number }) {
  const rowH = Math.floor((height - 56) / itinerary.length);

  return (
    <View style={{ height, flexDirection: 'row' }}>
      <View
        style={{
          width: '34%',
          height,
          borderRadius: 18,
          backgroundColor: ct.blue,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="pct" color={ct.onBlue} style={{ height: type.pct.line }}>
          {`${packedPct}%`}
        </T>
        <T variant="pctNote" color="rgba(255,255,255,0.9)" style={{ height: type.pctNote.line }}>
          {copy.packed}
        </T>
      </View>

      <View
        style={{
          flex: 1,
          height,
          marginLeft: 12,
          borderRadius: 18,
          backgroundColor: '#F2F3F5',
          paddingHorizontal: 16,
          paddingTop: 16,
        }}
      >
        <T variant="listHead" color={ct.ink} style={{ height: type.listHead.line }}>
          {copy.itinerary}
        </T>

        <View style={{ marginTop: 6 }}>
          {itinerary.map((stop) => (
            <View
              key={stop.id}
              style={{ height: rowH, flexDirection: 'row', alignItems: 'center' }}
            >
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 4,
                  backgroundColor: stop.packed ? ct.blue : '#C3C6CC',
                }}
              />
              <T
                variant="day"
                color={ct.ink}
                style={{ height: type.day.line, marginLeft: 9, minWidth: 46 }}
              >
                {stop.day}
              </T>
              <T
                variant="stop"
                color={ct.muted}
                numberOfLines={1}
                style={{ flex: 1, height: type.stop.line, marginLeft: 6 }}
              >
                {stop.place}
              </T>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
