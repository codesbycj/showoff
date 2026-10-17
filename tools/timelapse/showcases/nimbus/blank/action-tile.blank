import { Pressable, View } from 'react-native';

import { TILE_GLYPH, TILE_GLYPH_TOP, TILE_HEIGHT } from '../layout';
import { nb, radius, shadow } from '../theme';
import { T } from './text';
import { TileGlyph, type GlyphName } from './tile-glyph';

/**
 * One action under the card: a glyph over its label on a raised tile.
 *
 * `flex: 1` rather than the reference's 83dp, so four of them and three gaps
 * take whatever the margins leave — 83.25 at 393dp wide, 83.0 at the
 * reference's 390.
 *
 * The visual box is an inner `View`: a `Pressable` whose style is a function
 * of `pressed` loses its height and its fill in a static web render, which is
 * what every harness shot is.
 */
export function ActionTile({
  glyph,
  label,
  onPress,
}: {
  glyph: GlyphName;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress} accessibilityRole="button">
      <View
        style={{
          height: TILE_HEIGHT,
          borderRadius: radius.tile,
          backgroundColor: nb.surface,
          alignItems: 'center',
          // MISTAKE 1.29 the tiles came in with the label beside the glyph
          flexDirection: 'row',
          paddingTop: TILE_GLYPH_TOP,
          ...shadow.soft,
        }}
      >
        <TileGlyph name={glyph} size={TILE_GLYPH} />
        <T variant="tileLabel" color={nb.inkSoft} style={{ marginTop: 13.1 }}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}
