import { Image, Pressable, View } from 'react-native';

import { clock, controls, progress, screen, track } from '../data/player';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { TransportProps } from './_player-parts-shared';

/**
 * The transport.
 *
 * The play button is 64dp and the rest are 44dp, so every control clears R7 on
 * its own. The play button's fill and shadow sit in one style object — a
 * `Platform.select` for a shadow is exactly what the web render cannot check.
 */
export function Transport({ margin, height, play, item }: TransportProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {controls.map((c) => {
        const isPlay = c.id === 'play';
        return (
          <Pressable key={c.id} accessibilityRole="button" accessibilityLabel={c.id}>
            {({ pressed }) => (
              <View
                style={{
                  width: isPlay ? play : item,
                  height: isPlay ? play : item,
                  borderRadius: (isPlay ? play : item) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isPlay ? ct.lime : 'transparent',
                  opacity: pressed ? 0.78 : 1,
                  shadowColor: '#8FBF1F',
                  shadowOpacity: isPlay ? 0.35 : 0,
                  shadowRadius: 18,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: isPlay ? 8 : 0,
                }}
              >
                <Glyph
                  name={c.glyph}
                  size={isPlay ? 26 : 21}
                  color={isPlay ? ct.onLime : ct.ink}
                  strokeWidth={1.9}
                />
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
