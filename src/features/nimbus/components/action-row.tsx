import { View } from 'react-native';

import { ACTIONS } from '../data/cards';
import { TILE_GAP } from '../layout';
import { ActionTile } from './action-tile';

/**
 * The four actions, in one row.
 *
 * The row is the only thing that knows there are four of them: the tiles
 * flex, so the data file decides how many there are and the layout follows.
 */
export function ActionRow({ onAction }: { onAction?: (key: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: TILE_GAP }}>
      {ACTIONS.map((a) => (
        <ActionTile key={a.key} glyph={a.key} label={a.label} onPress={() => onAction?.(a.key)} />
      ))}
    </View>
  );
}
