import { View } from 'react-native';

import { product } from '../data/item';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The three review pills the board sets under the title: the score, the share
 * who recommend it, and the comment count.
 */
export function RatingPills({ margin, height }: Props) {
  const pill = {
    height,
    paddingHorizontal: 12,
    borderRadius: height / 2,
    backgroundColor: ct.tray,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 6,
  };

  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap: 8 }}>
      {/* STEP 1.13 glyph
      <View style={pill}>
        <Glyph name="star" size={14} color={ct.ink} />
        <T variant="pill">
          {product.rating} · {product.reviews} reviews
        </T>
      </View>
      */}

      {/* STEP 1.14 glyph
      <View style={pill}>
        <Glyph name="thumb" size={14} color={ct.ink} strokeWidth={1.6} />
        <T variant="pill">{product.recommend}%</T>
      </View>
      */}

      {/* STEP 1.15 comments
      <View style={pill}>
        <Glyph name="comment" size={14} color={ct.ink} strokeWidth={1.6} />
        <T variant="pill">{product.comments}</T>
      </View>
      */}
    </View>
  );
}
