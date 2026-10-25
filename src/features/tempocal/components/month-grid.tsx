import { View } from 'react-native';

import { month, weekdays } from '../data/home';
import { CELL, MONTH_PAD } from '../layout';
import { radius, shadow, tp, type } from '../theme';
import { Hatch } from './glyph';
import { T } from './text';

/**
 * February, drawn from the data.
 *
 * A marked day is a filled disc and the fill says *why* it is marked: work
 * finished, the day you are on, the day something is due. The reference marks
 * days in three colours and never says what any of them mean, which is the
 * kind of thing a design shot can leave unanswered and an app cannot.
 *
 * Days from the months either side are hatched rather than greyed, which is
 * the same material the task chart uses for "not this".
 */
export function MonthGrid() {
  const fill = (tone?: string) =>
    tone === 'done'
      ? tp.green
      : tone === 'due'
        ? tp.orange
        : tone === 'today'
          ? tp.dark
          : undefined;

  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: tp.card,
        padding: MONTH_PAD,
        ...shadow.card,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {weekdays.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center' }}>
            <T variant="weekday" color={tp.muted} style={{ height: type.weekday.line }}>
              {d}
            </T>
          </View>
        ))}
      </View>

      {month.map((week, wi) => (
        <View key={wi} style={{ flexDirection: 'row', marginTop: 10 }}>
          {week.map((cell, ci) => (
            <View key={ci} style={{ flex: 1, alignItems: 'center' }}>
              {'pad' in cell && cell.pad ? (
                <View
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: radius.control,
                    overflow: 'hidden',
                  }}
                >
                  <Hatch width={CELL} height={CELL} tint={tp.hatch} />
                </View>
              ) : (
                <View
                  style={{
                    width: CELL,
                    height: CELL,
                    borderRadius: radius.control,
                    backgroundColor: fill('tone' in cell ? cell.tone : undefined) ?? 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <T
                    variant="date"
                    color={'tone' in cell && cell.tone ? tp.onDark : tp.ink}
                    style={{ height: type.date.line }}
                  >
                    {String('date' in cell ? cell.date : '')}
                  </T>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
