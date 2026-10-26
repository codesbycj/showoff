import { useState } from 'react';

import { Badge, Card, CardHead, Empty, Meter } from '@/components/Bits';
import { Segmented } from '@/components/Controls';
import { Icon, Mark } from '@/components/Icon';
import { CUSTOMERS, PRODUCTS, TXNS, productOf, txnTotal, type Status, type Txn } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num, usd } from '@/lib/format';

type FilterId = 'all' | Status;
type SortKey = 'date' | 'total' | 'product';

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'Completed', label: 'Completed' },
  { id: 'Pending', label: 'Pending' },
  { id: 'Refunded', label: 'Refunded' },
];

const TONE: Record<Status, 'positive' | 'warn' | 'danger'> = {
  Completed: 'positive',
  Pending: 'warn',
  Refunded: 'danger',
};

const COLS = 'grid-cols-[minmax(0,1.5fr)_120px_64px_110px_124px_112px]';

/** Every order, with the figures above it summed from the rows showing. */
export function TransactionsPane({ query }: { query: string }) {
  const [filter, setFilter] = useState<FilterId>('all');
  const [sort, setSort] = useState<SortKey>('date');
  const [desc, setDesc] = useState(true);

  const q = query.trim().toLowerCase();
  const rows = TXNS.filter((t) => (filter === 'all' ? true : t.status === filter))
    .filter((t) => (q ? (productOf(t).name + ' ' + t.ref).toLowerCase().includes(q) : true))
    .slice()
    .sort((a, b) => {
      const dir = desc ? -1 : 1;
      if (sort === 'total') return (txnTotal(a) - txnTotal(b)) * dir;
      if (sort === 'product') return productOf(a).name.localeCompare(productOf(b).name) * -dir;
      return (a.stamp - b.stamp) * dir;
    });

  const gross = rows.reduce((s, t) => s + txnTotal(t), 0);
  const units = rows.reduce((s, t) => s + t.qty, 0);

  const byProduct = PRODUCTS.map((p) => ({
    id: p.id,
    name: p.name,
    mark: p.mark,
    value: rows.filter((t) => t.productId === p.id).reduce((s, t) => s + txnTotal(t), 0),
  }))
    .filter((p) => p.value > 0)
    .sort((a, b) => b.value - a.value);
  const prodMax = Math.max(...byProduct.map((p) => p.value), 1);

  const head = (key: SortKey, label: string, align: 'left' | 'right' = 'left') => (
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
      {label}
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
    <div data-pane="transactions" className="grid h-full grid-cols-[1fr_300px] gap-4">
      <div className="flex min-h-0 flex-col gap-4">
        <div className="grid shrink-0 grid-cols-3 gap-4">
          <Figure
            label="Gross"
            value={usd(gross)}
            note={`${rows.length} of ${TXNS.length} orders`}
          />
          <Figure label="Units" value={num(units)} note="across the rows showing" />
          <Figure
            label="Average order"
            value={usd(rows.length ? Math.round(gross / rows.length) : 0)}
            note="per order"
          />
        </div>

        <Card pane="orders" className="min-h-0 flex-1 p-4 pr-1.5">
          <CardHead
            className="pr-2.5"
            title={
              <>
                Orders{' '}
                <span className="text-muted ml-1 text-[12.5px] font-semibold">{rows.length}</span>
              </>
            }
            action={
              <Segmented
                name="status"
                size="sm"
                value={filter}
                options={FILTERS}
                onChange={setFilter}
              />
            }
          />

          <div
            className={cx(
              'bg-sunken text-muted mt-3 mr-2.5 grid shrink-0 items-center gap-3 rounded-[10px] px-3 py-2 text-[11px] font-bold whitespace-nowrap',
              COLS,
            )}
          >
            {head('product', 'Product')}
            <span>Reference</span>
            <span className="text-right">Qty</span>
            {head('date', 'Date', 'right')}
            {head('total', 'Total', 'right')}
            <span className="text-right">Status</span>
          </div>

          <div data-scroller="orders" className="scroll-region min-h-0 flex-1 pr-2">
            {rows.length === 0 ? (
              <Empty what="order" query={query || filter} />
            ) : (
              <ul className="m-0 list-none p-0">
                {rows.map((t) => (
                  <li key={t.id}>
                    <Row txn={t} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </div>

      <Card pane="by-product" className="min-h-0 p-4">
        <CardHead
          title="By product"
          action={<span className="text-muted text-[11.5px]">{byProduct.length} lines</span>}
        />
        {byProduct.length === 0 ? (
          <p className="text-muted m-0 mt-4 text-[12.5px]">Nothing matches that filter.</p>
        ) : (
          <ul className="m-0 mt-3 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
            {byProduct.map((p) => (
              <li key={p.id} data-mark={'prod-' + p.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-body min-w-0 truncate text-[12px]">{p.name}</span>
                  <span className="tnum text-ink shrink-0 text-[12px] font-bold">
                    {usd(p.value)}
                  </span>
                </div>
                <Meter
                  value={(p.value / prodMax) * 100}
                  tone="accent"
                  height={7}
                  className="mt-1.5"
                />
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function Figure({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <Card pane={'fig-' + label.split(' ')[0].toLowerCase()} className="p-4">
      <p className="text-muted m-0 text-[11.5px]">{label}</p>
      <p className="tnum text-ink m-0 mt-1.5 text-[22px] leading-none font-extrabold tracking-[-0.03em]">
        {value}
      </p>
      <p className="text-muted m-0 mt-1.5 text-[11px]">{note}</p>
    </Card>
  );
}

function Row({ txn }: { txn: Txn }) {
  const product = productOf(txn);
  const customer = CUSTOMERS.find((c) => c.id === txn.customerId);
  return (
    <div
      data-row={txn.id}
      className={cx(
        'border-line hover:bg-sunken/70 mr-2.5 grid items-center gap-3 border-b px-3 py-2.5 transition-colors',
        COLS,
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <Mark name={product.mark} size={30} />
        <span className="min-w-0">
          <span className="text-ink block truncate text-[12px] font-bold">{product.name}</span>
          <span className="text-muted block truncate text-[10.5px]">{customer?.name}</span>
        </span>
      </span>
      <span className="tnum text-muted truncate text-[10.5px] tracking-[0.04em]">{txn.ref}</span>
      <span className="tnum text-body text-right text-[12px]">{txn.qty}</span>
      <span className="tnum text-muted text-right text-[11px]">{txn.date}</span>
      <span className="tnum text-ink text-right text-[12px] font-bold">{usd(txnTotal(txn))}</span>
      <span className="flex justify-end">
        <Badge tone={TONE[txn.status]}>{txn.status}</Badge>
      </span>
    </div>
  );
}
