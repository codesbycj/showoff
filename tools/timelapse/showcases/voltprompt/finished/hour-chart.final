import { View } from 'react-native';

import { hours, peak, rise, salesNote } from '../data/data';
import { BAR_WIDTH, PLOT_HEIGHT } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What was taken, hour by hour.
 *
 * Every mark is read from `hours`: the bar heights are the values against the
 * largest of them, the headline is the rise from the first hour to the peak,
 * and the tooltip sits on the hour it names. The reference prints "+360%"
 * over bars that do not move by anything like it, which is what happens when
 * the number and the picture are placed rather than computed.
 */
export function HourChart() {
  const top = Math.max(...hours.map((h) => h.value));
  const money = `$${peak.value.toLocaleString('en-GB')}`;

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="headline" color={vt.onCanvas} style={{ height: type.headline.line }}>
          {rise}
        </T>
        <View
          style={{
            marginLeft: 10,
            paddingHorizontal: 9,
            paddingVertical: 4,
            borderRadius: radius.control,
            backgroundColor: vt.acid,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Glyph name="bolt" size={12} tint={vt.onAcid} />
          <T
            variant="caption"
            color={vt.onAcid}
            style={{ marginLeft: 4, height: type.caption.line }}
          >
            {salesNote}
          </T>
        </View>
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'flex-end', height: PLOT_HEIGHT, marginTop: 16 }}
      >
        {hours.map((h) => (
          <View key={h.id} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            {h.on ? (
              <View style={{ alignItems: 'center', marginBottom: 6 }}>
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: radius.control,
                    backgroundColor: vt.sheet,
                  }}
                >
                  <T variant="tip" color={vt.ink} style={{ height: type.tip.line }}>
                    {money}
                  </T>
                </View>
              </View>
            ) : null}
            <View
              style={{
                width: BAR_WIDTH,
                height: (h.value / top) * (PLOT_HEIGHT - 46),
                borderRadius: radius.control,
                backgroundColor: h.on ? vt.acid : vt.sheet,
              }}
            />
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: 8 }}>
        {hours.map((h) => (
          <View key={h.id} style={{ flex: 1, alignItems: 'center' }}>
            <T variant="caption" color={vt.muted} style={{ height: type.caption.line }}>
              {h.label}
            </T>
          </View>
        ))}
      </View>
    </View>
  );
}
