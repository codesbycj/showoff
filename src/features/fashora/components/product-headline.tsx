import { Text, View } from 'react-native';

import { SP, TYPE, fa } from '../theme';

/**
 * The detail sheet's title block: category kicker, product name, price.
 *
 * The export aligns the row on `items-baseline`, and the left item is a column,
 * so what the price lines up with is that column's *first* line — the kicker,
 * not the name. The reference bears it out: "$108.00" sits level with "OUTDOOR
 * ESSENTIALS", a full line above the product name.
 *
 * Yoga's baseline alignment resolves against a nested column the same way, so
 * `alignItems: 'baseline'` is kept rather than faked with an offset.
 *
 * The kicker is `tracking-widest` — 0.1em, which at 11dp is 1.1 — and
 * uppercased in the markup rather than by CSS, so the string carries its own
 * case here too.
 */
export function ProductHeadline({
  kicker,
  name,
  price,
}: {
  kicker: string;
  name: string;
  price: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: SP.sm,
        paddingTop: SP.sm,
      }}
    >
      <View style={{ flexShrink: 1 }}>
        <Text style={{ ...TYPE.labelSm, letterSpacing: 1.1, color: fa.tertiary }}>
          {kicker.toUpperCase()}
        </Text>
        <Text style={{ ...TYPE.headlineLg, color: fa.onSurface }}>{name}</Text>
      </View>

      <Text style={{ ...TYPE.headlineLg, color: fa.primaryContainer }}>{price}</Text>
    </View>
  );
}
