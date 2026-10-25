import { useState } from 'react';

import { PRODUCTS } from '@/data/deck';
import { ProductDetail } from '@/features/ProductDetail';
import { ProductsTable } from '@/features/ProductsTable';

/**
 * Products. Assembly only: a catalogue that filters and sorts, and the detail
 * of whichever row is selected.
 *
 * The pane owns the selection, not the table — so what selecting a row *does*
 * is one line here rather than a change inside the table (rule 4). The detail
 * is keyed on the product, so its restock flag resets by construction instead
 * of by an effect.
 */
export function ProductsPane({ query }: { query: string }) {
  const [selected, setSelected] = useState(PRODUCTS[0].id);
  const product = PRODUCTS.find((p) => p.id === selected) ?? PRODUCTS[0];

  return (
    <div
      data-pane="products"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(300px,336px)] gap-4"
    >
      <ProductsTable query={query} selected={selected} onSelect={setSelected} />
      <ProductDetail key={product.id} product={product} />
    </div>
  );
}
