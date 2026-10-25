import { Pressable, ScrollView, View } from 'react-native';

import { history } from '../data/stats';
import { GRABBER_H, GRABBER_W, SHEET_PAD } from '../layout';
import { radius, shadow, sj } from '../theme';
import { HistoryRow } from './history-row';
import { Icon } from './icon';
import { T } from './text';

/**
 * The sheet at the foot: everything that happened, newest first.
 *
 * It is a sheet rather than a section — rounded only at the top, with a
 * grabber — because the reference's is one, and that shape promises it can be
 * dragged up over the chart.
 *
 * The list scrolls *inside* the sheet rather than the page scrolling under it,
 * which is what keeps the chart and the total in place while the history moves
 * — the whole reason a screen like this uses a sheet at all.
 */
export function HistorySheet({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View
      style={{
        flex: 1,
        borderTopLeftRadius: radius.sheet,
        borderTopRightRadius: radius.sheet,
        backgroundColor: sj.sheet,
        paddingTop: 10,
        ...shadow.sheet,
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: GRABBER_W,
            height: GRABBER_H,
            borderRadius: radius.full,
            backgroundColor: sj.rule,
          }}
        />
      </View>

      <View
        style={{
          marginTop: 12,
          paddingHorizontal: SHEET_PAD,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="section" color={sj.ink}>
          {history.title}
        </T>
        <Pressable hitSlop={10} accessibilityRole="button">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <T variant="link" color={sj.muted}>
              {history.viewAll}
            </T>
            <Icon name="next" size={13} color={sj.muted} strokeWidth={2} />
          </View>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SHEET_PAD, paddingBottom: 16 }}
      >
        {history.groups.map((group) => (
          <View key={group.key}>
            <T variant="dayLabel" color={sj.muted} style={{ marginTop: 12 }}>
              {group.label}
            </T>
            {group.rows.map((row) => (
              <HistoryRow
                key={row.key}
                name={row.name}
                time={row.time}
                amount={row.amount}
                kind={row.kind}
                mark={row.mark}
                color={row.color}
                face={'face' in row ? row.face : undefined}
                credit={row.credit}
                onPress={() => onSelect?.(row.key)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
