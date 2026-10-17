import { Image, Pressable, View } from 'react-native';

import { Icon } from './icon';
import { T } from './text';
import type { Product } from '../data/home';
import { PRODUCT_IMAGE_H } from '../layout';
import { radius, vl } from '../theme';

/**
 * One product: a photograph, a save button over it, a name and a price under.
 *
 * The card takes no width of its own — the grid gives it one. That is what
 * lets the grid be two columns here and three on a wider screen without this
 * file knowing anything about it.
 */
export function ProductCard({
  product,
  onPress,
  onToggleSave,
}: {
  product: Product;
  onPress?: (p: Product) => void;
  onToggleSave?: (p: Product) => void;
}) {
  /*
   * The card and the save button are siblings, not nested.
   *
   * `accessibilityRole="button"` makes react-native-web render a real
   * `<button>`, and a button inside a button is invalid HTML — the static
   * build's parser lifts the inner one out, which breaks the card's layout and
   * logs `<button> cannot contain a nested <button>`.
   */
  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={() => onPress?.(product)}
        accessibilityRole="button"
        accessibilityLabel={`${product.name}, ${product.price}`}
      >
        {/* STEP 1.31 show what is for sale
        <View style={{ borderRadius: radius.card, overflow: 'hidden', backgroundColor: vl.field }}>
          <Image
            source={product.image}
            style={{ width: '100%', height: PRODUCT_IMAGE_H }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
        </View>
        */}

        {/* STEP 1.32 name it, and say what it costs
        <View style={{ paddingTop: 10, gap: 2 }}>
          <T variant="action" color={vl.muted} numberOfLines={1}>
            {product.name}
          </T>
          <T variant="price" color={vl.ink}>
            {product.price}
          </T>
        </View>
        */}
      </Pressable>

      {/* STEP 1.33 somewhere to keep the ones they like
      <Pressable
        onPress={() => onToggleSave?.(product)}
        accessibilityRole="button"
        accessibilityLabel={
          product.saved ? `Remove ${product.name} from saved` : `Save ${product.name}`
        }
        style={{ position: 'absolute', top: 10, right: 10 }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: radius.full,
            backgroundColor: vl.card,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name="heart"
            size={15}
            color={product.saved ? vl.pill : vl.inkSoft}
            filled={product.saved}
          />
        </View>
      </Pressable>
      */}
    </View>
  );
}
