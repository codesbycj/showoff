import { Pressable, View } from 'react-native';
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

import { TINT, TrendProps, WeekTicks } from './_prog-parts-shared';

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
      {/* STEP 1.24 title
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
      */}
    </View>
  );
}
