import { View } from 'react-native';

import { product } from '../data/item';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * What the thing is.
 *
 * **R5: one run of body copy, under 110 characters.** The board's paragraph
 * runs to 183 and trails off into a "Learn More" placed mid-sentence; this says
 * the same thing as three measurements and a fit, which is what a product page
 * is for.
 */
export function BlurbRow({ margin, height }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="blurb">
        {product.blurb} <T variant="blurbMore">{product.more}</T>
      </T>
    </View>
  );
}
