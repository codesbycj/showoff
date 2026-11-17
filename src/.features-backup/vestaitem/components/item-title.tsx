import { View } from 'react-native';

import { product, usd } from '../data/item';
import { T } from './text';

type Props = { margin: number; height: number };

/** Name, category and price, on one line as the board sets them. */
export function ItemTitle({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}
    >
      <View style={{ flex: 1 }}>
        <T variant="itemName" numberOfLines={1}>
          {product.name}
        </T>
        <T variant="itemCategory">{product.category}</T>
      </View>
      <T variant="itemPrice">{usd(product.price)}</T>
    </View>
  );
}
