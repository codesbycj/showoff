import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

import {
  CALENDAR,
  DAYS,
  FACES,
  SUMMARY_FACE,
  TONES,
  WEEKDAYS,
  type Day,
  type StatTile,
} from '../data/calendar';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/** One day's face, recombined from its eyes and mouth. */
function DayFace({ face, color, size = 20 }: { face: string; color: string; size?: number }) {
  const f = FACES[face];
  const stroke = { stroke: color, strokeWidth: 2.2, strokeLinecap: 'round' as const };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {f.eyes.kind === 'dots' ? (
        <>
          <Circle cx="8" cy="10" r={f.eyes.r} fill={color} />
          <Circle cx="16" cy="10" r={f.eyes.r} fill={color} />
        </>
      ) : (
        <Path d={f.eyes.d} {...stroke} />
      )}

      {f.mouth.kind === 'path' ? <Path d={f.mouth.d} {...stroke} /> : null}
      {f.mouth.kind === 'dot' ? (
        <Circle cx={f.mouth.cx} cy={f.mouth.cy} r={f.mouth.r} fill={color} />
      ) : null}
      {f.mouth.kind === 'oval' ? (
        <Ellipse cx={f.mouth.cx} cy={f.mouth.cy} rx={f.mouth.rx} ry={f.mouth.ry} {...stroke} />
      ) : null}
    </Svg>
  );
}

/**
 * The heatmap.
 *
 * Five rows of seven, with a 6dp gutter both ways. Built as explicit rows of
 * `flex: 1` cells rather than one wrapping grid: `flexWrap` with a percentage
 * width has to know the container to subtract the gutters from, which would
 * bake a 393dp screen into a component that does not otherwise care about one.
 * Rows divide the space themselves, at any width.
 *
 * The cells are squared by `aspectRatio: 1` for the same reason — their height
 * follows whatever width the row gives them.
 *
 * A day with no entry is a 10x2 dash in `outline-variant`, not an empty box.
 * It still occupies a full cell, which is what keeps the grid square.
 */
export function CalendarGrid({ onSelect }: { onSelect?: (index: number) => void }) {
  return (
    <View
      style={{
        backgroundColor: mp.surface,
        borderRadius: R.card,
        padding: SP.md,
        ...LEVEL.card,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 4, marginBottom: SP.xs }}>
        {WEEKDAYS.map((d) => (
          <Text
            key={d}
            style={[TYPE.labelSmMedium, { color: mp.variant, flex: 1, textAlign: 'center' }]}
          >
            {d}
          </Text>
        ))}
      </View>

      <View style={{ gap: 6 }}>
        {[0, 1, 2, 3, 4].map((week) => (
          <View key={week} style={{ flexDirection: 'row', gap: 6 }}>
            {DAYS.slice(week * 7, week * 7 + 7).map((day: Day, col) => {
              const i = week * 7 + col;
              const tone = 'empty' in day ? null : TONES[day.tone];
              return (
                <Pressable key={i} onPress={() => onSelect?.(i)} style={{ flex: 1 }}>
                  <View
                    style={{
                      aspectRatio: 1,
                      borderRadius: R.base,
                      backgroundColor: tone ? tone.fill : mp.surfaceLow,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: day.dim ?? 1,
                    }}
                  >
                    {tone && 'face' in day ? (
                      <DayFace face={day.face} color={tone.ink} />
                    ) : (
                      <View
                        style={{
                          width: 10,
                          height: 2,
                          borderRadius: R.full,
                          backgroundColor: mp.outlineVariant,
                        }}
                      />
                    )}
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

/** The month switcher: two wells either side of a stacked title. */
export function MonthBar({ onBack, onPick }: { onBack?: () => void; onPick?: () => void }) {
  const well = {
    width: 40,
    height: 40,
    borderRadius: R.full,
    backgroundColor: mp.surfaceHigh,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SP.xs,
      }}
    >
      <Pressable onPress={onBack}>
        <View style={well}>
          <Symbol name="chevronLeft" size={20} color={mp.ink} />
        </View>
      </Pressable>

      <View style={{ alignItems: 'center' }}>
        <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{CALENDAR.title}</Text>
        <Text style={[TYPE.labelMd, { color: mp.variant }]}>{CALENDAR.month}</Text>
      </View>

      <Pressable onPress={onPick}>
        <View style={well}>
          <Symbol name="editCalendar" size={20} color={mp.ink} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The mint summary card: copy on the left, a large face on the right.
 *
 * The copy is capped at 65% of the card so the face keeps its 112dp column —
 * the export's own constraint, and what stops "Keep up the good vibes!" from
 * running under the smile at this width.
 */
export function SummaryCard() {
  return (
    <View
      style={{
        backgroundColor: mp.secondaryContainer,
        borderRadius: R.card,
        padding: SP.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...LEVEL.card,
      }}
    >
      <View style={{ maxWidth: '65%' }}>
        <Text style={[TYPE.labelSm, { color: 'rgba(0,114,65,0.8)' }]}>
          {CALENDAR.summaryEyebrow}
        </Text>
        <Text style={[TYPE.headlineXlMobile, { color: mp.onSecondaryContainer, marginTop: SP.xs }]}>
          {CALENDAR.summaryMood}
        </Text>
        <Text style={[TYPE.bodyMd, { color: 'rgba(0,114,65,0.9)', marginTop: 4 }]}>
          {CALENDAR.summaryBody}
        </Text>
      </View>

      <View style={{ width: 112, height: 112, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={96} height={96} viewBox="0 0 100 100" fill="none">
          <Path
            d={SUMMARY_FACE.eyeL}
            stroke={mp.onSecondaryContainer}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <Path
            d={SUMMARY_FACE.eyeR}
            stroke={mp.onSecondaryContainer}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <Path
            d={SUMMARY_FACE.mouth}
            stroke={mp.onSecondaryContainer}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
}

/** One of the three bento stat tiles. */
export function StatCard({ stat }: { stat: StatTile }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mp.surface,
        borderRadius: R.base,
        padding: SP.sm,
        ...LEVEL.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
        <Symbol name={stat.icon} size={16} color={stat.iconColor} />
        <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{stat.label}</Text>
      </View>
      <Text style={[TYPE.headlineMd, { color: mp.ink }]} numberOfLines={1}>
        {stat.value}
      </Text>
      <Text style={[TYPE.labelSmMedium, { color: mp.variant, marginTop: 2 }]}>{stat.sub}</Text>
    </View>
  );
}

/**
 * The positivity banner.
 *
 * Its leading badge is `auto_awesome` from the icon set. The export puts a
 * literal sparkle emoji there, which has no single rendering across platforms —
 * on Windows it is a flat glyph, on Android a coloured one — and the icon set
 * carries the same mark as a real vector.
 */
export function PositivityBanner({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: mp.surfaceHigh,
          borderRadius: R.card,
          paddingHorizontal: SP.md,
          paddingVertical: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: mp.secondaryContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="autoAwesome" size={16} color={mp.onSecondaryContainer} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.labelMdBold, { color: mp.ink }]}>{CALENDAR.bannerTitle}</Text>
            <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{CALENDAR.bannerSub}</Text>
          </View>
        </View>
        <Symbol name="trendingUp" size={20} color={mp.variant} />
      </View>
    </Pressable>
  );
}
