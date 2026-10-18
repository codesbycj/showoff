import { useState } from 'react';
import { Pressable, View } from 'react-native';

import type { TileGlyph as GlyphName } from '../data/dashboard';
import { TILE_BUTTON, TILE_GLYPH, TILE_HEIGHT, TILE_PAD } from '../layout';
import { dd, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';
import { TileGlyph } from './tile-glyph';

/**
 * One of the four figures at the top of the dashboard.
 *
 * The accented tile is a fill swap, not a different component — the reference
 * treats the live one as the same tile wearing the accent, and the corner
 * button inverts with it so the arrow stays readable either way.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the tile would lose its fill and its height in every harness shot.
 */
export function StatTile({
  label,
  value,
  glyph,
  accent,
  onPress,
}: {
  label: string;
  value: string;
  glyph: GlyphName;
  accent: boolean;
  onPress?: () => void;
}) {
  const [held, setHeld] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setHeld(true)}
      onPressOut={() => setHeld(false)}
      accessibilityRole="button"
      accessibilityLabel={`${label}, ${value}`}
      style={{ flex: 1 }}
    >
      <View
        style={{
          height: TILE_HEIGHT,
          // MISTAKE 1.13 the tiles came in sitting low
          marginTop: 14,
          borderRadius: radius.tile,
          backgroundColor: accent ? dd.blue : dd.surface,
          borderWidth: 1,
          borderColor: accent ? dd.blue : dd.edge,
          padding: TILE_PAD,
          justifyContent: 'space-between',
          opacity: held ? 0.9 : 1,
        }}
      >
        {/* STEP 1.11 the object, and a way in
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <TileGlyph name={glyph} size={TILE_GLYPH} />
          <View style={{ flex: 1 }} />
          <View
            style={{
              width: TILE_BUTTON,
              height: TILE_BUTTON,
              borderRadius: radius.full,
              backgroundColor: accent ? dd.onBlue : dd.canvas,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="go" size={15} color={accent ? dd.blue : dd.ink} strokeWidth={2.2} />
          </View>
        </View>
        */}

        {/* STEP 1.12 what it counts
        <View>
          <T variant="tileLabel" color={accent ? dd.onBlue : dd.muted} numberOfLines={1}>
            {label}
          </T>
          <T variant="tileValue" color={accent ? dd.onBlue : dd.ink} numberOfLines={1}>
            {value}
          </T>
        </View>
        */}
      </View>
    </Pressable>
  );
}
