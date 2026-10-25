import { useState } from 'react';
import { Pressable, View } from 'react-native';

import type { ActionName } from '../data/home';
import { TILE_GLYPH, TILE_HEIGHT } from '../layout';
import { ph, radius, shadow } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * One of the four things you can do from here.
 *
 * The visual box is an inner `View`, never the `Pressable`'s own style: a
 * `style={({pressed}) => …}` function is dropped in a static web render, and
 * the tile would lose its fill and its height in every harness shot.
 *
 * The accented one is a fill swap, not a different component — "More" is the
 * same tile wearing the brand colour, and the reference treats it that way.
 */
export function ActionTile({
  name,
  label,
  accent,
  onPress,
}: {
  name: ActionName;
  label: string;
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
      accessibilityLabel={label}
      style={{ flex: 1 }}
    >
      <View
        style={{
          height: TILE_HEIGHT,
          borderRadius: radius.tile,
          backgroundColor: accent ? ph.lime : ph.surface,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: held ? 0.85 : 1,
          ...shadow.soft,
        }}
      >
        <View style={{ height: TILE_GLYPH, justifyContent: 'center' }}>
          <Icon name={name === 'more' ? 'more' : name} size={19} color={ph.text} />
        </View>
        <T variant="tile" color={ph.text}>
          {label}
        </T>
      </View>
    </Pressable>
  );
}
