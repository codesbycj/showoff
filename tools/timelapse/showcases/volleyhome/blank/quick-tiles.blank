import { Pressable, View } from 'react-native';

import { tiles } from '../data/start';
import { TILE, TILES_TOP } from '../layout';
import { radius, type, vl } from '../theme';
import { People, Pin, Racket, Trophy } from './glyphs';
import { T } from './text';

/** One tile. Written out in `QuickTiles` so the reveal lands them singly. */
function Tile({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const t = tiles[i];
  return (
    <Pressable
      onPress={() => onPress?.(t.id)}
      style={{ alignItems: 'center' }}
      accessibilityRole="button"
      accessibilityLabel={t.label}
    >
      <View
        style={{
          width: TILE,
          height: TILE,
          borderRadius: radius.tile,
          backgroundColor: vl.card,
          borderWidth: 1,
          borderColor: vl.hairline,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {t.id === 'location' ? <Pin tint={vl.gold} /> : null}
        {t.id === 'event' ? <Trophy tint={vl.gold} /> : null}
        {t.id === 'sparring' ? <Racket tint={vl.gold} /> : null}
        {t.id === 'community' ? <People tint={vl.gold} /> : null}
      </View>

      <T variant="tile" color={vl.ink} style={{ marginTop: 7, height: type.tile.line }}>
        {t.label}
      </T>
    </Pressable>
  );
}

/**
 * The four things the app is for.
 *
 * Each carries an accessible name; the reference's four are gold glyphs with
 * a caption and nothing behind them.
 */
export function QuickTiles({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: TILES_TOP,
      }}
    >
{/* STEP 1.14 where
      <Tile i={0} onPress={onPress} />
*/}
{/* STEP 1.15 what
      <Tile i={1} onPress={onPress} />
*/}
{/* STEP 1.16 with whom
      <Tile i={2} onPress={onPress} />
*/}
{/* STEP 1.17 and everyone else
      <Tile i={3} onPress={onPress} />
*/}
    </View>
  );
}
