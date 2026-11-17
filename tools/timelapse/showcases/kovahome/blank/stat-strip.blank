import { View } from 'react-native';

import { counts } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * Clients, due today, in queue.
 *
 * **R9: all three are counted from the lists below them** — the client rail's
 * own length, the reminders dated today, and the queue — so the strip cannot
 * promise work the screen does not show. The board types all three.
 */
export function StatStrip({ margin, height }: Props) {
  const rows = counts();

  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        borderRadius: 20,
        backgroundColor: ct.tray,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {rows.map((row, i) => (
        <View
          key={row.id}
          style={{
            flex: 1,
            alignItems: 'center',
            gap: 2,
            borderLeftWidth: i === 0 ? 0 : 1,
            borderLeftColor: ct.line,
          }}
        >
          <T variant="statValue">{row.value}</T>
          <T variant="statLabel">{row.label}</T>
        </View>
      ))}
    </View>
  );
}
