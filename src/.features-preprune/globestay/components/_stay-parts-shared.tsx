import { Image, Pressable, ScrollView, View } from 'react-native';

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
            backgroundColor: 'rgba(255,255,255,0.88)',
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={18} color={ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

export type HeroProps = { width: number; height: number; topInset: number; control: number; onBack: () => void };

export type TitleProps = { margin: number; height: number };

export type ChipProps = { margin: number; height: number };

export type BlockProps = { margin: number; height: number };

export type RailProps = { margin: number; height: number; width: number; radius: number };

export type ActionProps = { margin: number; height: number; radius: number; onBook: () => void };
