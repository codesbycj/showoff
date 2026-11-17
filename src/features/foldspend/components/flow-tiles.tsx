import { View } from 'react-native';

import { header, income, money, spent } from '../data/activity';
import { ct } from '../theme';
import { Folder } from './folder';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; gap: number };

/**
 * What came in and what went out.
 *
 * **The expense figure is the chart's own sum**, not a number typed beside it
 * (R9), and it survives the months array being empty while the reveal fills it
 * (I7).
 */
export function FlowTiles({ margin, width, height, gap }: Props) {
  const tiles = [
    { id: 'in', label: header.income, value: income, fill: ct.incomeTile, icon: 'arrowDown' },
    { id: 'out', label: header.expense, value: spent(), fill: ct.expenseTile, icon: 'arrowUp' },
  ] as const;

  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap }}>
      {tiles.map((tile) => (
        <Folder
          key={tile.id}
          width={width}
          height={height}
          fill={tile.fill}
          radius={18}
          notchW={22}
          notchH={12}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 12,
              paddingTop: 10,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 13,
                backgroundColor: ct.page,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={tile.icon} size={18} color={ct.ink} strokeWidth={1.9} />
            </View>

            <View>
              <T variant="tileLabel">{tile.label}</T>
              <T variant="tileValue">{money(tile.value)}</T>
            </View>
          </View>
        </Folder>
      ))}
    </View>
  );
}
