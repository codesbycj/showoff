import { Text, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { FONT, tx } from '../theme';

/**
 * One Material Symbol.
 *
 * Every outlined icon in the showcase goes through this. It is a `Text` node
 * because that is what an icon font is, and the glyph is addressed by codepoint
 * (see `../symbols`) rather than by the ligature name Material's own CSS uses:
 * a ligature that fails to shape renders the literal word `notifications`, and
 * the web harness cannot see that.
 *
 * `includeFontPadding: false` matters on Android, where the glyph otherwise
 * sits a few dp high in its box — enough to knock an icon off-centre inside the
 * circular wells this design uses throughout. The property does nothing on web,
 * so the harness cannot catch it either.
 *
 * Three of this design's icons are also drawn filled (`favorite`, `star`,
 * `stars`); those come from `filled-icon.tsx`, since the packaged Material
 * Symbols static has no FILL axis.
 */
export function Symbol({
  name,
  size = 20,
  color = tx.onSurface,
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
