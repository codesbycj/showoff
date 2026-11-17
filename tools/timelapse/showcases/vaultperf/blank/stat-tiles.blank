import { View } from 'react-native';

import { tiles } from '../data/performance';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; gap: number; height: number; radius: number };

/**
 * The three figures under the headline.
 *
 * **They take the remainder**, each growing into an equal share of whatever is
 * left: the board stops after two and leaves a third of the screen empty, and
 * the fix for that is to scale up, never to pad out (I3 / R1).
 *
 * Each tile's fill sits on an absolutely-filled child so an emptied tile paints
 * nothing in frame one of the reveal (I9).
 */
export function StatTiles({ margin, gap, height, radius }: Props) {
  const tints = { grey: ct.grey, blue: ct.blue, mint: ct.mint, beige: ct.beige } as const;

  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {tiles.map((tile) => (
        <View key={tile.id} style={{ height, borderRadius: radius, padding: 18 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: tints[tile.tint],
              borderRadius: radius,
            }}
          />

          <View style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <T variant="tileFigure">{tile.figure}</T>
              <Glyph name={tile.icon} size={22} color={ct.ink} strokeWidth={1.8} />
            </View>

            <View>
              <T variant="tileLabel">{tile.label}</T>
              <T variant="tileNote">{tile.note}</T>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
