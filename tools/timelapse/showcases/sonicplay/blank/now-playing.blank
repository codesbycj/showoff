import { Pressable, View } from 'react-native';

import { track } from '../data/player';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { TitleProps } from './_player-parts-shared';

/** Title, artist and the save control. */
export function NowPlaying({ margin, height, control }: TitleProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* STEP 1.08 title
        <T variant="nowTitle" numberOfLines={1}>
          {track.title}
        </T>
        */}
        {/* STEP 1.09 artist
        <T variant="nowArtist">{track.artist}</T>
        */}
      </View>

      {/* STEP 1.10 "Save this track"
      <Pressable hitSlop={10} accessibilityRole="button" accessibilityLabel="Save this track">
        {({ pressed }) => (
          <View
            style={{
              width: control,
              height: control,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph
              name={track.liked ? 'heartFill' : 'heart'}
              size={21}
              color={track.liked ? ct.lime : ct.ink}
            />
          </View>
        )}
      </Pressable>
      */}
    </View>
  );
}
