import { View } from 'react-native';

import { R, jf } from '../theme';
import { BrandMark, type BrandKey, NikitinN } from './brand-mark';
import { Flame } from './flame';

/**
 * The job detail hero's paired discs: the company's mark, and a lime disc
 * carrying a flame that overlaps it by 8dp.
 *
 * The reference wraps the pair in a pill with `overflow: hidden`. That clip does
 * nothing here — both children are circles of the pill's own height, so nothing
 * reaches the boundary — and it is left off deliberately: a clip and a shadow on
 * one View is the combination Android renders unreliably, and this pair would
 * have both.
 */
export function DoubleBadge({
  brand,
  fill,
  size = 80,
}: {
  brand: BrandKey;
  fill: string;
  size?: number;
}) {
  const glyph = Math.round(size * 0.5);
  const disc = {
    width: size,
    height: size,
    borderRadius: R.full,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={[disc, { backgroundColor: fill }]}>
        {brand === 'nikitin' ? <NikitinN size={glyph} /> : <BrandMark brand={brand} size={glyph} />}
      </View>
      <View style={[disc, { backgroundColor: jf.accentYellow, marginLeft: -8 }]}>
        <Flame size={Math.round(size * 0.45)} tone={jf.ink} />
      </View>
    </View>
  );
}
