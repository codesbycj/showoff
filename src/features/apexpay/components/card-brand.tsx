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
   * One weight for both sizes. The export asks the stacked rows for
   * `font-extrabold` (800) and the active card for `font-black` (900), but
   * Plus Jakarta Sans stops at 800 and Space Grotesk — which the active card's
   * `font-headline-md` token actually selects — stops at 700. The browser
   * synthesises the difference by smearing the outline; React Native does not,
   * and would silently fall back to the regular face. So both are set in the
   * heaviest real weight there is, and the 900 is simply not available.
   */
  return (
    <Text
      allowFontScaling={false}
      style={{
        fontFamily: font.extrabold,
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
