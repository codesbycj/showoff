import { Image, Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

export function Round({ glyph, label, size, onPress }: { glyph: GlyphName; label: string; size: number; onPress?: () => void }) {
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

export type BarProps = { margin: number; height: number; control: number; onBack: () => void };

export type CoverProps = { margin: number; size: number; radius: number };

export type TitleProps = { margin: number; height: number; control: number };

export type ScrubProps = { margin: number; height: number };

export type TransportProps = { margin: number; height: number; play: number; item: number };

export type LyricsProps = { margin: number; height: number };
