import { View } from 'react-native';

import { actions } from '../data/home';
import { TILE_GAP } from '../layout';
import { ActionTile } from './action-tile';

/**
 * The four tiles, filling the page.
 *
 * Equal flex columns with a fixed gap, so the row fits any phone without a
 * measurement and the tiles stay square-ish rather than one of them absorbing
 * the slack.
 */
export function ActionRow({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: TILE_GAP }}>
      {actions.map((a) => (
        <ActionTile
          key={a.key}
          name={a.key}
          label={a.label}
          accent={a.accent}
          onPress={() => onSelect?.(a.key)}
        />
      ))}
    </View>
  );
}
