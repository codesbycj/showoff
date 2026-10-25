import { useState } from 'react';

import { Card, CardHead } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { ProductGlyph } from '@/components/ProductGlyph';
import { PRODUCTS, type Product } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short } from '@/lib/format';

/**
 * The two best sellers as tiles, the leader filled.
 *
 * Selecting a tile moves the fill, which is the whole interaction the reference
 * implies by drawing one tile dark and leaving the other light.
 */
export function TopProduct() {
  const top = PRODUCTS.slice()
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 2);
  const [lead, setLead] = useState(top[0].id);

  return (
    <Card pane="top-product" className="h-[188px] shrink-0 p-4">
      <CardHead
        title="Top Product"
        icon="box"
        action={<IconButton icon="dots" label="More actions" square size={34} />}
      />

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-2 gap-2.5">
        {top.map((product) => (
          <Tile
            key={product.id}
            product={product}
            lead={lead === product.id}
            onSelect={() => setLead(product.id)}
          />
        ))}
      </div>
    </Card>
  );
}

function Tile({
  product,
  lead,
  onSelect,
}: {
  product: Product;
  lead: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      data-tile={product.id}
      onClick={onSelect}
      aria-pressed={lead}
      className={cx(
        'flex min-h-0 flex-col items-start justify-between rounded-2xl p-3 text-left transition-colors duration-200',
        lead ? 'bg-fill text-fill-fg' : 'border-line hover:bg-sunken border',
      )}
    >
      <ProductGlyph glyph={product.glyph} size={34} tone={lead ? 'plain' : 'sunken'} />
      <span className="mt-auto block w-full pt-3">
        <span
          className={cx('block truncate text-[13px] font-bold', lead ? 'text-fill-fg' : 'text-ink')}
        >
          {product.name}
        </span>
        <span className="mt-1 flex items-center gap-1.5">
          <span
            className={cx('text-[11.5px] font-semibold', lead ? 'text-fill-fg/60' : 'text-muted')}
          >
            {short(product.sold)} sales
          </span>
          <span
            className={cx(
              'rounded-full px-1.5 py-[1px] text-[11px] font-bold',
              product.delta >= 0
                ? lead
                  ? 'bg-accent text-ink'
                  : 'bg-accent-soft text-accent-deep'
                : lead
                  ? 'bg-warn text-ink'
                  : 'bg-warn-soft text-warn-deep',
            )}
          >
            {(product.delta >= 0 ? '+' : '') + product.delta}%
          </span>
        </span>
      </span>
    </button>
  );
}
