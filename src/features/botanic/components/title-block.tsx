import { Text, View } from 'react-native';

import { PRODUCT } from '../data/product';
import { bt, type as t } from '../theme';
import { DrawnIcon } from './drawn-icon';

/**
 * The brand tag, the product's name, and the two prices.
 *
 * The title and the price column are a `justify-between` row with the title on
 * `flex-1 min-w-0` — so the title takes whatever the price leaves and wraps
 * inside it, rather than the two being given fixed shares. At this width that
 * puts the title on two lines and the price column at 63dp.
 *
 * Both prices sit on their own baseline grid: the price is `leading-none` (a
 * 28dp line on a 28dp face) where the title is `leading-tight` (35 on 28), so
 * the two are deliberately not aligned to each other. The right column's
 * `pt-1` is what lines the price's cap up with the title's.
 *
 * The leaf is a `FILL 1` glyph, which the static symbol cut does not carry —
 * see `drawn-icon.tsx`.
 */
export function TitleBlock() {
  return (
    <View style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <DrawnIcon name="spa" size={18} color={bt.accent} />
        <Text
          style={{
            fontFamily: t.labelMdWide.family,
            fontSize: t.labelMdWide.size,
            lineHeight: t.labelMdWide.line,
            letterSpacing: t.labelMdWide.tracking,
            color: bt.inkVariant,
          }}
        >
          {PRODUCT.brand.toUpperCase()}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 16 }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Text
            style={{
              fontFamily: t.headlineLg.family,
              fontSize: t.headlineLg.size,
              lineHeight: t.headlineLg.line,
              letterSpacing: t.headlineLg.tracking,
              color: bt.ink,
            }}
          >
            {PRODUCT.title.toUpperCase()}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: t.bodySm.family,
              fontSize: t.bodySm.size,
              lineHeight: t.bodySm.line,
              color: bt.muted,
            }}
          >
            {PRODUCT.size}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', paddingTop: 4 }}>
          <Text
            style={{
              fontFamily: t.headlineLgTight.family,
              fontSize: t.headlineLgTight.size,
              lineHeight: t.headlineLgTight.line,
              color: bt.accent,
            }}
          >
            {PRODUCT.price}
          </Text>
          <Text
            style={{
              marginTop: 2,
              fontFamily: t.labelMdPrice.family,
              fontSize: t.labelMdPrice.size,
              lineHeight: t.labelMdPrice.line,
              color: bt.muted,
              textDecorationLine: 'line-through',
            }}
          >
            {PRODUCT.wasPrice}
          </Text>
        </View>
      </View>
    </View>
  );
}
