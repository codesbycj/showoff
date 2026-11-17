import { Image, Pressable, View } from 'react-native';

import { products, usd, type Product } from '../data/browse';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type CardProps = {
  item: Product;
  col: number;
  photoH: number;
  radius: number;
  heart: number;
  onPress: () => void;
};

/**
 * One product.
 *
 * The photograph carries a numeric width and height — absolute insets alone
 * make an `Image` paint nothing on native, silently (Part 7) — and the heart
 * sits **wholly inside** the photo rather than on its corner, so it can never
 * straddle an edge (R3).
 */
function Card({ item, col, photoH, radius, heart, onPress }: CardProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={item.name}>
      {({ pressed }) => (
        <View style={{ width: col, opacity: pressed ? 0.85 : 1 }}>
          <View
            style={{
              width: col,
              height: photoH,
              borderRadius: radius,
              overflow: 'hidden',
              backgroundColor: ct.card,
            }}
          >
            <Image source={item.photo} style={{ width: col, height: photoH }} resizeMode="cover" />
          </View>

          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: heart,
              height: heart,
              borderRadius: heart / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
            }}
          >
            <Glyph
              name={item.liked ? 'heartFill' : 'heart'}
              size={15}
              color={item.liked ? ct.strike : ct.ink}
              strokeWidth={1.7}
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <T variant="cardCategory">{item.category}</T>
            <T variant="cardName" numberOfLines={1}>
              {item.name}
            </T>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <T variant="cardPrice">{usd(item.price)}</T>
              {item.was ? <T variant="cardWas">{usd(item.was)}</T> : null}
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

type Props = {
  margin: number;
  gutter: number;
  col: number;
  photoH: number;
  radius: number;
  heart: number;
  onSelect: () => void;
};

/**
 * The grid.
 *
 * Two columns, laid out as explicit rows rather than a wrap, so a reveal can
 * stage one card at a time without the remaining cards reflowing underneath it.
 *
 * It **runs past the fold**, which is what the board does — its grid is cropped
 * by the dock. R6 allows a list that genuinely continues, and I3's lever for
 * the space is the row the board cut, never a spacer.
 */
export function ProductGrid({ margin, gutter, col, photoH, radius, heart, onSelect }: Props) {
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += 2) rows.push(products.slice(i, i + 2));

  return (
    <View style={{ marginHorizontal: margin, gap: 18 }}>
      {/* STEP 1.17 card
      {rows.map((row) => (
        <View key={row[0].id} style={{ flexDirection: 'row', gap: gutter }}>
          {row.map((item) => (
            <Card
              key={item.id}
              item={item}
              col={col}
              photoH={photoH}
              radius={radius}
              heart={heart}
              onPress={onSelect}
            />
          ))}
        </View>
      ))}
      */}
    </View>
  );
}
