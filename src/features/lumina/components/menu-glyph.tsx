import { View } from 'react-native';

import { ll } from '../theme';

/**
 * The staggered hamburger in the home and chat headers.
 *
 * Font Awesome calls this `bars-staggered` and the chat screen draws it by
 * hand as three rounded bars of 16, 16 and 14 units. Lucide's `Menu` is three
 * bars of equal length, so this one is drawn rather than mapped — the short
 * third bar is the whole point of the glyph.
 */
export function MenuGlyph({ size = 16, color = ll.ink }: { size?: number; color?: string }) {
  const bar = {
    height: Math.max(1.5, size / 8),
    borderRadius: 999,
    backgroundColor: color,
  };

  return (
    <View style={{ width: size, gap: size / 4 }}>
      <View style={[bar, { width: size }]} />
      <View style={[bar, { width: size }]} />
      <View style={[bar, { width: size * 0.875 }]} />
    </View>
  );
}
