import { Image, Pressable, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import {
  average,
  avatar,
  followingTitle,
  follows,
  headline,
  months,
  pct,
  peak,
  rings,
  today,
} from '../data/day';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const TINT = { blush: ct.blush, mint: ct.mint, lilac: ct.lilac } as const;

type BarProps = { margin: number; height: number };

/** The avatar, the date, and the add control. */
export function DayBar({ margin, height, avatarSize }: BarProps & { avatarSize: number }) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Image
        source={avatar}
        style={{ width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <T variant="date">{today}</T>
      </View>
      <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel="Add an entry">
        {({ pressed }) => (
          <View
            style={{
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="plus" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

type RingProps = { margin: number; height: number; size: number };

/**
 * The week, as completion rings.
 *
 * **Each ring's sweep is its own figure** (R9): the arc is drawn from
 * `strokeDashoffset` over the real circumference, so a ring at 64% sweeps 64%.
 *
 * A day with no reading draws a "?" rather than an empty ring, which is what
 * the board does and what makes "no data" different from "nothing done".
 */
export function RingStrip({ margin, height, size }: RingProps) {
  const r = size / 2 - 3;
  const c = 2 * Math.PI * r;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row' }}>
      {rings.map((ring) => (
        <View key={ring.id} style={{ flex: 1, alignItems: 'center', gap: 5 }}>
          <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} style={{ position: 'absolute' }}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={ct.white}
                strokeWidth={3}
                fill="none"
              />
              {ring.done !== undefined ? (
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  stroke={ct.accent}
                  strokeWidth={3}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${c}`}
                  strokeDashoffset={c * (1 - Math.min(Math.max(ring.done, 0), 1))}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              ) : null}
            </Svg>
            {ring.unknown ? <Glyph name="question" size={14} color={ct.sub} /> : null}
          </View>
          <T variant="ringLabel">{ring.label}</T>
        </View>
      ))}
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** The headline. The board's own line — "By tracking these area consistently
 *  score" — is not a sentence; rewritten (I1, R5). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="display" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}

type ChartProps = { margin: number; height: number; axisH: number };

/**
 * The month bars.
 *
 * **The plot is scaled to the data and the marker is the real mean** (R9). A
 * nice-tick loop that stops at `max` leaves bars taller than its own axis, so
 * the peak is padded; and the average line is `average()`, not a figure typed
 * beside the chart as the board's is.
 *
 * **Survives an empty `months`** (I7): `peak()` returns 1 rather than
 * `-Infinity`, so no bar height becomes `NaN`.
 */
export function MonthChart({ margin, height, axisH }: ChartProps) {
  const plotH = height - axisH;
  // Bracket the data, but only just: at 1.18 the tallest bar left 70dp of
  // empty canvas above it, which `audit.js` reports as GAP and R1 warns on.
  const top = peak() * 1.06;
  const avgY = plotH - (average() / Math.max(top, 1)) * plotH;

  return (
    <View style={{ marginHorizontal: margin, height }}>
      <View style={{ height: plotH, flexDirection: 'row', alignItems: 'flex-end', gap: 8 }}>
        {months.map((m) => {
          const h = Math.max((m.value / Math.max(top, 1)) * plotH, 4);
          return (
            <View
              key={m.id}
              style={{
                flex: 1,
                height: h,
                borderRadius: 10,
                backgroundColor: m.active ? ct.accent : 'rgba(255,255,255,0.72)',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 6,
              }}
            >
              {m.active ? <T variant="barValue">{m.value.toFixed(1)}</T> : null}
            </View>
          );
        })}
      </View>

      {/* The average marker, over the plot but clear of every bar label. */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: Math.max(avgY - 9, 0),
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }}
        pointerEvents="none"
      >
        <View
          style={{
            paddingHorizontal: 8,
            height: 18,
            borderRadius: 9,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.dark,
          }}
        >
          <T variant="avgPill">{`Avg ${pct(average())}`}</T>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(28,23,20,0.25)' }} />
      </View>

      <View style={{ height: axisH, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {months.map((m) => (
          <View key={m.id} style={{ flex: 1, alignItems: 'center' }}>
            <T variant="barLabel">{m.label}</T>
          </View>
        ))}
      </View>
    </View>
  );
}

/** "Following". */
export function FollowingTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{followingTitle}</T>
    </View>
  );
}

type TileProps = { margin: number; height: number; radius: number; gap: number };

/** The three things being followed. Labels and units (R5). */
export function FollowTiles({ margin, height, radius, gap }: TileProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {follows.map((f) => (
        <View
          key={f.id}
          style={{
            flex: 1,
            borderRadius: radius,
            backgroundColor: ct.white,
            padding: 12,
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: TINT[f.tint],
            }}
          >
            <Glyph name={f.glyph} size={16} color={ct.accentDeep} strokeWidth={1.8} />
          </View>
          <T variant="tileLabel">{f.label}</T>
          <T variant="tileValue">{f.value}</T>
        </View>
      ))}
    </View>
  );
}
