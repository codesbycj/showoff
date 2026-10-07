import { Text, View } from 'react-native';

import { FONT, R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * Rating, review count and stock badge.
 *
 * The star is outlined. The export asks for `FILL 1` on it and its own render
 * ignores that — see `filled-icon.tsx` — so it comes from the icon subset like
 * every other outlined glyph here.
 *
 * The badge is pushed right by `ml-auto` in the export; here that is a spacer
 * with `flex: 1`, which is the same thing and does not depend on the row having
 * a known width.
 */
export function RatingRow({
  rating,
  reviews,
  stock,
}: {
  rating: string;
  reviews: string;
  stock: string;
}) {
  return (
    <View
      style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, marginTop: SP.sm }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Symbol name="star" size={16} color={fa.primaryContainer} />
        <Text
          style={{ ...TYPE.labelMd, fontFamily: FONT.bold, color: fa.onSurface, marginLeft: 4 }}
        >
          {rating}
        </Text>
      </View>

      <Text style={{ ...TYPE.bodySm, color: fa.outline }}>•</Text>
      <Text style={{ ...TYPE.bodySm, color: fa.outline }}>{reviews}</Text>

      <View style={{ flex: 1 }} />

      <View
        style={{
          paddingHorizontal: SP.sm,
          paddingVertical: 2,
          borderRadius: R.full,
          backgroundColor: fa.surfaceContainerLow,
        }}
      >
        <Text style={{ ...TYPE.labelSm, color: fa.onSurfaceVariant }}>{stock}</Text>
      </View>
    </View>
  );
}
