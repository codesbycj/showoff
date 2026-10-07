import { Text, View } from 'react-native';

import { BRAND } from '../data/election';
import { FONT, vt } from '../theme';

/**
 * "VoteNG" — the name in ink, the suffix in the brand green.
 *
 * The splash sets it at 36dp on white-over-neon and the home header at 24dp on
 * slate-over-green, so both the size and the pair of colours are props. The
 * tracking is derived rather than passed: the export sets `tracking-tight` at
 * both sizes, which is -0.025em, so it scales with the type.
 */
export function Wordmark({
  size = 24,
  ink = vt.ink,
  accent = vt.primary,
}: {
  size?: number;
  ink?: string;
  accent?: string;
}) {
  const style = {
    fontFamily: FONT.black,
    fontSize: size,
    lineHeight: size,
    letterSpacing: -0.025 * size,
  } as const;

  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[style, { color: ink }]}>{BRAND.name}</Text>
      <Text style={[style, { color: accent }]}>{BRAND.nameAccent}</Text>
    </View>
  );
}
