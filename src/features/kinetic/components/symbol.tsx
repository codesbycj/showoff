import { Text, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { FONT, kc } from '../theme';

/**
 * One Material Symbol.
 *
 * Every icon on every Kinetic screen goes through this. It is a `Text` node
 * because that is what an icon font is — the glyph is addressed by codepoint
 * (see `../symbols`), not by the ligature name Material's own CSS uses, so
 * nothing depends on React Native shaping `local_shipping` into a single glyph.
 *
 * `includeFontPadding: false` matters on Android: without it the glyph sits
 * high in its box by a few dp, which is enough to knock an icon off-centre
 * inside a 40dp circular well — and the web harness cannot see it, because the
 * property does nothing on web.
 */
export function Symbol({
  name,
  size = 20,
  color = kc.ink,
  style,
}: {
  name: SymbolName;
  size?: number;
  color?: string;
  style?: TextStyle;
}) {
  return (
    <Text
      style={[
        {
          fontFamily: FONT.symbols,
          fontSize: size,
          lineHeight: size,
          color,
          includeFontPadding: false,
          textAlignVertical: 'center',
        },
        style,
      ]}
      allowFontScaling={false}
    >
      {SYMBOL[name]}
    </Text>
  );
}
