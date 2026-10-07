import { View } from 'react-native';

import { R } from '../theme';
import { BrandMark, type BrandKey, NikitinN } from './brand-mark';

/**
 * A company's mark in its own coloured disc.
 *
 * The mark's size is derived from the disc rather than passed, because the
 * reference keeps the same ratio at every size it draws one — 24 in 48 on the
 * feed, 20 in 40 in a list, 28 in 56 on the detail hero.
 */
export function CompanyBadge({
  brand,
  fill,
  size = 48,
  tone = '#FFFFFF',
}: {
  brand: BrandKey;
  fill: string;
  size?: number;
  tone?: string;
}) {
  const glyph = Math.round(size * 0.5);
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: R.full,
        backgroundColor: fill,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.06,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      }}
    >
      {brand === 'nikitin' ? (
        <NikitinN size={glyph} tone={tone} />
      ) : (
        <BrandMark brand={brand} size={glyph} tone={tone} />
      )}
    </View>
  );
}
