import { Text, View } from 'react-native';

import { FONT, vy } from '../theme';

/**
 * Tracking on the digit row, and the amount it has to be nudged to stay centred.
 *
 * The export asks for `tracking-[0.35em]`, which does not fit: 16 digits and 15
 * spaces at 11dp mono need 324dp, and the band is 289dp wide inside its `px-7`.
 * The reference render wraps the last three characters onto a second line
 * because of it. A barcode number is a single row, so the tracking is cut to
 * 0.22em -- the widest value that fits at 393dp -- rather than reproducing a
 * wrap that is plainly a mistake.
 */
const TRACKING = 11 * 0.22;

/**
 * The orange foot of the pass: a bar graphic and a row of digits.
 *
 * The bars are a drawing, not a symbology — the digits beneath spell a
 * different number from anything these widths could encode — so the 41 widths
 * come across from the export verbatim rather than being generated.
 *
 * The digit row is centred *and* tracked out, which do not combine cleanly:
 * React Native adds `letterSpacing` after the last glyph as well as between
 * glyphs, so the ink sits half a space left of true centre. The export
 * compensates with `pl-1`, and that is kept here as an explicit
 * `paddingLeft: TRACKING` so the reason survives — it is cancelling the
 * trailing space, not padding the row.
 */
export function Barcode({ bars, digits }: { bars: readonly number[]; digits: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'stretch',
          height: 56,
          paddingHorizontal: 4,
        }}
        accessibilityLabel="Barcode"
      >
        {bars.map((w, i) => (
          <View
            key={i}
            style={{ width: w, height: '100%', borderRadius: 1, backgroundColor: vy.ink }}
          />
        ))}
      </View>

      <Text
        numberOfLines={1}
        style={{
          marginTop: 12,
          paddingLeft: TRACKING,
          textAlign: 'center',
          fontFamily: FONT.mono,
          fontSize: 11,
          lineHeight: 15,
          letterSpacing: TRACKING,
          color: vy.ink,
        }}
      >
        {digits}
      </Text>
    </View>
  );
}
