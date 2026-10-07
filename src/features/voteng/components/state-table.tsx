import { Text, View } from 'react-native';

import type { StateRow } from '../data/results';
import { FONT, PARTY, R, vt } from '../theme';

/**
 * The five-state leaderboard beside the map.
 *
 * Laid out as three flexed columns rather than a real table, because the only
 * thing a table would add here is column widths that size to content — and
 * content-sized columns are wrong for this: the percentage has to stay pinned
 * to the right edge whether it reads 62.1% or 8.4%, or the numbers stop lining
 * up as the feed updates.
 */
const HEAD_INK = vt.muted;
/** Wide enough for "100.0%" on one line; the column never reflows as numbers move. */
const PCT_W = 42;

export function StateTable({ head, rows }: { head: readonly string[]; rows: readonly StateRow[] }) {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomColor: vt.line,
        }}
      >
        <Text style={[cell, { flex: 1, color: HEAD_INK }]}>{head[0]}</Text>
        <Text style={[cell, { flex: 1.1, color: HEAD_INK }]}>{head[1]}</Text>
        <Text style={[cell, { width: PCT_W, textAlign: 'right', color: HEAD_INK }]}>{head[2]}</Text>
      </View>

      {rows.map((r, i) => (
        <View
          key={r.key}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            borderTopWidth: i === 0 ? 0 : 1,
            borderTopColor: '#F8FAFC',
          }}
        >
          <Text style={[cell, { flex: 1, fontFamily: FONT.data, color: vt.inkSoft }]}>
            {r.state}
          </Text>
          <View style={{ flex: 1.1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: R.full,
                backgroundColor: PARTY[r.party].dot,
              }}
            />
            <Text style={[cell, { color: '#334155' }]}>{r.party}</Text>
          </View>
          <Text
            numberOfLines={1}
            style={[cell, { width: PCT_W, textAlign: 'right', color: vt.body }]}
          >
            {r.pct}
          </Text>
        </View>
      ))}
    </View>
  );
}

const cell = { fontFamily: FONT.dataSemi, fontSize: 11, lineHeight: 15 } as const;
