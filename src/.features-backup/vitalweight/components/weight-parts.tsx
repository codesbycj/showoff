import { useId } from 'react';
import { View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Path, Stop } from 'react-native-svg';

import {
  kg,
  prediction,
  projected,
  screen,
  series,
  stats,
  unit,
} from '../data/weight';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type ChartProps = { margin: number; width: number; height: number; axisH: number };

/**
 * The weight line.
 *
 * **Everything here survives an empty series** (I7 / §5.4). The reveal fills
 * `series` one point at a time, and this is the exact shape that has
 * red-screened a reveal before now: `Math.max(...[])` is `-Infinity`, the
 * coordinate becomes `NaN`, and `react-native-svg` throws. So the component
 * returns `null` below two points and the span is clamped to a minimum.
 *
 * **The ticks bracket the data** (R9): the axis is padded past the real low
 * and high rather than stopping at them, so no part of the line leaves the
 * plot — a nice-tick loop that stops at `max` leaves marks taller than its
 * own axis.
 *
 * **`useId` for the gradient.** `react-native-svg` ids are document-global on
 * web, so two gradients sharing one id make everything render in the first
 * colour (Part 7).
 */
export function WeightChart({ margin, width, height, axisH }: ChartProps) {
  const id = useId();
  const plotW = width - margin * 2;
  const plotH = height - axisH;
  if (series.length < 2 || plotW <= 0 || plotH <= 0) return null;

  const vals = series.map((p) => p.kg);
  const low = Math.min(...vals);
  const high = Math.max(...vals);
  const pad = Math.max((high - low) * 0.3, 0.5);
  const top = high + pad;
  const bottom = low - pad;
  const span = Math.max(top - bottom, 0.5);

  const x = (i: number) => (i / (series.length - 1)) * plotW;
  const y = (v: number) => plotH - ((v - bottom) / span) * plotH;

  const line = series
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(p.kg).toFixed(1)}`)
    .join(' ');
  const area = `${line} L${plotW.toFixed(1)} ${plotH} L0 ${plotH} Z`;

  return (
    <View style={{ marginHorizontal: margin, height }}>
      <Svg width={plotW} height={plotH}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={ct.accent} stopOpacity={0.28} />
            <Stop offset="1" stopColor={ct.accent} stopOpacity={0.02} />
          </LinearGradient>
        </Defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <Line
            key={f}
            x1={0}
            y1={plotH * f}
            x2={plotW}
            y2={plotH * f}
            stroke={ct.hairline}
            strokeWidth={1}
          />
        ))}

        <Path d={area} fill={`url(#${id})`} />
        <Path
          d={line}
          stroke={ct.accent}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>

      <View
        style={{
          height: axisH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {series.map((p) => (
          <T key={p.label} variant="axis">
            {p.label}
          </T>
        ))}
      </View>
    </View>
  );
}

type TitleProps = { margin: number; height: number };

/** "Weight Breakdown". */
export function BreakdownTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{screen.title}</T>
    </View>
  );
}

type GridProps = { margin: number; height: number; gutter: number; radius: number };

/**
 * The four tiles.
 *
 * **Every value is computed from the series the chart plots** (R9). The board
 * prints "Avg Wt 03.7 Kg" beside a current of 67.0 — an average that is not an
 * average of anything on its own screen.
 */
export function StatGrid({ margin, height, gutter, radius }: GridProps) {
  const rows = [stats().slice(0, 2), stats().slice(2)];

  return (
    <View style={{ marginHorizontal: margin, height, gap: gutter }}>
      {rows.map((row) => (
        <View key={row[0]?.id ?? 'empty'} style={{ flex: 1, flexDirection: 'row', gap: gutter }}>
          {row.map((st) => (
            <View
              key={st.id}
              style={{
                flex: 1,
                borderRadius: radius,
                backgroundColor: ct.white,
                paddingHorizontal: 14,
                justifyContent: 'center',
                gap: 2,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Glyph name={st.glyph} size={15} color={ct.accentDeep} strokeWidth={1.7} />
                <T variant="statLabel">{st.label}</T>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
                <T variant="statValue">{kg(st.value)}</T>
                <T variant="statUnit">{unit}</T>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

/** "Weight Predictions". */
export function PredictTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{screen.predictions}</T>
    </View>
  );
}

type PredictProps = { margin: number; height: number; radius: number };

/**
 * What the trend implies.
 *
 * **Mine, not the board's.** The board's prediction card is cut off by the
 * artboard edge with nothing in it but a title, which leaves the screen with a
 * hole where its last block should be. I3's lever for that is the section the
 * board cut.
 *
 * The figure is the trend extrapolated, derived in `data/weight.ts` (R9).
 */
export function PredictCard({ margin, height, radius }: PredictProps) {
  return (
    <View style={{ marginHorizontal: margin, height, padding: 16 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.accentSoft,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1 }}>
          <T variant="statLabel">{prediction.label}</T>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <T variant="predictValue">{kg(projected())}</T>
            <T variant="statUnit">{unit}</T>
          </View>
          <T variant="noteLine">{prediction.note}</T>
        </View>
        <Glyph name="sparkle" size={24} color={ct.accentDeep} />
      </View>
    </View>
  );
}
