import { Image, Pressable, View } from 'react-native';

import { clock, controls, progress, screen, track } from '../data/player';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

function Round({ glyph, label, size, onPress }: { glyph: GlyphName; label: string; size: number; onPress?: () => void }) {
  return (
    <Pressable hitSlop={8} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.disc,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={17} color={ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

type BarProps = { margin: number; height: number; control: number; onBack: () => void };

/** Collapse, what is playing, and the overflow. */
export function PlayerBar({ margin, height, control, onBack }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Round glyph="chevronDown" label="Collapse" size={control} onPress={onBack} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <T variant="fromLabel">{screen.from}</T>
        <T variant="fromAlbum" numberOfLines={1}>
          {track.album}
        </T>
      </View>
      <Round glyph="more" label="More" size={control} />
    </View>
  );
}

type CoverProps = { margin: number; size: number; radius: number };

/**
 * The sleeve.
 *
 * **A photograph standing in for a fictional release** (I4). The board's own
 * is a real album cover, and shipping that would be impersonation.
 *
 * The `Image` carries explicit numeric width and height: absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7).
 */
export function CoverArt({ margin, size, radius }: CoverProps) {
  return (
    <View style={{ marginHorizontal: margin, alignItems: 'center' }}>
      <Image
        source={track.cover}
        style={{ width: size, height: size, borderRadius: radius, backgroundColor: ct.card }}
        resizeMode="cover"
      />
    </View>
  );
}

type TitleProps = { margin: number; height: number; control: number };

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
        <T variant="nowTitle" numberOfLines={1}>
          {track.title}
        </T>
        <T variant="nowArtist">{track.artist}</T>
      </View>

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
    </View>
  );
}

type ScrubProps = { margin: number; height: number };

/**
 * The scrubber.
 *
 * **The filled width is computed from the two clocks** (R9) — the board's bar
 * sits at about a quarter while its own times read 1:37 of 4:21, which is 37%.
 *
 * The knob is a child of the filled track rather than a floating sibling, so
 * it cannot straddle the bar's edge however the bar is sized (R3).
 */
export function Scrubber({ margin, height }: ScrubProps) {
  const pos = progress();

  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <View style={{ height: 4, borderRadius: 2, backgroundColor: ct.cardEdge }}>
        <View
          style={{
            width: `${pos * 100}%`,
            height: 4,
            borderRadius: 2,
            backgroundColor: ct.lime,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 11,
              height: 11,
              borderRadius: 5.5,
              backgroundColor: ct.lime,
              marginRight: -1,
            }}
          />
        </View>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <T variant="clock">{clock(track.elapsed)}</T>
        <T variant="clock">{clock(track.duration)}</T>
      </View>
    </View>
  );
}

type TransportProps = { margin: number; height: number; play: number; item: number };

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

type LyricsProps = { margin: number; height: number };

/** The lyrics handle at the foot. */
export function LyricsHandle({ margin, height }: LyricsProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
        accessibilityRole="button"
        accessibilityLabel={screen.lyrics}
      >
        {({ pressed }) => (
          <View style={{ alignItems: 'center', gap: 2, opacity: pressed ? 0.6 : 1 }}>
            <T variant="lyrics">{screen.lyrics}</T>
            <Glyph name="chevronDown" size={15} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
    </View>
  );
}
