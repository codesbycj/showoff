import { Text, View } from 'react-native';

import { FONT, R, ps } from '../theme';
import { Symbol } from './symbol';
import { type SymbolName } from '../symbols';

/**
 * One of the three reassurance tiles under the boot bar — "FDIC Insured",
 * "0% FX Spread", "Instant Payout".
 *
 * The label is set at 10dp rather than the scale's 11dp `labelSm`. That is the
 * reference's own override (`text-[10px]` on top of `font-label-sm`), and it is
 * what keeps "Instant Payout" on one line in a third of 310dp.
 */
export function AssuranceTile({ icon, label }: { icon: SymbolName; label: string }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 8,
        borderRadius: R.base,
        backgroundColor: ps.surfaceLow,
      }}
    >
      <Symbol name={icon} size={18} color={ps.onSurface} style={{ marginBottom: 2 }} />
      <Text
        style={{
          fontFamily: FONT.semibold,
          fontSize: 10,
          lineHeight: 14,
          letterSpacing: 0.2,
          color: ps.secondary,
        }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}
