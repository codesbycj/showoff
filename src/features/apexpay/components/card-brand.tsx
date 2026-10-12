import { Text, View } from 'react-native';

import type { Network } from '../data/home';
import { ax, font } from '../theme';

/**
 * A card network mark, and the masked number beside it.
 *
 * Visa is set as type — the export sets the literal string `VISA` in its own
 * body face at `font-extrabold` or `font-black`, not as a logo, so copying it
 * as type is the faithful thing to do and not an approximation. Mastercard is
 * two overlapping discs in the brand's own red and amber, which is what the
 * markup draws.
 *
 * **The mask is bullets, not asterisks.** The export sets U+2022 with
 * `tracking-widest`; writing it with `*` characters changes both the colour
 * weight of the row and its width, and is the kind of thing that looks right
 * until it is next to the reference.
 */
const MASK = '•••• •••• ••••';

export function NetworkMark({ network, size }: { network: Network; size: number }) {
  if (network === 'mastercard') {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', width: 22, height: 14 }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: ax.mcRed,
            opacity: 0.9,
          }}
        />
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: ax.mcAmber,
            opacity: 0.9,
            marginLeft: -6,
          }}
        />
      </View>
    );
  }

  /*
   * Two different faces, not one at two sizes. The collapsed rows set VISA in
   * `font-headline-sm`, which is Plus Jakarta Sans; the active card sets it in
   * `font-headline-md`, which is Space Grotesk. Collapsing them to one family
   * makes the active mark 4dp too wide and pushes the number beside it out —
   * the reference's 16px VISA is actually *narrower* than its 15px one, which
   * is the giveaway that the face changes.
   *
   * The weights asked for do not exist either way: `font-extrabold` (800) and
   * `font-black` (900) against a Plus Jakarta Sans that stops at 800 and a
   * Space Grotesk that stops at 700. A browser fakes the rest by smearing the
   * outline; React Native does not, and would fall back to the regular face.
   * So each is set in the heaviest real weight its own family has.
   */
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: size >= 16 ? font.display : font.extrabold,
        fontSize: size,
        lineHeight: 20,
        // `tracking-wider`, 0.05em.
        letterSpacing: size * 0.05,
        // The export sets `italic` on both marks. Plus Jakarta Sans has no
        // italic cut registered here, so this is the synthesised oblique —
        // which is what the browser draws for the reference too.
        fontStyle: 'italic',
        color: ax.ink,
      }}
    >
      VISA
    </Text>
  );
}

export function MaskedNumber({ last4, color }: { last4: string; color: string }) {
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: font.body,
        fontSize: 13,
        lineHeight: 20,
        // `tracking-widest` is 0.1em, which at 13px is 1.3.
        letterSpacing: 1.3,
        color,
      }}
    >
      {MASK} {last4}
    </Text>
  );
}
