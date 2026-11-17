import { Pressable, View } from 'react-native';

import { axisLabel, header, months, ticks } from '../data/activity';
import { ct } from '../theme';
import { Folder } from './folder';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number };

const NOTCH_W = 108;
const NOTCH_H = 36;
const PILL_H = 30;
/** The visual pill is 30dp; the control around it is 44 (I2 / R7). */
const TAP_H = 44;

/**
 * What was spent, month by month.
 *
 * **The picture agrees with the numbers** (R9): every bar is scaled against
 * the axis top, and the axis top is the first round thousand at or above the
 * tallest bar - so a bar can never out-reach its own gridline, which is what
 * a nice-tick loop that stops at `max` produces.
 *
 * Everything derived from `months` survives that array being empty, because
 * the reveal fills it one bar at a time (I7).
 */
export function SpendChart({ margin, width, height }: Props) {
  const scale = ticks();
  const top = scale[scale.length - 1];

  const padTop = NOTCH_H + 10;
  const padBottom = 34;
  const axisW = 34;
  const plotH = Math.max(40, height - padTop - padBottom);

  return (
    <View style={{ marginHorizontal: margin, height }}>
      <Folder width={width} height={height} fill={ct.navy} notchW={NOTCH_W} notchH={NOTCH_H}>
        <View style={{ flexDirection: 'row', marginTop: padTop, marginHorizontal: 16 }}>
          <View style={{ width: axisW, height: plotH, justifyContent: 'space-between' }}>
            {[...scale].reverse().map((tick) => (
              <T key={tick} variant="axis">
                {axisLabel(tick)}
              </T>
            ))}
          </View>

          {/* STEP 1.07 label
          <View style={{ flex: 1 }}>
            <View style={{ height: plotH, justifyContent: 'space-between' }}>
              {scale.map((tick) => (
                <View key={tick} style={{ height: 1, backgroundColor: '#22304A' }} />
              ))}
            </View>

            <View
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: plotH,
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
              }}
            >
              {months.map((month) => (
                <View
                  key={month.id}
                  style={{
                    width: 14,
                    height: Math.max(4, (month.value / top) * plotH),
                    borderRadius: 7,
                    backgroundColor: ct.lime,
                  }}
                />
              ))}
            </View>

            <View
              style={{
                height: padBottom,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              {months.map((month) => (
                <T key={month.id} variant="axis">
                  {month.label}
                </T>
              ))}
            </View>
          </View>
          */}
        </View>
      </Folder>

      {/* STEP 1.08 range
      <View style={{ position: 'absolute', right: 0, top: (PILL_H - TAP_H) / 2 }}>
        <Pressable accessibilityRole="button" accessibilityLabel={`Range: ${header.range}`}>
          <View
            style={{
              width: NOTCH_W - 12,
              height: TAP_H,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: NOTCH_W - 12,
                height: PILL_H,
                borderRadius: PILL_H / 2,
                backgroundColor: ct.lime,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <T variant="chip">{header.range}</T>
              <Glyph name="chevronDown" size={13} color={ct.ink} strokeWidth={1.9} />
            </View>
          </View>
        </Pressable>
      </View>
      */}
    </View>
  );
}
