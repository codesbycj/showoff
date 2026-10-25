import { Pressable, View } from 'react-native';

import { CARD_PAD, TILE_HEIGHT } from '../layout';
import { radius, tl, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Money out, or money in.
 *
 * The two tiles swap fill and ink rather than taking them as props: they are
 * one object in two materials, and the arrow turning through 180° is the whole
 * difference between them. Sending is violet with a lime arrow; requesting is
 * the same tile inverted, which is why the pair reads as a pair.
 */
export function ActionTile({
  label,
  tone,
  onPress,
}: {
  label: readonly string[];
  tone: 'violet' | 'lime';
  onPress?: () => void;
}) {
  const violet = tone === 'violet';
  const fill = violet ? tl.violet : tl.lime;
  const mark = violet ? tl.lime : tl.violet;
  const ink = violet ? tl.onNavy : tl.ink;

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1 }}
      accessibilityRole="button"
      accessibilityLabel={label.join(' ')}
    >
      <View
        style={{
          height: TILE_HEIGHT,
          borderRadius: radius.tile,
          backgroundColor: fill,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
{/* STEP 1.16 its mark
        <View style={{ alignItems: 'flex-end' }}>
          <View style={{ transform: [{ rotate: violet ? '0deg' : '180deg' }] }}>
            <Glyph name="arrow" size={46} tint={mark} />
          </View>
        </View>
*/}

{/* STEP 1.20 and what it does
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            {label.map((l) => (
              <T key={l} variant="tile" color={ink} style={{ height: type.tile.line }}>
                {l}
              </T>
            ))}
          </View>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: radius.control,
              backgroundColor: violet ? tl.lime : tl.violet,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="chevron" size={15} tint={violet ? tl.ink : tl.onNavy} />
          </View>
        </View>
*/}
      </View>
    </Pressable>
  );
}
