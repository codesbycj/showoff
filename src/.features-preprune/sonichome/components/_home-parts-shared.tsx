import { Image, Pressable, ScrollView, View } from 'react-native';

import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';

export function Round({ glyph, label, size, filled }: { glyph: GlyphName; label: string; size: number; filled?: boolean }) {
  return (
    <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel={label}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: filled ? ct.white : ct.disc,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={17} color={filled ? ct.page : ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

export type BarProps = { margin: number; height: number; control: number };

export type BlockProps = { margin: number; height: number };

export type ChipProps = { margin: number; height: number; value: string; onSelect: (id: string) => void };

export type HeadProps = { margin: number; height: number; title: string; more: string };

export type RailProps = { margin: number; height: number; art: number; onSelect: () => void };

export type CardProps = { margin: number; height: number; width: number; radius: number };

export type ListProps = {
  margin: number;
  height: number;
  rowH: number;
  art: number;
  count: number;
  onSelect: () => void;
};

export type DockProps = {
  width: number;
  height: number;
  lift: number;
  item: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};
