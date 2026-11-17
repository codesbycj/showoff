import { Pressable, View } from 'react-native';

import { screen } from '../data/player';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { LyricsProps } from './_player-parts-shared';

/** The lyrics handle at the foot. */
export function LyricsHandle({ margin, height }: LyricsProps) {
  return (
    <View
      style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}
    >
      <Pressable
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        accessibilityRole="button"
        accessibilityLabel={screen.lyrics}
      >
        {({ pressed }) => (
          <View style={{ alignItems: 'center', gap: 2, opacity: pressed ? 0.6 : 1 }}>
            {/* STEP 1.26 lyrics
            <T variant="lyrics">{screen.lyrics}</T>
            */}
            {/* STEP 1.27 glyph
            <Glyph name="chevronDown" size={15} color={ct.sub} strokeWidth={2} />
            */}
          </View>
        )}
      </Pressable>
    </View>
  );
}
