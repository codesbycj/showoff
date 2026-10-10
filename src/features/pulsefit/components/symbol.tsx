import { Text, type StyleProp, type TextStyle } from 'react-native';

import { SYMBOL, type SymbolName } from '../symbols';
import { pf } from '../theme';

/**
 * One Material Symbols glyph, addressed by codepoint.
 *
 * The design sets every icon in Material Symbols, which renders them as
 * ligatures over ordinary words — `<span>notifications</span>`. This app sets
 * the private-use codepoint instead, which is what lets the face subset from
 * 944KB to 3KB and removes any dependence on React Native shaping a
 * multi-letter ligature the same way on both platforms. A failure there
 * renders the literal word, and the web harness cannot see it.
 *
 * `lineHeight` matches `fontSize` because that is what the reference's
 * `text-[18px]` spans resolve to — an 18x18 box, with the glyph filling its
 * em. `includeFontPadding: false` keeps Android from adding the extra leading
 * that web does not have, which would push every icon a pixel or two down.
 */
export function Symbol({
  name,
  size,
  color = pf.inkVariant,
  style,
}: {
  name: SymbolName;
  size: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Text
      allowFontScaling={false}
      style={[
        {
          fontFamily: 'PulsefitSymbols_400Regular',
          fontSize: size,
          lineHeight: size,
          color,
          includeFontPadding: false,
          textAlign: 'center',
          width: size,
          height: size,
        },
        style,
      ]}
    >
      {SYMBOL[name]}
    </Text>
  );
}
