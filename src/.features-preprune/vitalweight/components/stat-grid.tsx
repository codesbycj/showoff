import { View } from 'react-native';
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

import { GridProps } from './_weight-parts-shared';

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
