import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import { markerIndex, markerPoint, series, usd, window } from '../data/stock';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; axisH: number; calloutH: number };

/**
 * The price line.
 *
 * **Everything here survives an empty series** (I7 / §5.4). The reveal fills
 * `series` one point at a time, and this is the exact shape that has
 * red-screened a reveal at step 14 before now:
 *
 *   const top = Math.max(...values);          // -Infinity when values is []
 *   const y = plotTop + plotH - (v / top);    // NaN
 *   <Path d={`M0 ${y}`} />                    // react-native-svg throws
 *
 * So the component returns `null` while the series is too short to plot, the
 * span is clamped to a minimum, and `markerIndex` is clamped to the last point.
 *
 * **The ticks bracket the data** (R9): the axis is padded past the real low and
 * high rather than stopping at them, so no part of the line leaves the plot.
 *
 * **`useId` for the gradient.** `react-native-svg` ids are document-global on
 * web, so two gradients sharing one id make everything render in the first
 * colour (Part 7).
 */
export function PriceChart({ margin, width, height, axisH, calloutH }: Props) {
  const gradient = useId();
  const plotW = width - margin * 2;
  const plotH = height - axisH - calloutH;

  if (series.length < 2 || plotW <= 0 || plotH <= 0) return null;

  const vals = series.map((p) => p.close);
  const low = Math.min(...vals);
  const high = Math.max(...vals);
  // Bracket the data rather than stopping at it, and never divide by zero.
  const pad = Math.max((high - low) * 0.18, 1);
  const top = high + pad;
  const bottom = low - pad;
  const span = Math.max(top - bottom, 1);

  const x = (i: number) => (i / (series.length - 1)) * plotW;
  const y = (v: number) => plotH - ((v - bottom) / span) * plotH;

  const line = series.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(2)} ${y(p.close).toFixed(2)}`).join(' ');
  const area = `${line} L${plotW.toFixed(2)} ${plotH} L0 ${plotH} Z`;

  const mi = Math.min(markerIndex, series.length - 1);
  const mx = x(mi);
  const my = y(series[mi].close);

  return (
    <View style={{ marginHorizontal: margin, height }}>
      <View style={{ height: calloutH, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="callout">{markerPoint ? usd(markerPoint.close) : ''}</T>
          <View style={{ flex: 1 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <T variant="yearPill">{window.year}</T>
            <Glyph name="chevronDown" size={13} color={ct.sub} strokeWidth={2} />
          </View>
        </View>
      </View>

      <View style={{ height: plotH }}>
        <Svg width={plotW} height={plotH}>
          <Defs>
            <LinearGradient id={gradient} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={ct.line} stopOpacity={0.22} />
              <Stop offset="1" stopColor={ct.line} stopOpacity={0.02} />
            </LinearGradient>
          </Defs>

          <Path d={area} fill={`url(#${gradient})`} />
          <Path
            d={line}
            stroke={ct.line}
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* The marker's own rule, drawn to the floor of the plot. */}
          <Line x1={mx} y1={my} x2={mx} y2={plotH} stroke={ct.marker} strokeWidth={1} />
          <Circle cx={mx} cy={my} r={5} fill={ct.marker} />
          <Circle cx={mx} cy={my} r={2} fill={ct.white} />
        </Svg>
      </View>

      <View
        style={{
          height: axisH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {series.map((p) => (
          <T key={p.month} variant="axis">
            {p.month}
          </T>
        ))}
      </View>
    </View>
  );
}
