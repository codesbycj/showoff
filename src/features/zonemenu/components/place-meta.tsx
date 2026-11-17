import { View } from 'react-native';

import { place, reviews } from '../data/menu';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { BlockProps } from './_menu-head-shared';

export function PlaceMeta({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      {/* STEP 1.06 glyph
      <Glyph name="star" size={12} color={ct.star} />
      */}
      {/* STEP 1.07 t
      <T variant="rating">{place.rating.toFixed(1)}</T>
      */}
      {/* STEP 1.08 t
      <T variant="meta">{`(${reviews(place.reviews)})`}</T>
      */}
      {/* STEP 1.09 t
      <T variant="meta">·</T>
      */}
      {/* STEP 1.10 badge
      <T variant="badge">{place.badge}</T>
      */}
      {/* STEP 1.11 t
      <T variant="meta">·</T>
      */}
      {/* STEP 1.12 distance
      <T variant="meta">{place.distance}</T>
      */}
    </View>
  );
}
