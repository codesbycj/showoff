import { useState } from 'react';

import { Badge } from '@/components/Badge';
import { Card, CardHead } from '@/components/Card';
import { Segmented, SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { ProductGlyph } from '@/components/ProductGlyph';
import { PRODUCTS, type Product } from '@/data/deck';
import { stockState, type StockId } from '@/lib/stock';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type SortId = 'sold' | 'price' | 'stock' | 'rating';

const SORTS: { id: SortId; label: string }[] = [
  { id: 'sold', label: 'Best selling' },
  { id: 'price', label: 'Highest price' },
  { id: 'stock', label: 'Most stock' },
  { id: 'rating', label: 'Best rated' },
];

const STOCK: { id: StockId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'in', label: 'In stock' },
  { id: 'low', label: 'Low' },
  { id: 'out', label: 'Out' },
];

const COLS = 'grid-cols-[minmax(0,1fr)_104px_84px_150px_80px_72px]';

/**
 * The catalogue. Two controls and the shell's search narrow it; the footer
 * counts what is left and totals the stock on hand, so one click changes two
 * numbers on screen.
 */
export function ProductsTable({
  query,
  selected,
  onSelect,
}: {
  query: string;
  selected: string;
  onSelect: (id: string) => void;
}) {
  const [sort, setSort] = useState<SortId>('sold');
  const [stock, setStock] = useState<StockId>('all');

  const q = query.trim().toLowerCase();
  const rows = PRODUCTS.filter((p) => (stock === 'all' ? true : stockState(p) === stock))
    .filter((p) =>
      q ? (p.name + ' ' + p.variant + ' ' + p.category).toLowerCase().includes(q) : true,
    )
    .slice()
    .sort((a, b) => {
      if (sort === 'price') return b.price - a.price;
      if (sort === 'stock') return b.stock - a.stock;
      if (sort === 'rating') return b.rating - a.rating;
      return b.sold - a.sold;
    });

  const onHand = rows.reduce((t, p) => t + p.stock, 0);

  return (
    <Card pane="catalogue" className="col-span-2 min-h-0 p-5 pr-3">
      <CardHead
        title={
          <>
            Products{' '}
            <span className="text-muted ml-1 text-[14px] font-semibold">{rows.length}</span>
          </>
        }
        icon="box"
        className="pr-2"
        action={
          <>
            <Segmented name="Stock level" value={stock} options={STOCK} onChange={setStock} />
            <SelectPill name="sort" value={sort} options={SORTS} onChange={setSort} />
          </>
        }
      />

      <div
        className={cx(
          'border-line text-muted mt-4 grid shrink-0 items-center gap-3 border-b pr-3 pb-2.5 text-[11.5px] font-bold tracking-[0.04em] uppercase',
          COLS,
        )}
      >
        <span>Product</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span>Sold</span>
        <span>Rating</span>
      </div>

      <div data-scroller="catalogue" className="scroll-region -mr-1 min-h-0 flex-1 pr-2">
        {rows.length === 0 ? (
          <div className="grid h-full place-items-center px-6 text-center">
            <p className="text-muted m-0 text-[13px]">
              No product matches <span className="text-ink font-bold">{query || stock}</span>.
            </p>
          </div>
        ) : (
          <ul className="m-0 list-none p-0">
            {rows.map((product) => (
              <li key={product.id}>
                <Row
                  product={product}
                  selected={selected === product.id}
                  onSelect={() => onSelect(product.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-line text-muted mt-1 flex shrink-0 items-center justify-between border-t pt-3 pr-3 text-[12px]">
        <span>
          {rows.length} of {PRODUCTS.length} products
        </span>
        <span>{num(onHand)} units on hand</span>
      </div>
    </Card>
  );
}

function Row({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  const state = stockState(product);
  const bar = Math.min(100, (product.stock / 500) * 100);

  return (
    <button
      type="button"
      data-row={product.id}
      onClick={onSelect}
      aria-pressed={selected}
      className={cx(
        'border-line grid w-full items-center gap-3 border-b py-2.5 pr-3 text-left transition-colors',
        COLS,
        selected ? 'bg-sunken' : 'hover:bg-sunken/60',
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <ProductGlyph glyph={product.glyph} size={34} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[13px] font-bold">{product.name}</span>
          <span className="text-muted block truncate text-[11.5px]">{product.variant}</span>
        </span>
      </span>

      <span>
        <Badge tone="quiet">{product.category}</Badge>
      </span>

      <span className="text-ink text-[13px] font-bold">{usd(product.price)}</span>

      <span className="flex items-center gap-2.5">
        <span className="bg-sunken-deep h-1.5 flex-1 overflow-hidden rounded-full">
          <span
            style={{ width: bar + '%' }}
            className={cx(
              'block h-full rounded-full transition-[width] duration-500',
              state === 'out' ? 'bg-warn' : state === 'low' ? 'bg-info' : 'bg-accent',
            )}
          />
        </span>
        <span className="text-muted w-9 shrink-0 text-right text-[12px] tabular-nums">
          {product.stock}
        </span>
      </span>

      <span className="text-body text-[12.5px] font-semibold tabular-nums">
        {num(product.sold)}
      </span>

      <span className="flex items-center gap-1">
        <Icon name="check" size={13} className="text-accent" />
        <span className="text-body text-[12.5px] font-semibold">{product.rating.toFixed(1)}</span>
      </span>
    </button>
  );
}
