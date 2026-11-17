import { Pressable, View } from 'react-native';

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
            backgroundColor: ct.white,
            opacity: pressed ? 0.7 : 1,
            shadowColor: '#2A1A14',
            shadowOpacity: 0.18,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
          }}
        >
          <Glyph name={glyph} size={17} color={ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

export type BarProps = { margin: number; topInset: number; control: number; onBack: () => void };

export type SheetProps = {
  margin: number;
  height: number;
  radius: number;
  etaH: number;
  riderH: number;
  stepH: number;
};
