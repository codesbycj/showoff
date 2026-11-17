import { Pressable, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

export function Round({
  glyph,
  label,
  size,
  onPress,
}: {
  glyph: GlyphName;
  label: string;
  size: number;
  onPress?: () => void;
}) {
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
            backgroundColor: 'rgba(255,255,255,0.22)',
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={17} color={ct.onDark} />
        </View>
      )}
    </Pressable>
  );
}

export type BannerProps = {
  width: number;
  height: number;
  margin: number;
  topInset: number;
  control: number;
  onBack: () => void;
};

export type DiscProps = { size: number; top: number };

export type BlockProps = { margin: number; height: number };

export type DeliveryProps = { margin: number; height: number; radius: number };

export type OfferProps = { margin: number; height: number; radius: number; gap: number };
