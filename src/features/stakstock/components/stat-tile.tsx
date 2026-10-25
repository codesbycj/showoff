import { Pressable, View } from 'react-native';

import { TILE_HEIGHT } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One figure about the company, and the way into what it means.
 *
 * The chevron is a real 36dp disc rather than a glyph on its own: a 16dp
 * arrow is a 16dp target, which is a third of what a thumb needs, and this is
 * the control that opens the explanation.
 */
export function StatTile({
  value,
  label,
  tone,
  onPress,
}: {
  value: string;
  label: string;
  tone: 'acid' | 'slab';
  onPress?: () => void;
}) {
  const acid = tone === 'acid';

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1 }}
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${value}`}
    >
      <View
        style={{
          height: TILE_HEIGHT,
          borderRadius: radius.tile,
          backgroundColor: acid ? sk.acid : sk.slab,
          padding: 18,
          justifyContent: 'space-between',
        }}
      >
        <T variant="stat" color={sk.ink} style={{ height: type.stat.line }}>
          {value}
        </T>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="statLabel" color={sk.body} style={{ flex: 1 }}>
            {label}
          </T>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: radius.control,
              backgroundColor: sk.canvas,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="chevron" size={16} tint={sk.ink} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
