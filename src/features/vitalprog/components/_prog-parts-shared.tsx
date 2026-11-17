import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import {
  calorieRow,
  calorieSeries,
  calories,
  dayLabels,
  kmShare,
  leaderboard,
  pct,
  screen,
  share,
  trends,
  type Trend,
} from '../data/programs';
import { ct } from '../theme';
import { T } from './text';

export const TINT = { blush: ct.blush, mint: ct.mint, lilac: ct.lilac } as const;

export type SparkProps = { width: number; height: number };

/**
 * The calorie sparkline.
 *
 * **Survives an empty series** (I7): the reveal fills `calorieSeries` one
 * entry at a time, and `Math.max(...[])` is `-Infinity`, which becomes a `NaN`
 * coordinate and throws inside `react-native-svg`.
 */
export function Sparkline({ width, height }: SparkProps) {
  if (calorieSeries.length < 2 || width <= 0 || height <= 0) return null;
  const low = Math.min(...calorieSeries);
  const high = Math.max(...calorieSeries);
  const span = Math.max(high - low, 1);
  const x = (i: number) => (i / (calorieSeries.length - 1)) * width;
  const y = (v: number) => height - ((v - low) / span) * height;

  return (
    <Svg width={width} height={height}>
      <Path
        d={calorieSeries
          .map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
          .join(' ')}
        stroke={ct.accent}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {calorieSeries.map((v, i) => (
        <Circle key={i} cx={x(i)} cy={y(v)} r={2.2} fill={ct.accent} />
      ))}
    </Svg>
  );
}

export type CalorieProps = { margin: number; height: number; radius: number; sparkW: number };

export type TitleProps = { margin: number; height: number };

export type BannerProps = { margin: number; height: number; radius: number };

export function WeekTicks({ week }: { week: boolean[] }) {
  return (
    <View style={{ flexDirection: 'row', gap: 6 }}>
      {week.map((done, i) => (
        <View key={i} style={{ alignItems: 'center', gap: 3 }}>
          <View
            style={{
              width: 5,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: done ? ct.accent : ct.hairline,
            }}
          />
          <T variant="dayTick">{dayLabels[i] ?? ''}</T>
        </View>
      ))}
    </View>
  );
}

export type TrendProps = { margin: number; height: number; rowH: number; radius: number };
