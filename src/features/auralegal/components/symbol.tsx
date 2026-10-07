import { Text, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { FONT, al } from '../theme';

/**
 * One Material Symbol.
 *
 * Every outlined icon in the showcase goes through this. It is a `Text` node
 * because that is what an icon font is — the glyph is addressed by codepoint
 * (see `../symbols`), not by the ligature name Material's own CSS uses, so
 * nothing depends on React Native shaping `arrow_back_ios_new` into a single
 * glyph. A ligature that fails to shape renders the literal word, and the web
 * harness cannot see that.
 *
 * `includeFontPadding: false` matters on Android: without it the glyph sits a
 * few dp high in its box, which is enough to knock an icon off-centre inside a
 * circular well — and the property does nothing on web, so the harness cannot
 * catch it either.
 *
 * The three icons the design *fills* (`star`, `verified`, `calendar_month`) do
 * not come through here. The packaged Material Symbols static has no FILL axis,
 * so those are drawn in `filled-icon.tsx` instead.
 */
export function Symbol({
  name,
  size = 20,
  color = al.onSurface,
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
          fontFamily: FONT.symbol,
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
