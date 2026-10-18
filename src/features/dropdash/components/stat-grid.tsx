import { View } from 'react-native';

import { tiles } from '../data/dashboard';
import { TILE_GAP } from '../layout';
import { StatTile } from './stat-tile';

/**
 * The four tiles, two by two.
 *
 * Built as rows of two rather than as a wrapping grid: a wrap would let an
 * odd tile stretch to the full width on its own line, and the data decides how
 * many tiles there are. Rows keep every tile the same size whatever the count.
 */
export function StatGrid({ onSelect }: { onSelect?: (key: string) => void }) {
  const rows = [tiles.slice(0, 2), tiles.slice(2)];

  return (
    <View style={{ gap: TILE_GAP }}>
      {rows.map((row, i) => (
        <View key={i} style={{ flexDirection: 'row', gap: TILE_GAP }}>
          {row.map((tile) => (
            <StatTile
              key={tile.key}
              label={tile.label}
              value={tile.value}
              glyph={tile.glyph}
              accent={tile.accent}
              onPress={() => onSelect?.(tile.key)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
