import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

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
import { Glyph } from './glyph';
import { T } from './text';

const TINT = { blush: ct.blush, mint: ct.mint, lilac: ct.lilac } as const;

type SparkProps = { width: number; height: number };

/**
 * The calorie sparkline.
 *
 * **Survives an empty series** (I7): the reveal fills `calorieSeries` one
 * entry at a time, and `Math.max(...[])` is `-Infinity`, which becomes a `NaN`
 * coordinate and throws inside `react-native-svg`.
 */
function Sparkline({ width, height }: SparkProps) {
  if (calorieSeries.length < 2 || width <= 0 || height <= 0) return null;
  const low = Math.min(...calorieSeries);
  const high = Math.max(...calorieSeries);
  const span = Math.max(high - low, 1);
  const x = (i: number) => (i / (calorieSeries.length - 1)) * width;
  const y = (v: number) => height - ((v - low) / span) * height;

  return (
    <Svg width={width} height={height}>
      <Path
        d={calorieSeries.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')}
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

type CalorieProps = { margin: number; height: number; radius: number; sparkW: number };

/**
 * Today's burn.
 *
 * **The headline is the sum of the sparkline beside it** (R9), so the figure
 * and the picture cannot disagree.
 *
 * The fill is on an absolutely-filled child so a staged reveal does not open
 * on an empty white card (§5.5 / I9).
 */
export function CalorieCard({ margin, height, radius, sparkW }: CalorieProps) {
  return (
    <View style={{ marginHorizontal: margin, height, paddingHorizontal: 14, justifyContent: 'center' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.white,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.lilac,
          }}
        >
          <Glyph name="bolt" size={18} color={ct.accentDeep} />
        </View>

        <View style={{ flex: 1 }}>
          <T variant="kcal">{`${calories()} ${calorieRow.unit}`}</T>
          <T variant="kcalLine">{calorieRow.label}</T>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <T variant="time">{calorieRow.time}</T>
          <Sparkline width={sparkW} height={18} />
        </View>
      </View>
    </View>
  );
}

type TitleProps = { margin: number; height: number };

export function ProgramsTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{screen.programs}</T>
    </View>
  );
}

export function TrendingTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{screen.trending}</T>
    </View>
  );
}

type BannerProps = { margin: number; height: number; radius: number };

/**
 * The leaderboard banner.
 *
 * **The gradient is drawn in `react-native-svg` user space**, not
 * `expo-linear-gradient`: this one runs diagonally, and a diagonal is mirrored
 * on web by that library (Part 7).
 *
 * **`useId` for the gradient.** Its ids are document-global on web.
 */
export function LeaderBanner({ margin, height, radius }: BannerProps) {
  const id = useId();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${leaderboard.title}, day ${leaderboard.day} of ${leaderboard.of}`}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View style={{ height, borderRadius: radius, overflow: 'hidden', opacity: pressed ? 0.88 : 1 }}>
          <Svg width="100%" height={height} style={{ position: 'absolute', top: 0, left: 0 }}>
            <Defs>
              <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0.6">
                <Stop offset="0" stopColor={ct.accent} stopOpacity={0.55} />
                <Stop offset="0.55" stopColor={ct.blush} />
                <Stop offset="1" stopColor={ct.lilac} />
              </LinearGradient>
            </Defs>
            <Rect x={0} y={0} width="100%" height={height} fill={`url(#${id})`} />
          </Svg>

          <View style={{ flex: 1, paddingHorizontal: 18, justifyContent: 'center' }}>
            <T variant="boardTitle">{leaderboard.title}</T>
            <T variant="boardDay">{`Day ${leaderboard.day} of ${leaderboard.of}`}</T>
          </View>

          <View style={{ position: 'absolute', right: 18, top: height / 2 - 14 }}>
            <Glyph name="sparkle" size={28} color={ct.accentDeep} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

function WeekTicks({ week }: { week: boolean[] }) {
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

type TrendProps = { margin: number; height: number; rowH: number; radius: number };

/**
 * The trending rows.
 *
 * **Each percentage is the share of its own week strip** (R9), and the
 * distance bar's fill is `km / goal` clamped to 1 — so a bar cannot run past
 * its own track and a figure cannot contradict the dots beside it.
 */
export function TrendList({ margin, height, rowH, radius }: TrendProps) {
  return (
    <View style={{ marginHorizontal: margin, height, gap: 10 }}>
      {trends.map((t: Trend) => {
        const bar = kmShare(t);
        return (
          <Pressable key={t.id} accessibilityRole="button" accessibilityLabel={t.title}>
            {({ pressed }) => (
              <View
                style={{
                  height: rowH,
                  borderRadius: radius,
                  backgroundColor: ct.white,
                  paddingHorizontal: 14,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                  opacity: pressed ? 0.8 : 1,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: TINT[t.tint],
                  }}
                >
                  <Glyph name={t.glyph} size={18} color={ct.accentDeep} strokeWidth={1.8} />
                </View>

                <View style={{ flex: 1, gap: 3 }}>
                  <T variant="rowTitle">{t.title}</T>
                  {bar !== null ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <View
                        style={{
                          flex: 1,
                          height: 5,
                          borderRadius: 3,
                          backgroundColor: ct.hairline,
                          overflow: 'hidden',
                        }}
                      >
                        <View
                          style={{
                            width: `${bar * 100}%`,
                            height: 5,
                            borderRadius: 3,
                            backgroundColor: ct.accent,
                          }}
                        />
                      </View>
                      <T variant="rowValue">{`${t.km} / ${t.kmGoal} km`}</T>
                    </View>
                  ) : (
                    <T variant="rowMeta">{`Completed ${pct(share(t.week))} of the week`}</T>
                  )}
                </View>

                <View style={{ alignItems: 'flex-end', gap: 4 }}>
                  <T variant="time">{t.meta}</T>
                  <WeekTicks week={t.week} />
                </View>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
