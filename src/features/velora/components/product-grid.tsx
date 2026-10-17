import { View } from 'react-native';

import { ProductCard } from './product-card';
import type { Product } from '../data/home';
import { GRID_GAP } from '../layout';

/**
 * The products, two to a row.
 *
 * Chunked into rows of two with a `gap` rather than laid out with `flexWrap`.
 * A wrap would work for the four products this screen has, but it gives every
 * card the same height — the tallest in the whole set, not the tallest in its
 * own row — so one long product name pushes a gap under every other card on
 * the screen. Rows keep that to the row it happened in.
 */
export function ProductGrid({
  products,
  columns = 2,
  onSelect,
  onToggleSave,
}: {
  products: Product[];
  columns?: number;
  onSelect?: (p: Product) => void;
  onToggleSave?: (p: Product) => void;
}) {
  const rows: Product[][] = [];
  for (let i = 0; i < products.length; i += columns) {
    rows.push(products.slice(i, i + columns));
  }

  return (
    <View style={{ gap: GRID_GAP }}>
      {rows.map((row) => (
        <View key={row.map((p) => p.id).join('-')} style={{ flexDirection: 'row', gap: GRID_GAP }}>
          {row.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onPress={onSelect}
              onToggleSave={onToggleSave}
            />
          ))}
          {/*
            A short last row keeps its cards at column width instead of letting
            them stretch across the whole page.
          */}
          {row.length < columns
            ? Array.from({ length: columns - row.length }, (_, i) => (
                <View key={`filler-${i}`} style={{ flex: 1 }} />
              ))
            : null}
        </View>
      ))}
    </View>
  );
}
