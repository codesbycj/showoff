import { Text, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { FONT, vt } from '../theme';

/**
 * One Material Symbol.
 *
 * Every icon in the showcase goes through this — 55 of them, which is the most
 * of any rebuild here. It is a `Text` node because that is what an icon font is,
 * and the glyph is addressed by codepoint (see `../symbols`) rather than by the
 * ligature name Material's own CSS uses: a ligature that fails to shape renders
 * the literal word `notifications`, and the web harness cannot see that.
 *
 * `includeFontPadding: false` matters on Android, where the glyph otherwise sits
 * a few dp high in its box — enough to knock an icon off-centre inside the 44dp
 * circular wells this design uses everywhere. The property does nothing on web,
 * so the harness cannot catch it either.
 *
 * Unlike Aura Legal, nothing here needs a filled variant: the export sets no
 * `FILL` axis on any of its 55 icons.
 */
export function Symbol({
  name,
  size = 20,
  color = vt.onSurface,
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
