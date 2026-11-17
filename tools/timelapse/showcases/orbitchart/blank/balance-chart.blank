import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Polygon, Stop } from 'react-native-svg';

import { axis, peak, series } from '../data/chart';
import { ct } from '../theme';
import { T } from './text';

type Props = { width: number; height: number };

/**
 * Thirty days of balance.
 *
 * **R9 in three places.** The gridlines bracket the data rather than stopping
 * at its maximum; the marker pill reads the value of the point it sits on; and
 * the line's last point is the balance printed above it.
 *
 * **Everything is guarded for an empty series** (I7): the reveal stages
 * `series` one point at a time, so a `Math.max` over nothing would be
 * `-Infinity`, every y would be `NaN`, and `react-native-svg` would throw. The
 * block returns its own grid and nothing else until there are points to draw.
 */
export function BalanceChart({ width, height }: Props) {
  const gid = useId();

  const padL = 34;
  const padR = 10;
  const padT = 26;
  const padB = 18;

  const plotW = Math.max(width - padL - padR, 1);
  const plotH = Math.max(height - padT - padB, 1);

  const { lo, hi, ticks } = axis(series);
  const span = Math.max(hi - lo, 1);

  const x = (i: number) => padL + (plotW * i) / Math.max(series.length - 1, 1);
  const y = (value: number) => padT + plotH - ((value - lo) / span) * plotH;

  const top = peak(series);
  const topIndex = top ? series.findIndex((point) => point.day === top.day) : -1;

  const line = series
    .map((point, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(point.value)}`)
    .join(' ');
  const area =
    series.length > 0
      ? `${line} L${x(series.length - 1)} ${padT + plotH} L${x(0)} ${padT + plotH} Z`
      : '';

  const last = series.length > 0 ? series[series.length - 1] : null;

  return (
    <View style={{ height }}>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.accent} stopOpacity="0.34" />
            <Stop offset="1" stopColor={ct.accent} stopOpacity="0.02" />
          </LinearGradient>
        </Defs>

        {/* STEP 1.07 line
        {ticks.map((tick) => (
          <Line
            key={tick}
            x1={padL}
            y1={y(tick)}
            x2={width - padR}
            y2={y(tick)}
            stroke={ct.line}
            strokeWidth={1}
            strokeDasharray="2 5"
          />
        ))}
        */}

        {/* STEP 1.08 path
        {area ? <Path d={area} fill={`url(#${gid})`} /> : null}
        */}
        {/* STEP 1.09 path
        {series.length > 1 ? (
          <Path d={line} stroke={ct.accent} strokeWidth={2.4} fill="none" strokeLinejoin="round" />
        ) : null}
        */}

        {/* STEP 1.10 line
        {top && topIndex >= 0 ? (
          <>
            <Line
              x1={x(topIndex)}
              y1={padT - 10}
              x2={x(topIndex)}
              y2={padT + plotH}
              stroke={ct.accent}
              strokeWidth={1}
              strokeDasharray="3 4"
            />
            <Circle cx={x(topIndex)} cy={y(top.value)} r={4.5} fill={ct.accent} />
          </>
        ) : null}
        */}

        {/* STEP 1.11 polygon
        {last ? (
          <Polygon
            points={`${x(series.length - 1) - 5},${y(last.value) - 6} ${x(series.length - 1) + 5},${y(last.value) - 6} ${x(series.length - 1)},${y(last.value) + 4}`}
            fill={ct.accent}
          />
        ) : null}
        */}
      </Svg>

      {/* STEP 1.12 view
      {ticks.map((tick) => (
        <View key={tick} style={{ position: 'absolute', left: 0, top: y(tick) - 8 }}>
          <T variant="tick">{tick >= 1000 ? `${tick / 1000}k` : tick}</T>
        </View>
      ))}
      */}

      {/* STEP 1.13 view
      {top && topIndex >= 0 ? (
        <View
          style={{
            position: 'absolute',
            left: Math.min(Math.max(x(topIndex) - 44, 2), width - 92),
            top: Math.max(y(top.value) - 34, 0),
          }}
        >
          <View
            style={{
              height: 28,
              paddingHorizontal: 12,
              borderRadius: 14,
              backgroundColor: ct.accentDeep,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="marker">${top.value.toLocaleString('en-US')}</T>
          </View>
        </View>
      ) : null}
      */}

      {/* STEP 1.14 day
      {top && topIndex >= 0 ? (
        <View style={{ position: 'absolute', left: Math.max(x(topIndex) - 20, 2), top: 0 }}>
          <T variant="tick">{top.day}</T>
        </View>
      ) : null}
      */}
    </View>
  );
}
