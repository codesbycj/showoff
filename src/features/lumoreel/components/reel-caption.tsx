import { Image, View } from 'react-native';

import { hashtags, reel } from '../data/reel';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number; bottom: number };

/**
 * Who posted it, what they said, and what it is set to.
 *
 * **The handle is spelled** — the board's reads "@rayyan.offical" — and the
 * audio line names an invented track rather than the board's real band (I1).
 *
 * The block sits on a scrim so every line clears 4.5:1 over whatever frame is
 * behind it (R4); the audit skips text over photography, so this one is
 * judged by eye and built not to need judging.
 */
export function ReelCaption({ margin, height, bottom }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin + 62,
        bottom,
        height,
        justifyContent: 'flex-end',
        gap: 8,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {/* STEP 1.12 image
        <Image
          source={reel.avatar}
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            borderWidth: 1.5,
            borderColor: ct.white,
          }}
          resizeMode="cover"
        />
        */}
        <View style={{ flex: 1 }}>
          {/* STEP 1.13 name
          <T variant="postName">{reel.name}</T>
          */}
          {/* STEP 1.14 handle
          <T variant="postHandle">{reel.handle}</T>
          */}
        </View>
      </View>

      {/* STEP 1.15 caption
      <T variant="caption" style={{ color: ct.ink }} numberOfLines={1}>
        {reel.caption}
      </T>
      */}

      {/* STEP 1.16 t
      <T variant="caption" numberOfLines={1}>
        {hashtags.join(' ')}
      </T>
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        {/* STEP 1.17 glyph
        <Glyph name="audio" size={14} color={ct.ink} strokeWidth={1.7} />
        */}
        {/* STEP 1.18 audio
        <T variant="postHandle" style={{ color: ct.ink }} numberOfLines={1}>
          {reel.audio}
        </T>
        */}
      </View>
    </View>
  );
}
