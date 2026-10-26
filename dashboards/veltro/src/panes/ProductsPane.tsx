import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Info } from '@/components/Icon';
import { CATEGORIES, PRODUCTS, revenueOf, type Category, type Product } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type FilterId = 'all' | Category;
type SortKey = 'name' | 'units' | 'revenue' | 'stock';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  ...CATEGORIES.map((c) => ({ id: c as FilterId, label: c })),
];

const COLS = 'grid-cols-[minmax(0,1.5fr)_110px_96px_110px_80px_110px]';

const SLICE_TOKENS: Record<Category, string> = {
  Cosmetics: '--color-accent',
  Houseware: '--color-accent-soft',
  Apparel: '--color-accent-faint',
};

/**
 * The catalogue.
 *
 * The three figures above the table are summed from the rows that are
 * showing, and the ring beside it is built from the category-independent rows
 * so picking a category does not leave one slice alone in it.
 */
export function ProductsPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('revenue');
  const [desc, setDesc] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const base = PRODUCTS.filter((p) =>
    q ? (p.name + ' ' + p.category).toLowerCase().includes(q) : true,
  );
  const rows = base
    .filter((p) => (filter === 'all' ? true : p.category === filter))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'name') return a.name.localeCompare(b.name) * -dir;
      if (sort === 'units') return (a.unitsSold - b.unitsSold) * dir;
      if (sort === 'stock') return (a.stock - b.stock) * dir;
      return (revenueOf(a) - revenueOf(b)) * dir;
    });

  const revenue = rows.reduce((s, p) => s + revenueOf(p), 0);
  const units = rows.reduce((s, p) => s + p.unitsSold, 0);
  const out = rows.filter((p) => p.stock === 0).length;

  const slices = CATEGORIES.map((c) => ({
    id: c,
    label: c,
    value: base.filter((p) => p.category === c).reduce((s, p) => s + revenueOf(p), 0),
    token: SLICE_TOKENS[c],
  })).filter((s) => s.value > 0);

  const head = (key: SortKey, text: string, align: 'left' | 'right' = 'right') => (
    <button
      type="button"
      data-sort={key}
      aria-pressed={sort === key}
      onClick={() => {
        if (sort === key) setDesc((v) => !v);
        else {
          setSort(key);
          setDesc(true);
        }
      }}
      className={cx(
        'hover:text-ink flex items-center gap-1 transition-colors',
        align === 'right' ? 'justify-end' : 'justify-start',
        sort === key ? 'text-ink' : 'text-muted',
      )}
    >
      {text}
      <Icon
        name="chevron-down"
        size={11}
        strokeWidth={2.6}
        className={cx(
          'transition-[transform,opacity]',
          sort === key ? 'opacity-100' : 'opacity-0',
          sort === key && !desc && 'rotate-180',
        )}
      />
    </button>
  );

  return (
    <div data-pane="products" className="grid h-full grid-cols-[1fr_320px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Revenue"
            value={usd(revenue)}
            note={`${rows.length} of ${PRODUCTS.length} lines`}
          />
          <Figure label="Units" value={num(units)} note="sold across those lines" />
          <Figure
            label="Out of stock"
            value={String(out)}
            note="need restocking"
            tone={out ? 'danger' : 'ink'}
          />
        </div>

        <Card pane="catalogue" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <span className="flex items-center gap-1.5">
                Catalogue <Info />
              </span>
            }
            action={
              <Segmented
                name="category"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />

          <div
            className={cx(
              'text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-2 border-b border-[var(--color-line)] px-2 pb-2 text-[10.5px] font-bold whitespace-nowrap',
              COLS,
            )}
          >
            {head('name', 'Product', 'left')}
            <span className="text-right">Category</span>
            {head('units', 'Sales')}
            {head('revenue', 'Revenue')}
            {head('stock', 'Stock')}
            <span className="text-right">Status</span>
          </div>

          <div data-scroller="catalogue" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="product" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((p) => (
                  <li key={p.id}>
                    <Row product={p} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card pane="mix" className="min-h-0 p-4">
        <CardHead
          title={
            <span className="flex items-center gap-1.5">
              Revenue mix <Info />
            </span>
          }
        />

        <div className="mt-3 grid shrink-0 place-items-center">
          <Donut
            slices={slices}
            size={150}
            thickness={20}
            sweep={360}
            from={-90}
            active={active}
            onActive={setActive}
            center={
              <div>
                <p className="text-muted m-0 text-[10.5px]">{active ? active : 'All lines'}</p>
                <p className="tnum text-ink m-0 mt-1 text-[17px] leading-none font-extrabold">
                  {usd(active ? (slices.find((s) => s.id === active)?.value ?? 0) : revenue)}
                </p>
              </div>
            }
          />
        </div>

        <ul className="m-0 mt-4 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
          {slices.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                data-legend={s.id}
                aria-pressed={active === s.id}
                onClick={() => setActive(active === s.id ? null : s.id)}
                className={cx(
                  'w-full rounded-lg px-1.5 py-1 text-left transition-opacity',
                  active !== null && active !== s.id ? 'opacity-45' : 'opacity-100',
                  active === s.id ? 'bg-sunken' : 'hover:bg-sunken',
                )}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="text-body flex items-center gap-2 text-[12px]">
                    <span
                      aria-hidden="true"
                      style={{ background: `var(${s.token})` }}
                      className="h-2.5 w-2.5 rounded-full"
                    />
                    {s.label}
                  </span>
                  <span className="tnum text-ink text-[12px] font-bold">{usd(s.value)}</span>
                </span>
                <Meter
                  value={(s.value / Math.max(...slices.map((x) => x.value), 1)) * 100}
                  tone="accent"
                  height={6}
                  className="mt-1.5"
                />
              </button>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Figure({
  label,
  value,
  note,
  tone = 'ink',
}: {
  label: string;
  value: string;
  note: string;
  tone?: 'ink' | 'danger';
}) {
  return (
    <Card pane={'fig-' + label.split(' ')[0].toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p
        className={cx(
          'tnum m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.03em]',
          tone === 'danger' ? 'text-danger' : 'text-ink',
        )}
      >
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}

function Row({ product }: { product: Product }) {
  return (
    <div
      data-row={product.id}
      className={cx(
        'border-line hover:bg-sunken mr-2.5 grid items-center gap-2 border-b px-2 py-2.5 transition-colors',
        COLS,
      )}
    >
      <span className="text-ink min-w-0 truncate text-[12.5px] font-semibold">{product.name}</span>
      <span className="text-muted text-right text-[11.5px]">{product.category}</span>
      <span className="tnum text-body text-right text-[11.5px]">{num(product.unitsSold)} pcs</span>
      <span className="tnum text-ink text-right text-[12px] font-bold">
        {usd(revenueOf(product))}
      </span>
      <span className="tnum text-body text-right text-[11.5px]">{num(product.stock)}</span>
      <span className="flex justify-end">
        <Badge tone={product.stock > 0 ? 'positive' : 'danger'}>
          {product.stock > 0 ? 'In Stock' : 'Out of stock'}
        </Badge>
      </span>
    </div>
  );
}
