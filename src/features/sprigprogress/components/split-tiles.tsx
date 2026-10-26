import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { copy, tiles } from '../data/start';
import { TILES_TOP, TILE_HEIGHT } from '../layout';
import { radius, sg, type } from '../theme';
import { T } from './text';

const TONES = {
  peach: { fill: sg.peach, ink: sg.peachInk },
  blue: { fill: sg.blue, ink: sg.blueInk },
} as const;

/** The glyph for each tile, drawn rather than taken from the emoji table. */
function Mark({ id, tint }: { id: string; tint: string }) {
  if (id === 'nutrition') {
    return (
      <Svg width={16} height={16} viewBox="0 0 24 24">
        <Path
          d="M13 2.6c3 3.1 4.2 5.2 4.2 7.3 0 .9-.3 1.7-.8 2.3.8-.2 1.5-.8 2-1.6 1 1.6 1.6 3.2 1.6 4.8 0 3.8-3.1 6.6-7 6.6s-7-2.8-7-6.6c0-4 2.6-7.1 5.3-10.4.6 1 .8 2.1.6 3.2 1-1.4 1.4-3.4 1.1-5.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        d="M6.6 9.2v5.6M17.4 9.2v5.6M3.6 10.6v2.8M20.4 10.6v2.8M6.6 12h10.8"
        stroke={tint}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Circle cx={6.6} cy={12} r={0.1} fill={tint} />
    </Svg>
  );
}

/** One tile. Written out in `SplitTiles` so the reveal lands them singly. */
function Tile({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const t = tiles[i];
  const tone = TONES[t.tone];

  return (
    <Pressable
      onPress={() => onPress?.(t.id)}
      style={{ flex: 1 }}
      accessibilityRole="button"
      accessibilityLabel={t.name}
    >
      <View
        style={{
          height: TILE_HEIGHT,
          // MISTAKE 1.32 the tiles came in far too tall
          minHeight: 150,
          borderRadius: radius.tile,
          padding: 14,
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: radius.tile,
            backgroundColor: tone.fill,
          }}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Mark id={t.id} tint={tone.ink} />
          <T
            variant="tileName"
            color={sg.ink}
            style={{ marginLeft: 7, height: type.tileName.line }}
          >
            {t.name}
          </T>
          <View style={{ flex: 1 }} />
          <Svg width={14} height={14} viewBox="0 0 24 24">
            <Path
              d="m9.6 6 5.4 6-5.4 6"
              stroke={tone.ink}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="tileValue" color={sg.ink} style={{ height: type.tileValue.line }}>
            {t.value.toLocaleString('en-US')}
          </T>
          <T
            variant="tileUnit"
            color={sg.muted}
            style={{ marginLeft: 4, marginBottom: 2, height: type.tileUnit.line }}
          >
            {copy.unit}
          </T>
        </View>
      </View>
    </Pressable>
  );
}

/**
 * What goes in, and what goes out.
 *
 * The two figures differ — the reference gives both tiles 1,900 kcal, which
 * is the one thing a pair of tiles cannot say.
 */
export function SplitTiles({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <View style={{ flexDirection: 'row', gap: 12, marginTop: TILES_TOP }}>
{/* STEP 1.14 what goes in
      <Tile i={0} onPress={onPress} />
*/}
{/* STEP 1.15 and what goes out
      <Tile i={1} onPress={onPress} />
*/}
    </View>
  );
}
