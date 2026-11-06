import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Line, Path, Rect, Stop } from 'react-native-svg';

import { ct, sheet, type } from '../theme';
import { axisTop, days, marked, money, ticks } from '../data/activity';
import { T } from './text';

/**
 * The week as bars, with the picked day filled and the rest hatched.
 *
 * **The axis brackets the data.** `axisTop` rounds the largest day up to the
 * next hundred, so the tallest bar is always under the top gridline — a
 * tick loop that stops at the maximum leaves a bar standing above its own
 * axis, which has shipped here before.
 *
 * The tooltip is pinned to the marked bar and prints that bar's own value,
 * so the number and the picture are the same fact. It is clamped inside the
 * plot, and it sits beside the bar rather than over it: a bubble on top of
 * the thing it describes is the collision R3 is about.
 */
export function WeekChart({ width, height }: { width: number; height: number }) {
  const id = useId();
  const fill = `byteBar-${id}`;
  const hatch = `byteHatch-${id}`;

  const axisW = 40;
  const labelH = 22;
  const plotW = width - axisW;
  const plotH = height - labelH;
  const slot = plotW / days.length;
  const barW = Math.min(30, slot * 0.46);

  const x = (i: number) => axisW + slot * i + (slot - barW) / 2;
  const y = (v: number) => plotH - (v / axisTop) * plotH;

  const markIndex = days.findIndex((d) => d.id === marked.id);
  const tipW = 104;
  const tipLeft = Math.min(width - tipW, x(markIndex) + barW + 10);

  return (
    <View style={{ width, height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.tealLit} />
            <Stop offset="1" stopColor="#0B3B39" />
          </LinearGradient>
          <LinearGradient id={hatch} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#EEF1F1" />
            <Stop offset="1" stopColor="#F7F8F8" />
          </LinearGradient>
        </Defs>

        {ticks.map((t) => (
          <Line
            key={t}
            x1={axisW}
            y1={y(t)}
            x2={width}
            y2={y(t)}
            stroke={sheet.hairline}
            strokeWidth={1}
            strokeDasharray="4 5"
          />
        ))}

        {days.map((d, i) => {
          const on = 'on' in d && d.on;
          const top = y(d.value);
          return (
            <Rect
              key={d.id}
              x={x(i)}
              y={top}
              width={barW}
              height={plotH - top}
              rx={barW / 2}
              fill={on ? `url(#${fill})` : `url(#${hatch})`}
            />
          );
        })}

        <Path d={`M${axisW} ${plotH} H${width}`} stroke={sheet.hairline} strokeWidth={1} />
      </Svg>

      {ticks.map((t) => (
        <View key={t} style={{ position: 'absolute', left: 0, top: y(t) - 8, width: axisW - 8 }}>
          <T
            variant="axis"
            color={sheet.muted}
            style={{ height: type.axis.line, textAlign: 'right' }}
          >
            {String(t)}
          </T>
        </View>
      ))}

      <View
        style={{
          position: 'absolute',
          left: axisW,
          right: 0,
          top: plotH + 4,
          flexDirection: 'row',
        }}
      >
        {days.map((d) => {
          const on = 'on' in d && d.on;
          return (
            <View key={d.id} style={{ width: slot, alignItems: 'center' }}>
              <T
                variant={on ? 'axisOn' : 'axis'}
                color={on ? sheet.ink : sheet.muted}
                style={{ height: type.axis.line }}
              >
                {d.label}
              </T>
            </View>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          left: tipLeft,
          top: Math.max(0, y(marked.value) - 6),
          width: tipW,
          height: 34,
          borderRadius: 17,
          backgroundColor: '#17191A',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <T variant="tip" color="#FFFFFF" style={{ height: type.tip.line }}>
          {money(marked.value)}
        </T>
      </View>
    </View>
  );
}
