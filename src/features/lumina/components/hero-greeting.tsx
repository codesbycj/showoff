import { Text } from 'react-native';

import { FONT, ll } from '../theme';

/**
 * The home screen's two-line hero.
 *
 * The reference sets the first line at the regular weight and the second
 * extra-bold, one shade darker, as a single 32dp block with a 1.18 leading. It
 * is one `Text` with a hard newline rather than two, so the two lines cannot
 * drift apart: a second `Text` would add its own line box and the gap below the
 * hero would then depend on the font's descender rather than on the leading.
 */
export function HeroGreeting({ top, bottom }: { top: string; bottom: string }) {
  return (
    <Text
      style={{
        fontFamily: FONT.regular,
        fontSize: 32,
        lineHeight: 38,
        letterSpacing: -0.8,
        color: ll.ink,
      }}
    >
      {top}
      {'\n'}
      <Text style={{ fontFamily: FONT.extrabold, color: ll.inkDeep }}>{bottom}</Text>
    </Text>
  );
}
