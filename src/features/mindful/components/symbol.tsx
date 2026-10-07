import { Text, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { FONT, mp } from '../theme';

/**
 * One Material Symbol.
 *
 * Every icon on every Mindful Pop screen goes through this. It is a `Text` node
 * because that is what an icon font is — the glyph is addressed by codepoint
 * (see `../symbols`), not by the ligature name Material's own CSS uses, so
 * nothing depends on React Native shaping `self_improvement` into a single
 * glyph.
 *
 * `includeFontPadding: false` matters on Android: without it the glyph sits high
 * in its box by a few dp, which is enough to knock an icon off-centre inside a
 * circular well — and the web harness cannot see it, because the property does
 * nothing on web. This design puts an icon inside a circle on nearly every row,
 * so that is not a hypothetical here.
 */
export function Symbol({
  name,
  size = 20,
  color = mp.ink,
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
