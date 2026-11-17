import { Pressable, View } from 'react-native';

import { cta, stay } from '../data/stay';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; bottom: number; radius: number };

/**
 * The pinned price bar.
 *
 * **R9: the total is computed.** `nightly * nights` is €384 — the board prints
 * €384 under "3 nights" beside a listing it priced at €91 a night, and €91 ×
 * 3 is €273. The arithmetic is the fix, not a different number.
 *
 * **It is not padded by `insets.bottom`.** `bottom` already is the inset plus
 * a hair; adding it again reserves the system's strip twice and opens the band
 * under the bar that I3 exists for.
 */
export function PriceBar({ margin, height, bottom, radius }: Props) {
  const total = stay.nightly * stay.nights;

  return (
    <View
      style={{
        position: 'absolute',
        left: margin,
        right: margin,
        bottom,
        height,
        borderRadius: radius,
        backgroundColor: ct.dark,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 22,
        paddingRight: 8,
        shadowColor: '#000000',
        shadowOpacity: 0.24,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 10 },
        elevation: 10,
      }}
    >
      {/* STEP 1.30 view
      <View>
        <T variant="barMeta">
          {stay.dates} · {stay.nights} nights
        </T>
        <T variant="barTotal">€{total}</T>
      </View>
      */}

      {/* STEP 1.31 label
      <Pressable accessibilityRole="button" accessibilityLabel={cta.label}>
        <View
          style={{
            height: 54,
            paddingHorizontal: 26,
            borderRadius: 27,
            backgroundColor: ct.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="cta">{cta.label}</T>
        </View>
      </Pressable>
      */}
    </View>
  );
}
